let fillingHeight = document.getElementById('filling').clientHeight;
let navHeight = document.querySelector('nav').clientHeight - 171;
console.log(navHeight)

/*
document.addEventListener("scroll", (e) => {

    console.log(window.pageYOffset)
    if (window.pageYOffset > 200){
        document.querySelector('nav').style.height = navHeight - 5 + "px";
        document.getElementById('filling').style.height = navHeight - 5 + "px";
        document.getElementById('nav_img').style.height = imgHeight - 5 + "px";
        document.getElementById('nav_img').style.width = imgWidth - 5 + "px";
        navHeight -= 1;
    }

    if (window.pageYOffset > 200){
        document.querySelector('nav').style.height = navHeight + 5 + "px";
        document.getElementById('filling').style.height = navHeight + 5 + "px";
        document.getElementById('nav_img').style.height = imgHeight + 5 + "px";
        document.getElementById('nav_img').style.width = imgWidth + 5 + "px";
        navHeight += 1;
    }
    if (navHeight > 100){
        document.querySelector('nav').style.height = navHeight - 10 + "px";
        document.getElementById('filling').style.height = navHeight - 10 + "px";
        navHeight -= 10;
    }
    const rect = document.querySelector('nav').getBoundingClientRect();
    console.log(rect.bottom)
    if (rect.bottom < 0){
        document.querySelector('nav').style.height = navHeight + 10 + "px";
        document.getElementById('filling').style.height = navHeight + 10 + "px";
        navHeight += 10;
    }
});
*/

let lastScrollTop = 0;
let imgWidth = document.getElementById('nav_img').clientWidth;


document.addEventListener("scroll", (e) => {

    let st = window.pageYOffset;
    if (st < 500){
        if (st > lastScrollTop ){
            
            if (navHeight < 20 && navHeight > 10){
                document.querySelector('nav').style.height = navHeight -1 + "%";
                document.getElementById('filling').style.height = navHeight -1 + "%";
                document.getElementById('nav_img').style.width = imgWidth - 1 + "%";
                navHeight -= 1;
                console.log(navHeight)
            }
        } else if (st < lastScrollTop){
            // if (navHeight < 150){
            //     document.querySelector('nav').style.height = navHeight + 1 + "px";
            //     document.getElementById('filling').style.height = navHeight + 1 + "px";
            //     document.getElementById('nav_img').style.height = imgHeight + 1 + "px";
            //     document.getElementById('nav_img').style.width = imgWidth + 1 + "px";
            //     navHeight += 2;
            //     console.log(navHeight)

            // }
        }

    }
    if (st == 0){
        document.querySelector('nav').style.height =  "20%";
        document.getElementById('filling').style.height = "20%";
        document.getElementById('nav_img').style.width = "20%";
        navHeight = "20%";
    }
    lastScrollTop = st <= 0 ? 0 : st;
}, false);
