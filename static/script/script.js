let navHeight = 20;
//let fillingHeight = document.querySelector('nav').clientHeight +"px";
//document.getElementById('filling').style.height = fillingHeight;

let lastScrollTop = 0;
let imgWidth = 34;

//filling height nem mukszik


//header
document.addEventListener("scroll", (e) => {
    let st = window.pageYOffset;
    if (st < 500){
        if (st > lastScrollTop ){
            if (navHeight > 10){
                document.querySelector('nav').style.height = navHeight -1 + "%";
                document.getElementById('nav_img').classList = ["collapse"];
                document.getElementById('11a').innerText = "11.Arabok";
                document.getElementById('11a').style.marginLeft = -50 +"%";
                document.getElementById('arabok').classList = "vanish";
                navHeight--;
            }

        } else if (st < lastScrollTop){
            if (navHeight > 9 && navHeight < 20){
                document.querySelector('nav').style.height = navHeight + 1 + "%";
                document.getElementById('nav_img').style.width = imgWidth + 1 + "%";
                document.getElementById('nav_img').classList = ["expand"];
                document.getElementById('arabok').classList = "appear";
                document.getElementById('11a').innerText = "11.A";
                document.getElementById('11a').style.marginLeft = 0;

                console.log("szexbaszás")
                navHeight++;
            }
        }
    }

    lastScrollTop = st <= 0 ? 0 : st;
}, false);







//~~~~~~~~~~~~~~~~~~~~~~~~~Csoki~~~~~~~~~~~~~~~~~~~~~~~~~~~

document.querySelector('.items').addEventListener("click", () =>{
    document.getElementById('items_popup').style.display = 'flex';
});
document.querySelector('#close').addEventListener("click", () =>{
    document.getElementById('items_popup').style.display = 'none';
});
/*
document.getElementById("purchaseButton").addEventListener("click", () => {

    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    })
    .then(response => response.json())
    .then(data => {
        if (data.url) {
            window.location.href = data.url;
        } else {
            alert('No redirect URL in response.');
        }
    })
    .catch(error => {
        console.error('Error creating session:', error);
        alert('Error creating payment session');
    });
});
*/