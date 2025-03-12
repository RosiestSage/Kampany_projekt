import quart as q
import stripe as s
import os
from secrets import token_urlsafe

from quart import session, request

app = q.Quart(__name__)

app.secret_key = os.getenv("COOKIE_SIGNING_KEY", token_urlsafe())

async def check_login():
    if session.get("login"):
        return

    elif request.headers.get("CF-Access-User-Email", "ThisWillNeverBeInAJedlikEmailAddress-2dbb50e7-5ab8-4d61-aeda-8e802a25316a") in os.getenv("ADMIN_EMAILS", "kocsis.akos@students.jedlik.eu;akosjdlk.60@gmail.com"):
        session["login"] = True

    q.abort(401)

@app.get("/admin")
async def admin_area():
    await check_login()
    return await q.render_template("admin"), 200

@app.post("/create-checkout-session")
async def create_checkout_session():
    
    session = await s.checkout.Session.create_async(
        success_url=app.url_for("payment_success"),
        line_items=[
            {
                "price": "price_xxxxxxxxxxxxx",
                "quantity": 2,
            },
        ],
        mode="payment"
    )
    return {"url": session.url}

@app.route("/success")
async def success():
    id = request.args.get("id")
    if id is None or len(id) < 10 or len(id) > 66:
        q.abort(q.Response("<h1>Bad Request</h1><p><code style=\"background-color: #f4f4f4; color: #d63384; font-family: 'Courier New', Courier, monospace; font-size: 0.9em; padding: 2px 4px; border-radius: 4px; border: 1px solid #ddd;\">id</code> query parameter missing or malformed.</p>", 400))

    return await q.render_template("success.html", icon_url=q.url_for('static', filename="arabok_icon.png"))

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

@app.errorhandler(401)
async def unauthorized(error):
    return await q.render_template("401"), 401