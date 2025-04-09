import tanardata from "./info.js";
import {Tanar, Product, Merch} from "./class.js";

let lastScrollTop = 0;
let imgHeight = 0;
let bodyWidth = document.querySelector('body').clientWidth;
let mrgleftKivonando = 0;
let navHeight = 0;
let csukas = 0;
let slideIndex = 1;




/**
 * @type {Array<Product>}
 */
const cart = [];
let tanarok = [];
const tanardatas = tanardata.tanardata;

let merchinfo = [];
const merchdata = tanardata.merch;

tanardatas.forEach(dt => {
    tanarok.push(new Tanar(dt))
});

merchdata.forEach(dt => {
    merchinfo.push(new Merch(dt))
})

/** @type {Array<Product>} */
const products = [new Product("hoodie", 6000, "Módos Pulcsi"),
                    new Product("tshirt", 5000, "Módos Póló"),
                    new Product("mug", 2000, "Módos Bögre"),
                    new Product("sticker", 500, "Módos Matrica"),
];

fetch('/get-products', {
    method: 'GET'
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        throw new Error(data.error)
    } else {
        data.forEach((value) => {
            products.push(new Product(value.id, value.price, value.name))
        })
    }
})
.catch(error => {
    console.error('Error fetching products:', error);
});

window.addEventListener("load", () =>{
    setTimeout(function () { loadCards(tanarok, merchinfo)}, 100)

   
    bodyWidth = document.querySelector('body').clientWidth
    navHeight = document.querySelector('nav').clientHeight;
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
        mrgleftKivonando = 40;

    }
    if (bodyWidth > 1000 && bodyWidth < 1500){
        //imgHeight = 50;
        //document.querySelector('.nav_img').style.width = imgHeight + "%";
        mrgleftKivonando = 5; 
        csukas = 100;
    }
    if (bodyWidth > 1500){
        imgHeight = 26;
        //document.querySelector('.nav_img').style.width = imgHeight + "%";
        mrgleftKivonando = 0; 
        csukas = 100;

    }

    if (bodyWidth <= 450){
        document.querySelector(".hamburgermenu").classList = ["hamburgermenu vanish"]
    }

    let st = window.pageYOffset;
    if (st > csukas ){
        document.querySelector('nav').classList =  ["navcollapse"];
        document.querySelector('.nav_img').classList =  ["nav_img collapse"];
        setTimeout(function () {document.querySelector(".a11").innerText = "11.Arabok"}, 100)
        document.querySelector('.a11').style.marginLeft = - mrgleftKivonando +"%";
        document.querySelector('.arabok').classList = ["arabok vanish"];
        navHeight = document.querySelector('nav').clientHeight;


    } else if (st < csukas){
            document.querySelector('nav').classList = "";
            document.querySelector('nav').classList = ["navexpending"];
            document.querySelector('.nav_img').classList = ["nav_img expand"];
            document.querySelector('.arabok').classList = ["arabok appear"];
            document.querySelector('.a11').style.marginLeft = 0;
            document.querySelector('.a11').innerText = "11.A";
    }



    
})


document.addEventListener("scroll", (e) => {
    let st = window.pageYOffset;
    bodyWidth = document.querySelector('body').clientWidth

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





function popup(tanar){
    if (document.URL.includes("tamogato_tanarok.html")){

        let osztalyok = document.getElementById("tanitott_osztalyok");
        osztalyok.innerHTML = "";
        document.querySelector('.popup').style.display = 'flex';
        document.querySelector('.popup_window').style.backgroundImage = "url('../static/images/popup_background2.jpg')";
        document.querySelector('.popup').classList.add("menuopen");
        let bkgsrc = tanarok[tanar].Src.replace(/"/g, "");;
        document.getElementById('popup_ekcsölikep').src = bkgsrc;
        document.querySelector('.tanarnev').innerText = tanarok[tanar].Nev;
        document.querySelector('.funfact').innerText = tanarok[tanar].Funfact;
        document.querySelector('.tanari').innerText = tanarok[tanar].Tanari;
        document.querySelector('.jutalmak').innerText = tanarok[tanar].Jutalmak;
        let tanítottak = tanarok[tanar].TanitottOsztalyok.split(",");
        tanítottak.forEach(osztaly =>{
            let li = document.createElement("li");
            li.innerText = osztaly;
            osztalyok.appendChild(li);
        })
    }
    if (document.URL.includes("modos_merch.html")){
        document.querySelector('.popup').style.display = 'flex';
        document.querySelector('.popup').classList.add("menuopen");
        document.querySelector('.popup_window').style.backgroundImage = "url('../static/images/product bkg.avif')";

        if (document.URL.includes("modos_merch.html")){
            console.log("megolom mafam")
                if (tanar == 0){
                    document.querySelector(".opacitybackground").innerHTML = `                
                    <div class="productpopup">
                            <article>
                                <div class="carousel" data-carousel>
                                    <button data-carousel-button="prev" class="carousel-button prev">&#10094</button>
                                    <button data-carousel-button="next" class="carousel-button next">&#10095</button>
                                    <ul data-slides>
                                        <li class="slide" data-active>
                                            <img src=${merchinfo[tanar].Sources[0]} alt="">
                                        </li>
                                        
                                        <li class="slide">
                                            <img src=${merchinfo[tanar].Sources[1]} alt="">
                                        </li>
                                        
                                    </ul>
                                </div>
                            </article>
                        <div class="product" data-info>
                            <h1 id="${merchinfo[tanar].Id}" data>${merchinfo[tanar].MerchName}</h1>
                            <div class="pricetag"><h1>Ár: </h1> <span class="price">${merchinfo[tanar].Price}</span>Ft</div>
                            <h1>Szín: </h1>
                            <div class="colors">
                                <p class="${merchinfo[tanar].Colours[0]}"></p>
                                <p class="${merchinfo[tanar].Colours[1]}"></p>
                                <p class="${merchinfo[tanar].Colours[2]}"></p>
                                <p class="${merchinfo[tanar].Colours[3]}"></p>
                            </div>
                            <h1>Méret: </h1>
    
                            <div class="sizes">
                                <p>S</p>
                                <p>M</p>
                                <p>L</p>
                                <p>XL</p>
                                <p>XXL</p>
                            </div>
                            <div>
                            <button id="tocart">Kosárba</button>
                            </div>
                            </div>
                            </div>
                    <button class="close">Bezár</button>`
                    ColorAndSize()
    
                }
                
                if (tanar == 1){
                    
                    document.querySelector(".opacitybackground").innerHTML = `                
                    <div class="productpopup">
                    <article>
                    <div class="carousel" data-carousel>
    
                    <ul data-slides>
                    <li class="slide" data-active>
                    <img src=${merchinfo[tanar].Sources[0]} alt="">
                    </li>
                    </ul>
                    </div>
                    </article>
                    <div class="product" data-info>
                    <h1 id="${merchinfo[tanar].Id}" data>${merchinfo[tanar].MerchName}</h1>
                    <div class="pricetag"><h1>Ár: </h1> <span class="price">${merchinfo[tanar].Price}</span>Ft</div>
                    <h1>Szín: </h1>
                    <div class="colors">
                    <p class="${merchinfo[tanar].Colours[0]}"></p>
                    <p class="${merchinfo[tanar].Colours[1]}"></p>
                    <p class="${merchinfo[tanar].Colours[2]}"></p>
                    <p class="${merchinfo[tanar].Colours[3]}"></p>
                    </div>
                    <h1>Méret: </h1>
                    
                    <div class="sizes">
                            <p>S</p>
                            <p>M</p>
                            <p>L</p>
                            <p>XL</p>
                            <p>XXL</p>
                    </div>
                    <div>
                        <button id="tocart">Kosárba</button>
                    </div>
                    </div>
                    </div>
                    <button class="close">Bezár</button>`
                

                    ColorAndSize()
                }

                if (tanar == 2){
                    
                    document.querySelector(".opacitybackground").innerHTML = `                
                    <div class="productpopup">
                     <article>
                        <div class="carousel" data-carousel>
                            <button data-carousel-button="prev" class="carousel-button prev">&#10094</button>
                            <button data-carousel-button="next" class="carousel-button next">&#10095</button>
                            <ul data-slides>
                                <li class="slide" data-active>
                                    <img src=${merchinfo[tanar].Sources[0]} alt="">
                                </li>
                                        
                                <li class="slide">
                                    <img src=${merchinfo[tanar].Sources[1]} alt="">
                                </li>
                                        
                            </ul>
                        </div>
                    </article>
                    <div class="product" data-info>
                    <h1 id="${merchinfo[tanar].Id}" data>${merchinfo[tanar].MerchName}</h1>
                    <div class="pricetag"><h1>Ár: </h1> <span class="price">${merchinfo[tanar].Price}</span>Ft</div>
                    <h1>Szín: </h1>
                    
                    
                    <div>
                        <button id="tocart">Kosárba</button>
                    </div>
                    </div>
                    </div>
                    <button class="close">Bezár</button>`
                

    
                }

                if (tanar == 3){
                    document.querySelector(".opacitybackground").innerHTML = `                
                    <div class="productpopup">
                            <article>
                                <div class="carousel" data-carousel>
                                    <button data-carousel-button="prev" class="carousel-button prev">&#10094</button>
                                    <button data-carousel-button="next" class="carousel-button next">&#10095</button>
                                    <ul data-slides>
                                        <li class="slide" data-active>
                                            <img src=${merchinfo[tanar].Sources[0]} alt="">
                                        </li>
                                        
                                        <li class="slide">
                                            <img src=${merchinfo[tanar].Sources[1]} alt="">
                                        </li>

                                        <li class="slide">
                                            <img src=${merchinfo[tanar].Sources[2]} alt="">
                                        </li>
                                        
                                    </ul>
                                </div>
                            </article>
                        <div class="product" data-info>
                            <h1 id="${merchinfo[tanar].Id}" data>${merchinfo[tanar].MerchName}</h1>
                            <div class="pricetag"><h1>Ár: </h1> <span class="price">${merchinfo[tanar].Price}</span>Ft</div>
                            
                            <h1>Típus: </h1>
    
                            <div class="sizes">
                                <p>S</p>
                                <p>M</p>
                                <p>L</p>
                            </div>
                            <div>
                            <button id="tocart">Kosárba</button>
                            </div>
                            </div>
                            </div>
                    <button class="close">Bezár</button>`
                    Size()
    
                }
    
          
        }
    



        const buttons = document.querySelectorAll("[data-carousel-button]")
        buttons.forEach(button =>{
        button.addEventListener("click", () =>{
            const offset = button.dataset.carouselButton === "next" ? 1: -1;
            const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
            const activeSlide = slides.querySelector("[data-active]");
            let newIndex = [...slides.children].indexOf(activeSlide) + offset;
            if (newIndex < 0) newIndex = slides.children.length - 1;
            if (newIndex >= slides.children.length) newIndex = 0;
    
            slides.children[newIndex].dataset.active = true;
            delete activeSlide.dataset.active;
        })
    })
    
    

    
    
            document.querySelector('.close').addEventListener("click", () =>{
            document.querySelector(".popup").classList = "popup menuclose";
    
            setTimeout(function (){
                document.querySelector(".popup").style.opacity = 0;
                document.querySelector(".popup").style.zIndex = 0;
                document.querySelector(".popup").style.display = "none";
                document.querySelector(".popup").classList = "popup";
            }, 300)
            
        });
    
        document.getElementById("tocart").addEventListener("click", () =>{
            let product_id = document.getElementById("tocart").closest("[data-info]").querySelector("[data]").id;
    
            let product = products.find((value) => {return value.id === product_id})
            
            if (product === undefined) {
                alert("Product not found.")
            }
            
            let newProduct = new Product(product.id, product.Price, product.Name)
            console.log(newProduct.id)
            if (newProduct.id != "mug" &&  newProduct.id != "sticker"){

                newProduct.Color = document.getElementById("tocart").closest("[data-info]").querySelector("[data-active]").classList.value;
                newProduct.Size = document.getElementById("tocart").closest("[data-info]").querySelector(".sizes").querySelector("[data-active]").innerHTML;
            }
            //product.Amount = document.getElementById("tocart").closest("[data-info]").querySelector("[number]").value;
            
            //console.log(product)
            cart.push(newProduct)
    
            
    
            
    
            //name;price;colour;size;amount
            /*
            document.getElementById("name").innerHTML = product.Name;
            document.getElementById("price").innerHTML = product.Price;
            document.getElementById("colour").innerHTML = product.Color;
            document.getElementById("size").innerHTML = product.Size;
            //document.getElementById("amount").innerHTML = product.Amount;
    
    
    
            //Remove
            // cart.pop(cart.find((value) => {return value.id == product.id && product.Size == value.Size && product.Color == value.Color}))
            //+html-ből törlés
            */
        });
    
    


    }
};


function ColorAndSize(){
    Size();
    Colour();

}

function Size(){
    let sizeIndex = 0;
    const sizes = document.querySelector(".sizes").children;
    for (let i = 0; i < sizes.length; i++){
        sizes[i].addEventListener("click", () =>{
            sizes[i].dataset.active = true;
            sizeIndex = i;
            for (let m = 0; m < sizes.length; m++){
                if (sizeIndex != m){
                    delete sizes[m].dataset.active;
                }

            }
        })
    }
}

function Colour(){
    let activeIndex = 0;
    const colours = document.querySelector(".colors").children;
    console.log("szex")
    for (let i = 0; i < colours.length; i++){
        colours[i].addEventListener("click", () =>{
            colours[i].dataset.active = true;
            activeIndex = i;
            for (let m = 0; m < colours.length; m++){
                if (activeIndex != m){
                    delete colours[m].dataset.active;
                }

            }
        })
    }
}

function loadCards(tanarok, merchinfo){
    if (document.URL.includes("tamogato_tanarok.html")){
        console.log(tanarok.length)
        
        tanarok.forEach(tanar =>{
            let card = `<div id="${tanarok.indexOf(tanar)}_card" class="cardgrid cardappear"><div class="card"><div id="${tanarok.indexOf(tanar)}_img" class="ekcsölikep" src="" alt=""></div><div class="courtain" alt=""></div><div class="cardtext"><h1 class="tanarnevcard">${tanar.Nev}</h1></div><div class="cardbutton"><button id="${tanarok.indexOf(tanar) + 1}"  class="open_popup"><h1>Info</h1></button></div></div></div>`
            document.querySelector('section').innerHTML += card;    
            
        })
    
        tanarok.forEach(tanar =>{
            let bkgsrc = tanar.Src;
    
            let index = `${tanarok.indexOf(tanar)}_img`
            document.getElementById(index).style.backgroundImage = `url(${bkgsrc})`;
            
        })
    
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
        document.getElementById("5").addEventListener("click", () =>{
            popup(4)
        })
        document.getElementById("6").addEventListener("click", () =>{
            popup(5)
        })
        document.getElementById("7").addEventListener("click", () =>{
            popup(6)
        })
        document.getElementById("8").addEventListener("click", () =>{
            popup(7)
        })
        document.getElementById("9").addEventListener("click", () =>{
            popup(8)
        })

    }
    if (document.URL.includes("modos_merch.html")){
        let index = 0;
        merchinfo.forEach(merch =>{
            if (merch.Id == "hoodie"){
                document.getElementById("ruha").innerHTML += `
                <div class="card">
                    <img id="${index}${merch.Id}_img" class="ekcsölikep" src="" alt="">
                    <div class="courtain" alt=""></div>
                    <div class="cardtext">
                        <h1 class="tanarnevcard">${merch.MerchName}</h1>
                    </div>
                    <div class="cardbutton">
                        <button id="${index}"  class="open_popup"><h1>Info</h1></button>
                    </div>
                </div>`

            
                document.getElementById(`${index}${merch.Id}_img`).style.backgroundImage = `url(${merch.Sources[0]})`;
                index++

            }
            
            if (merch.Id == "tshirt"){
                document.getElementById("ruha").innerHTML += `
                <div class="card">
                    <img id="${index}${merch.Id}_img" class="ekcsölikep" src="" alt="">
                    <div class="courtain" alt=""></div>
                    <div class="cardtext">
                        <h1 class="tanarnevcard">${merch.MerchName}</h1>
                    </div>
                    <div class="cardbutton">
                        <button id="${index}"  class="open_popup"><h1>Info</h1></button>
                    </div>
                </div>`
                
                
                document.getElementById(`${index}${merch.Id}_img`).style.backgroundImage = `url(${merch.Sources[0]})`;
                document.getElementById(`${index}${merch.Id}_img`).style.backgroundPositionY = "0%";
                index++

            }

            if (merch.Id == "mug"){
                document.getElementById("kellek").innerHTML += `
                <div class="card">
                    <img id="${index}${merch.Id}_img" class="ekcsölikep" src="" alt="">
                    <div class="courtain" alt=""></div>
                    <div class="cardtext">
                        <h1 class="tanarnevcard">${merch.MerchName}</h1>
                    </div>
                    <div class="cardbutton">
                        <button id="${index}"  class="open_popup"><h1>Info</h1></button>
                    </div>
                </div>`
                
                
                document.getElementById(`${index}${merch.Id}_img`).style.backgroundImage = `url(${merch.Sources[0]})`;
                document.getElementById(`${index}${merch.Id}_img`).style.backgroundPositionY = "100%";
                index++

            }

            if (merch.Id == "sticker"){
                document.getElementById("kellek").innerHTML += `
                <div class="card">
                    <img id="${index}${merch.Id}_img" class="ekcsölikep" src="" alt="">
                    <div class="courtain" alt=""></div>
                    <div class="cardtext">
                        <h1 class="tanarnevcard">${merch.MerchName}</h1>
                    </div>
                    <div class="cardbutton">
                        <button id="${index}"  class="open_popup"><h1>Info</h1></button>
                    </div>
                </div>`
                
                
                document.getElementById(`${index}${merch.Id}_img`).style.backgroundImage = `url(${merch.Sources[0]})`;
                document.getElementById(`${index}${merch.Id}_img`).style.backgroundPositionY = "80%";
                document.getElementById(`${index}${merch.Id}_img`).style.backgroundSize = "50%";
                index++

            }
        })



        document.getElementById("0").addEventListener("click", () =>{
            popup(0)
        })
        document.getElementById("1").addEventListener("click", () =>{
            popup(1)
        })

        
        document.getElementById("2").addEventListener("click", () =>{
            popup(2)
        })
        document.getElementById("3").addEventListener("click", () =>{
            popup(3)
        })
            
    }


}





//módos

//carousel









//~~~~~~~~~~~~~~~~~~~~~~~~~Csoki~~~~~~~~~~~~~~~~~~~~~~~~~~~




document.querySelector(".cart").addEventListener("click", () =>{
    //#cart_popup
    document.getElementById("cart_popup").innerHTML = ""

    cart.forEach(carted =>{
        if (carted.id != "mug" &&  carted.id != "sticker"){
            document.getElementById("cart_popup").innerHTML += ` 
            <div>
                <p>${carted.Name}</p>
                <p>${carted.Color}</p>
                <p>${carted.Size}</p>
                <p>${carted.Price}Ft</p>
                <p></p>
            </div>`

        }
        else{
            document.getElementById("cart_popup").innerHTML += ` 
            <div>
                <p>${carted.Name}</p>
                <p>${carted.Price}Ft</p>
                <p></p>
            </div>`
        }
    })

    document.getElementById("cart_popup").style.display = "block";
    document.getElementById("cart_popup").innerHTML += `<button id="purchaseButton">Purchase</button>
    <button class="close2">Bezár</button>`

    document.querySelector('.close2').addEventListener("click", () =>{
        document.getElementById("cart_popup").style.display = "none"
    });

    document.getElementById("purchaseButton").addEventListener("click", () => {
        const cart_data = {};
        
        
        Object.keys(cart).forEach((key) => {
            const array = cart[key]
            cart_data[key] = []
            array.forEach((product) => {
                cart_data[key].push(product.toServerRepr())
            })
        });
        
        
        console.log(JSON.stringify(cart_data))
        return
        fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart_data)
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
})




