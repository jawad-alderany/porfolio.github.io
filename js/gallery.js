var fileName;
var srcWidth;
var srcHeight;
var curpage = 1;
var pagesNum = 6;
var sliding = false;
var click = true;
var left = document.getElementById("left");
var right = document.getElementById("right");
var pagePrefix = "slide";
var pageShift = 500;
var transitionPrefix = "circle";
var svg = true;

document.getElementsByClassName("close_btn")[0].addEventListener("click", function () {
    if (history.length >= 1)
        history.back();
    else
        location.href = "../index.html";
});

setAlbum();


function leftSlide() {
    if (click) {
        if (curpage == 1) curpage = pagesNum + 1;
        //console.log("woek");
        sliding = true;
        curpage--;
        svg = true;
        click = false;
        for (k = 1; k <= pagesNum; k++) {
            var a1 = document.getElementById(pagePrefix + k);
            a1.className += " tran";
        }
        setTimeout(() => {
            move();
        }, 200);
        setTimeout(() => {
            for (k = 1; k <= pagesNum; k++) {
                var a1 = document.getElementById(pagePrefix + k);
                a1.classList.remove("tran");
            }
        }, 1400);
    }
}

function rightSlide() {
    if (click) {
        if (curpage == pagesNum) curpage = 0;
        //console.log("woek");
        sliding = true;
        curpage++;
        svg = false;
        click = false;
        for (k = 1; k <= pagesNum; k++) {
            var a1 = document.getElementById(pagePrefix + k);
            a1.className += " tran";
        }
        setTimeout(() => {
            move();
        }, 200);
        setTimeout(() => {
            for (k = 1; k <= pagesNum; k++) {
                var a1 = document.getElementById(pagePrefix + k);
                a1.classList.remove("tran");
            }
        }, 1400);
    }
}

function move() {
    if (sliding) {
        sliding = false;
        if (svg) {
            for (j = 1; j <= 9; j++) {
                var c = document.getElementById(transitionPrefix + j);
                c.classList.remove("steap");
                c.setAttribute("class", transitionPrefix + j + " streak");
                //console.log("streak");
            }
        } else {
            for (j = 10; j <= 18; j++) {
                var c = document.getElementById(transitionPrefix + j);
                c.classList.remove("steap");
                c.setAttribute("class", transitionPrefix + j + " streak");
                //console.log("streak");
            }
        }
        setTimeout(() => {
            for (i = 1; i <= pagesNum; i++) {
                if (i == curpage) {
                    var a = document.getElementById(pagePrefix + i);
                    a.className += " up1";
                } else {
                    var b = document.getElementById(pagePrefix + i);
                    b.classList.remove("up1");
                }
            }
            sliding = true;
        }, 600);
        setTimeout(() => {
            click = true;
        }, 1700);

        setTimeout(() => {
            if (svg) {
                for (j = 1; j <= 9; j++) {
                    var c = document.getElementById(transitionPrefix + j);
                    c.classList.remove("streak");
                    c.setAttribute("class", transitionPrefix + j + " steap");
                }
            } else {
                for (j = 10; j <= 18; j++) {
                    var c = document.getElementById(transitionPrefix + j);
                    c.classList.remove("streak");
                    c.setAttribute("class", transitionPrefix + j + " steap");
                }
                sliding = true;
            }
        }, 850);
        setTimeout(() => {
            click = true;
        }, 1700);

        //change count & title
        setTimeout(() => {
            setCountPage();
            setTitlePage();
        }, 1000);
    }
}

left.onmousedown = () => {
    leftSlide();
};

right.onmousedown = () => {
    rightSlide();
};

document.onkeydown = e => {
    if (e.keyCode == 37) {
        leftSlide();
    } else if (e.keyCode == 39) {
        rightSlide();
    }
};

//for codepen header
// setTimeout(() => {
// 	rightSlide();
// }, 500);

function setCountPage() {
    document.getElementsByClassName("counter")[0].innerHTML = curpage + "/" + pagesNum;
}

function setTitlePage() {
    //document.getElementsByClassName("title")[0].innerHTML = "Title " + curpage;
}

//
//config images and sizes
//

function setAlbum() {

    try {
        var page = location.href.split('/');
        var album = page[page.length - 1].split('?')[1].split('=')[1];

    } catch (e) {
        location.href = '../index.html';
    }

    switch (album) {
        case 'propertymanagement':
            fileName = '../img/propertymanagement_';
            pagesNum = 51;
            srcWidth = 1366;
            srcHeight = 649;
            document.getElementsByClassName("counter")[0].style.color = "#757575";
            break;
        case 'sterilizationunit':
            fileName = '../img/sterilizationunit_';
            pagesNum = 20;
            srcWidth = 706;
            srcHeight = 448;
            break;
        case 'tenancyagreements':
            fileName = '../img/tenancyagreements_';
            pagesNum = 16;
            srcWidth = 1366;
            srcHeight = 768;
            break;
        case 'knowledge':
            fileName = '../img/knowledge_';
            pagesNum = 19;
            srcWidth = 1360;
            srcHeight = 768;
            break;
        case 'settings':
            fileName = '../img/settings_';
            pagesNum = 6;
            srcWidth = 890;
            srcHeight = 542;
            document.getElementsByClassName("counter")[0].style.color = "#757575";
            break;
        case 'sukna':
            fileName = '../img/sukna_';
            pagesNum = 23;
            srcWidth = 1366;
            srcHeight = 2246;
            break;
        case 'marketing':
            //fileName = '../img/marketing/_';
            //imageNum = 0;
            location.href = '../index.html';
            break;
        default:
            location.href = '../index.html';
            break;
    }

    setSvgSize();
    setImages();
    setCountPage();
    setTitlePage();
}

function setImages() {

    for (var i = 1; i <= pagesNum; i++) {
        //create and add slide 'i'
        const slide = document.createElement("div");
        slide.id = "slide" + i;
        slide.classList.add("slide-c");
        slide.classList.add("slide" + i);
        if (i == 1)
            slide.classList.add("up1");

        //slide.innerHTML = "Title Center" + i;

        //set image as background
        //slide.style.setProperty('background-image', 'url("' + fileName + '' + i + '.png")');

        //or create image elemetnt
        const image = document.createElement('img');
        image.setAttribute('src', fileName + '' + i + '.jpg');
        image.classList.add("center");
        slide.appendChild(image);

        document.getElementsByClassName("slider")[0].appendChild(slide);
    }
}

function setSvgSize() {
    // set parent ratio
    var parent = document.getElementsByClassName("parent")[0];
    var v = calculateAspectRatioFit(srcWidth, srcHeight, parent.offsetWidth, parent.offsetHeight);
    //parent.setAttribute('aspect-ratio', 'v.heigh/v.width');
    parent.style.height = v.height + "px";
    parent.style.width = v.width + "px";

    //set right svg start position
    var svg1 = document.getElementById("svg1");
    svg1.style.width = parent.offsetWidth + "px";
    svg1.style.height = parent.offsetHeight + "px";

    //set left svg start position
    var svg2 = document.getElementById("svg2");
    svg2.style.width = parent.offsetWidth + "px";
    svg2.style.height = parent.offsetHeight + "px";

    //set radius and position for circales
    var space = parent.offsetWidth / 8;
    var radius = 35;
    var svg1cCircles = [].slice.call(svg1.children);
    var svg2cCircles = [].slice.call(svg2.children);

    for (var i = 0; i < svg1cCircles.length; i++) {
        svg1cCircles[i].setAttribute('r', radius);
        svg2cCircles[i].setAttribute('r', radius);
        radius += space;
    }
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth * ratio, height: srcHeight * ratio };
}