import data from "./tanarinfo.js";
import {Tanar} from "./tanar.js";

let lastScrollTop = 0;
let imgHeight = 0;
//filling height nem mukszik
let bodyWidth = document.querySelector('body').clientWidth;
let mrgleftKivonando = 0;
let navHeight = 0;
let csukas = 0;
window.addEventListener("load", () =>{
    bodyWidth = document.querySelector('body').clientWidth
    navHeight = document.querySelector('nav').clientHeight;
    console.log(navHeight)
    if (bodyWidth <= 450){
       imgHeight = 60;
       csukas = 100;
       //document.querySelector('.nav_img').style.width = imgHeight + "%";
       mrgleftKivonando =0; 
    }
    if (bodyWidth < 700 && bodyWidth > 450){
        imgHeight = 40;
        csukas = 50;
        //document.querySelector('.nav_img').style.width = imgHeight + "%";
        mrgleftKivonando = 0; 
    }
    if (bodyWidth < 1000 && bodyWidth > 600){
        imgHeight = 50;
        csukas = 100;
        //document.querySelector('.nav_img').style.width = imgHeight + "%";
        mrgleftKivonando = 50;

    }
    if (bodyWidth > 1000 && bodyWidth < 1500){
        //imgHeight = 50;
        //document.querySelector('.nav_img').style.width = imgHeight + "%";
        mrgleftKivonando = 50; 
        csukas = 100;
    }
    if (bodyWidth > 1500){
        imgHeight = 26;
        //document.querySelector('.nav_img').style.width = imgHeight + "%";
        mrgleftKivonando = 50; 
        csukas = 100;

    }



    let st = window.pageYOffset;
    if (st > csukas ){
        document.querySelector('nav').classList =  ["navcollapse"];
        document.querySelector('.nav_img').classList =  ["nav_img collapse"];
        setTimeout(function () {document.querySelector(".a11").innerText = "11.Arabok"}, 100)
        document.querySelector('.a11').style.marginLeft = - mrgleftKivonando +"%";
        document.querySelector('.arabok').classList = ["arabok vanish"];
        navHeight = document.querySelector('nav').clientHeight;
        if (bodyWidth <= 450){
           document.querySelector(".nav_options").classList = ["nav_options vanish"];
           document.querySelector(".hamburgermenu").classList = ["hamburgermenu appear"]
        }


    } else if (st < csukas){
            document.querySelector('nav').classList = "";
            document.querySelector('nav').classList = ["navexpending"];
            document.querySelector('.nav_img').classList = ["nav_img expand"];
            document.querySelector('.arabok').classList = ["arabok appear"];
            document.querySelector('.a11').style.marginLeft = 0;
            document.querySelector('.a11').innerText = "11.A";
            if (bodyWidth <= 450){
                document.querySelector(".nav_options").classList = ["nav_options appear"];
                document.querySelector(".hamburgermenu").classList = ["hamburgermenu vanish"]

            }
    }
})


document.addEventListener("scroll", (e) => {
    let st = window.pageYOffset;
    if (st > csukas ){
        document.querySelector('nav').classList =  ["navcollapse"];
        document.querySelector('.nav_img').classList =  ["nav_img collapse"];
        //setTimeout(function () {document.querySelector(".a11").innerText = "11.Arabok"}, 100)
        document.querySelector(".a11").innerText = "11.Arabok"
        document.querySelector('.a11').style.marginLeft = - mrgleftKivonando +"%";
        document.querySelector('.arabok').classList = ["arabok vanish"];
        navHeight = document.querySelector('nav').clientHeight;
        if (bodyWidth <= 450){
           document.querySelector(".nav_options").classList = ["nav_options vanish"];
           document.querySelector(".hamburgermenu").classList = ["hamburgermenu appear"]
        }



    } else if (st < lastScrollTop){

        if ( st < csukas){
            document.querySelector('nav').classList = "";
            document.querySelector('nav').classList = ["navexpending"];
            document.querySelector('.nav_img').classList = ["nav_img expand"];
            document.querySelector('.arabok').classList = ["arabok appear"];
            document.querySelector('.a11').innerText = "11.A";
            document.querySelector('.a11').style.marginLeft = 0;
            if (bodyWidth <= 450){
                document.querySelector(".nav_options").classList = ["nav_options appear"];
                document.querySelector(".hamburgermenu").classList = ["hamburgermenu vanish"]

            }
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



// ~~~~~Támogatók

let tanarok = [];
const datas = data;

datas.forEach(dt => {
    tanarok.push(new Tanar(dt))
});

//~~~~~~~~~~~~~~~~~~~~~~~~~Csoki~~~~~~~~~~~~~~~~~~~~~~~~~~~



document.getElementById("1").addEventListener("click", () =>{
    popup(0)
})
document.getElementById("2").addEventListener("click", () =>{
    popup(1)
})
document.getElementById("3").addEventListener("click", () =>{
    popup(2)
})
document.getElementById("4").addEventListener("click", () =>{
    popup(3)
})

function popup(tanar){
    let osztalyok = document.getElementById("tanitott_osztalyok");
    osztalyok.innerHTML = "";
    document.querySelector('.popup').style.display = 'flex';
    document.querySelector('.popup').classList.add("menuopen");
    document.getElementById('popup_ekcsölikep').src = tanarok[tanar].Src;
    document.querySelector('.tanarnev').innerText = tanarok[tanar].Nev;
    document.querySelector('.funfact').innerText = tanarok[tanar].Funfact;
    document.querySelector('.tanari').innerText = tanarok[tanar].Tanari;
    document.querySelector('.jutalmak').innerText = tanarok[tanar].Jutalmak;
    let tanítottak = tanarok[tanar].TanitottOsztalyok.split(",");
    console.log(osztalyok)
    tanítottak.forEach(osztaly =>{
        let li = document.createElement("li");
        li.innerText = osztaly;
        osztalyok.appendChild(li);
    })
};


document.querySelector('.close').addEventListener("click", () =>{
    document.querySelector(".popup").classList = "popup menuclose";

    setTimeout(function (){
        document.querySelector(".popup").style.opacity = 0;
        document.querySelector(".popup").style.zIndex = 0;
        document.querySelector(".popup").style.display = "none";
        document.querySelector(".popup").classList = "popup";
    }, 300)
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