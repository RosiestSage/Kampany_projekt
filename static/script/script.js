let navHeight = 20;
let lastScrollTop = 0;
let imgHeight = 0;
//filling height nem mukszik
let bodyWidth = document.querySelector('body').clientWidth;
let kivonando = 0;
let navKivonando =0;

window.addEventListener("load", () =>{
    bodyWidth = document.querySelector('body').clientWidth
    
    if (bodyWidth <= 450){
       imgHeight = 60;
       document.querySelector('.nav_img').style.width = imgHeight + "%";

       //navHeight = 20;
       //navKivonando = [0, 1];
       kivonando =0; 
    }
    if (bodyWidth < 700 && bodyWidth > 450){
        imgHeight = 40;
        document.querySelector('.nav_img').style.width = imgHeight + "%";

        //navHeight = 30;
        //navKivonando = [10, 10];
        kivonando = 40; 


    }
    if (bodyWidth < 1000 && bodyWidth > 600){
        imgHeight = 50;
        document.querySelector('.nav_img').style.width = imgHeight + "%";

        //navHeight = 30;
        //navKivonando = [0, 1];
        kivonando = 50;

    }
    if (bodyWidth > 1000 && bodyWidth < 1500){
        imgHeight = 45;
        document.querySelector('.nav_img').style.width = imgHeight + "%";

        //navHeight = 30;
        //navKivonando = [0, 1];
        kivonando = 50; 
    }
    if (bodyWidth > 1500){
        imgHeight = 26;
        document.querySelector('.nav_img').style.width = imgHeight + "%";

        //navHeight = 30;
        //navKivonando = [0, 1];
        kivonando = 50; 
    }
    document.querySelector('nav').style.height = navHeight + "%";
})

//header
document.addEventListener("scroll", (e) => {
    let st = window.pageYOffset;
    if (st < 500){
        if (st > lastScrollTop ){
            if (navHeight > 9){
                document.querySelector('nav').style.height = navHeight - 1 + "%";
                document.querySelector('.nav_img').classList =  ["nav_img collapse"];
                setTimeout(function () {document.querySelector(".a11").innerText = "11.Arabok"}, 100)

                document.querySelector('.a11').style.marginLeft = - kivonando +"%";
                document.getElementById('arabok').classList = "vanish";
                navHeight--;
            }

        } else if (st < lastScrollTop){
            if (navHeight > 9 && navHeight  < 20){
                console.log(navKivonando)
                document.querySelector('nav').style.height = navHeight + 1 + "%";
                document.querySelector('.nav_img').classList = ["nav_img expand"];
                document.getElementById('arabok').classList = "appear";
                document.querySelector('.a11').innerText = "11.A";
                document.querySelector('.a11').style.marginLeft = 0;
                navHeight++;
            }
        }
    }

    console.log(navHeight)
    lastScrollTop = st <= 0 ? 0 : st;
}, false);

document.querySelector(".hamburgermenu").addEventListener("click", () =>{
    document.querySelector(".telefon_menu").style.display = "flex";
    document.querySelector(".telefon_menu").classList.add("menuopen");
})


document.querySelector(".xbutton").addEventListener("click", () =>{
    document.querySelector(".telefon_menu").classList = "telefon_menu menuclose";
    setTimeout(function (){
        document.querySelector(".telefon_menu").style.opacity = 0;
        document.querySelector(".telefon_menu").style.zIndex = 0;
        document.querySelector(".telefon_menu").style.display = "none";
        document.querySelector(".telefon_menu").classList = "telefon_menu";
    }, 500)
    

})



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