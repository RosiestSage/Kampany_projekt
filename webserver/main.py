import os
import json
import asyncio
from secrets import token_urlsafe

import hypercorn
import hypercorn.asyncio
import hypercorn.middleware
import jinja2.exceptions

import stripe as s
from stripe import SignatureVerificationError, Event
from stripe.checkout import Session as CheckoutSession

import quart as q
from quart import session, request, jsonify, Response

import aiomysql

app = q.Quart(__name__)

ITEMS = {
    "hoodie": {
        "name": "Módos Pulóver",
        "price": 8500
    },
    "tshirt": {
        "name": "Módos Póló",
        "price": 5000
    },
    "mug": {
        "name": "Módos Bögre",
        "price": 3500
    },
    "sticker": {
        "name": "Módos Matrica",
        "price": 200
    }
}


def get_item_data(key: str) -> dict[str, int |str]:
    try:
        return ITEMS[key]
    except:
        q.abort(q.Response(f"Product '{key}' not found.", 400))

async def check_admin_login():

    if request.headers.get("Cf-Access-Authenticated-User-Email", "a@a.a").split("@")[0] in os.getenv("ADMIN_EMAILS", "kocsis.akos"):
        session["admin_login"] = True
        return
    
    session["admin_login"] = False

    q.abort(401)


@app.get("/admin")
async def admin_area():
    await check_admin_login()
    return await q.render_template("admin.html", items=[("asdasdasd", "Akos", "11a", "kocsis.akos@students.jedlik.eu", 10000)]), 200

@app.get("/admin/test")
async def test():
    return q.jsonify(dict(request.headers._list)), 200

@app.get("/")
async def index():
    return await q.render_template("modos_merch.html"), 200

@app.post("/stripe-webhook")
async def stripe_webhook():
    event: Event | Response = await get_event_from_request()
    
    if isinstance(event, Response):
        return event
    
    if event.type != "checkout.session.completed":
        return jsonify(success=False)

    asyncio.get_running_loop().create_task(process_completed_session(event))

    return jsonify(success=True)

async def process_completed_session(event: Event) -> None:
    session: CheckoutSession = await CheckoutSession.retrieve_async(event.data.object["id"], expand=["customer"])

    async with pool.acquire() as conn:
        async with conn.cursor() as cur:
            await cur.execute("INSERT INTO orders (invoice_id, name, email, class, items) VALUES (%,%,%,%,%)", (session.invoice, session.customer.name, session.customer_email, session.custom_fields[0].text.value, list(session.line_items.data)))
    
async def get_event_from_request() -> Event | Response:
    data = await request.data
    payload = data.decode("utf-8")
    received_sig = request.headers.get("Stripe-Signature", None)

    try:
        return s.Webhook.construct_event(
            payload, received_sig, os.environ["STRIPE_WEBHOOK_SECRET"]
        )
    except ValueError:
        return jsonify(success = False)
        
    except SignatureVerificationError:
        return jsonify(success = False)

@app.get("/tamogato_tanarok")
async def tancik():
    return await q.render_template("tamogato_tanarok.html"), 200

@app.post("/create-checkout-session")
async def create_checkout_session():

    data: list[dict] = await request.json
    session = await s.checkout.Session.create_async(
        success_url=app.url_for("payment_success", _external=True, _scheme="https") + "?id={CHECKOUT_SESSION_ID}",
        mode="payment",
        allow_promotion_codes=True,
        invoice_creation={
            "enabled": True,
            "invoice_data": {
                "issuer": {
                    "type": "self"
                },
                "description":"Átvétel kizárólag személyesen a Győri Szakképzési Centrum Jedlik Ányos Gépipari és Informatikai Technikum és Kollégium főépületében. Pontos részletek emailben Április 31. után."
            }
        },

        custom_fields=[
            {
                "key": "class",
                "type": "text",
                "label": {"custom": "Osztály", "type":"custom"},
                "text": {
                    "minimum_length": 2,
                    "maximum_length": 6
                }
            }
        ],
        line_items=[
        {
            "price_data": {
                "currency": "huf",
                "product_data": {
                    "name": get_item_data(item["id"])["name"],
                    "description": f"Szín: {item['color']}, Méret: {item['size']}" if 'size' in item and 'color' in item else f"Típus: {item['size']}" if 'size' in item else "",
                    "metadata": item
                },
                "unit_amount": int(get_item_data(item["id"])["price"]) * 100
            },
            "quantity": 1
        }
        for item in data
    ]
    )

    return {"url": session.url}


@app.route("/success")
async def payment_success():
    id = request.args.get("id")
    if id is None or len(id) < 10 or len(id) > 66:
        q.abort(q.Response("<h1>Bad Request</h1><p><code style=\"background-color: #f4f4f4; color: #d63384; font-family: 'Courier New', Courier, monospace; font-size: 0.9em; padding: 2px 4px; border-radius: 4px; border: 1px solid #ddd;\">id</code> query parameter missing or malformed.</p>", 400))

    return await q.render_template("success.html", icon_url=q.url_for('static', filename="images/arabok1_icon.png"))

@app.route("/fetch-invoice-url")
async def fetch_invoice():
    id = request.args.get("id", None)
    if id is None or len(id) < 10 or len(id) > 66:
        q.abort(400)

    try:
        session = await s.checkout.Session.retrieve_async(id, expand=["invoice"])
        if session.invoice is None:
            raise Exception(0)
    except s.InvalidRequestError:
        q.abort(400)
    except Exception:
        print("Failed to retrieve invoice details.")
        q.abort(404)

    return {"url": session.invoice.hosted_invoice_url}, 200  # type: ignore #  Will never be None.


@app.errorhandler(jinja2.exceptions.TemplateNotFound)
async def get_path(_):
    try:
        return await q.render_template(request.path.split(".")[0] + ".html"), 200
    except:
        q.abort(404)
    
@app.errorhandler(401)
async def unauthorized(error):
    try:
        return await q.render_template("401.html", email=request.headers.get("Cf-Access-Authenticated-User-Email", "N/A")), 401
    except:
        raise

@app.get("/admin/logs")
async def admin_logs():
    await check_admin_login()
    async with pool.acquire() as conn:
        async with conn.cursor() as cur:
            await cur.execute("SELECT * FROM logs")
            logs: list[tuple[int, str, str]] = await cur.fetchall()
    
    final: list[str] = []
    for timestamp, email, data in logs:
        final.append(f"{timestamp} | {email}: {data}")

    return '<button onclick="history.back()">Go Back</button><br>' + "\n".join(final if len(final) != 0 else ["Nothing here just yet!"]), 200


@app.get("/admin/mark-complete/<string:id>")
async def mark_complete(id: str):
    await check_admin_login()
    async with pool.acquire() as conn:
        async with conn.cursor() as cur:
            await cur.execute("SELECT * FROM orders WHERE invoice_id = %s", (id))


async def main():
    global app
    global pool

    await asyncio.sleep(3)
    pool = await aiomysql.pool._create_pool(echo=True, host="mariadb", user="arab", password="arab", db="arab", pool_recycle=1, autocommit=True)
    async with pool.acquire() as conn:
        async with conn.cursor() as cur:
            await cur.execute(
                """
                CREATE TABLE IF NOT EXISTS orders (
                    invoice_id VARCHAR(30),
                    name VARCHAR(255),
                    email VARCHAR(255),
                    class VARCHAR(6),
                    items JSON
                );

                CREATE TABLE IF NOT EXISTS logs (
                    email VARCHAR(255),
                    action VARCHAR(1024),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )

    config = hypercorn.Config()
    config.accesslog = None
    config.bind="0.0.0.0:8080"

    app.secret_key = os.getenv("COOKIE_SIGNING_KEY", token_urlsafe())
    s.api_key = os.getenv("STRIPE_KEY")
    
    await hypercorn.asyncio.serve(hypercorn.middleware.ProxyFixMiddleware(app, trusted_hops=2), config)

asyncio.run(main())