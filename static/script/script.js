let lastScrollTop = 0;
let imgHeight = 0;
//filling height nem mukszik
let bodyWidth = document.querySelector('body').clientWidth;
let mrgleftKivonando = 0;
let navHeight = 0;
window.addEventListener("load", () =>{
    bodyWidth = document.querySelector('body').clientWidth
    navHeight = document.querySelector('nav').clientHeight;
    console.log(navHeight)
    if (bodyWidth <= 450){
       imgHeight = 60;
       document.querySelector('.nav_img').style.width = imgHeight + "%";
       mrgleftKivonando =0; 
    }
    if (bodyWidth < 700 && bodyWidth > 450){
        imgHeight = 40;
        document.querySelector('.nav_img').style.width = imgHeight + "%";
        mrgleftKivonando = 40; 
    }
    if (bodyWidth < 1000 && bodyWidth > 600){
        imgHeight = 50;
        document.querySelector('.nav_img').style.width = imgHeight + "%";
        mrgleftKivonando = 50;

    }
    if (bodyWidth > 1000 && bodyWidth < 1500){
        //imgHeight = 50;
        //document.querySelector('.nav_img').style.width = imgHeight + "%";
        mrgleftKivonando = 70; 
    }
    if (bodyWidth > 1500){
        imgHeight = 26;
        document.querySelector('.nav_img').style.width = imgHeight + "%";
        mrgleftKivonando = 50; 
    }
})


document.addEventListener("scroll", (e) => {
    let st = window.pageYOffset;
    if (st > lastScrollTop ){
        document.querySelector('nav').classList =  ["navcollapse"];
        document.querySelector('.nav_img').classList =  ["nav_img collapse"];
        setTimeout(function () {document.querySelector(".a11").innerText = "11.Arabok"}, 100)
        document.querySelector('.a11').style.marginLeft = - mrgleftKivonando +"%";
        document.querySelector('.arabok').classList = ["arabok vanish"];
        navHeight = document.querySelector('nav').clientHeight;



    } else if (st < lastScrollTop){
        if ( st < 50){
            document.querySelector('nav').classList = "";
            document.querySelector('nav').classList = ["navexpending"];
            document.querySelector('.nav_img').classList = ["nav_img expand"];
            document.querySelector('.arabok').classList = ["arabok appear"];
            document.querySelector('.a11').innerText = "11.A";
            document.querySelector('.a11').style.marginLeft = 0;
        }
    }
/*
    if(st > 300){
        setTimeout(function () {
            console.log("szexpéter")
            document.querySelector(".a11").innerText = "11.Arabok"
            document.querySelector('nav').classList =  ["navcollapse"];
            document.querySelector('.nav_img').classList =  ["nav_img collapse"];
        }, 100)
    }
    if (st < 300){
        console.log("sz")
        document.querySelector('nav').classList = "";
        document.querySelector('nav').classList = ["navexpending"];
        document.querySelector('.nav_img').classList = ["nav_img expand"];
        document.getElementById('arabok').classList = "appear";
        document.querySelector('.a11').innerText = "11.A";
    }
*/
    lastScrollTop = st <= 0 ? 0 : st;
}, false);



//header a sok munka, a semmiért
/*
document.addEventListener("scroll", (e) => {
    let st = window.pageYOffset;
    if (st < 500){
        if (st > lastScrollTop ){
            if (navHeight > minHeight){
                document.querySelector('nav').style.height = navHeight - navKivonando + "%";
                document.querySelector('.nav_img').classList =  ["nav_img collapse"];
                setTimeout(function () {document.querySelector(".a11").innerText = "11.Arabok"}, 100)

                document.querySelector('.a11').style.marginLeft = - mrgleftKivonando +"%";
                document.getElementById('arabok').classList = "vanish";
                navHeight -= navKivonando;
            }

        } else if (st < lastScrollTop){
            if (navHeight < maxHeight){
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
*/
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

document.querySelector('.open_popup').addEventListener("click", () =>{
    document.querySelector('.popup').style.display = 'flex';
});
document.querySelector('.close').addEventListener("click", () =>{
    document.querySelector('.popup').style.display = 'none';
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