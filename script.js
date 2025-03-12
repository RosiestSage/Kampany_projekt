let fillingHeight = document.getElementById('filling').clientHeight;
let navHeight = document.querySelector('nav').clientHeight;

/*
document.addEventListener("scroll", (e) => {
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
document.addEventListener("scroll", (e) => {

    let st = window.pageYOffset;
    if (st < 500){
        if (st > lastScrollTop ){
            if (navHeight > 100){
                document.querySelector('nav').style.height = navHeight - 5 + "px";
                document.getElementById('filling').style.height = navHeight - 5 + "px";
                navHeight -= 5;
            }
        } else if (st < lastScrollTop){
            if (navHeight < 150){
                document.querySelector('nav').style.height = navHeight + 5 + "px";
                document.getElementById('filling').style.height = navHeight + 5 + "px";
                navHeight += 5;
            }
        }

    }
    lastScrollTop = st <= 0 ? 0 : st;
    console.log(lastScrollTop)
}, false);