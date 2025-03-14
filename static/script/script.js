let navHeight = 20;
//let fillingHeight = document.querySelector('nav').clientHeight +"px";
//document.getElementById('filling').style.height = fillingHeight;

let lastScrollTop = 0;
let imgWidth = 34;

//filling height nem mukszik



document.addEventListener("scroll", (e) => {
    let st = window.pageYOffset;
    if (st < 500){
        if (st > lastScrollTop ){
            if (navHeight > 10){
                document.querySelector('nav').style.height = navHeight -1 + "%";
                //document.getElementById('filling').style.height = document.querySelector('nav').clientHeight +"px";
                document.getElementById('nav_img').style.width = imgWidth - 1 + "%";
                navHeight--;
            }

        } else if (st < lastScrollTop){
            if (navHeight > 9 && navHeight < 20){
                document.querySelector('nav').style.height = navHeight + 1 + "%";
                console.log(document.querySelector('nav').clientHeight)
                //document.getElementById('filling').style.height -= 1;
                document.getElementById('nav_img').style.width = imgWidth + 1 + "%";


                navHeight++;
                
            }
        }

    }
    /*
    if (st == 0){
        document.querySelector('nav').style.height =  "20%";
        document.getElementById('filling').style.height = "20%";
        document.getElementById('nav_img').style.width = "20%";
        navHeight = "20%";
    }
        */
    lastScrollTop = st <= 0 ? 0 : st;
}, false);

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