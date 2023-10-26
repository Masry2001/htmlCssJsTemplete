
let landingPage = document.querySelector(".landing-page");
let imgsArr = ["landing7.jpg", "landing1.jpg", "landing2.jpg", "landing4.jpg", "landing5.jpg", "landing9.jpg", "landing10.jpg"];
let randomBackgroundElements = document.querySelectorAll(".random-background span");
let ourSkills = document.querySelector(".skills");

const colorsList = document.querySelectorAll(".colors-list li");

// checking if there is a color in the local storage
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
    // set the color in the local storage to the root element

    document.documentElement.style.setProperty("--main-color", mainColor);

    // remove active class from all lis
    colorsList.forEach((li) => {
        li.classList.remove("active");

        // add active class to the li with data-color === local storge value
        if (li.dataset.color === mainColor) {
            li.classList.add("active");
        }
    })
}


// start toggling spin class on icon and open class on settings box 
document.querySelector(".settings-icon i").onclick = function () {
    this.classList.toggle("fa-spin");

    document.querySelector(".settings").classList.toggle("open");
}
// end toggling spin class on icon and open class on settings box 



function handleActiveClass(event) {
    event.target.parentElement.querySelectorAll(".active").forEach((ele) => {
        ele.classList.remove("active");
    })

    event.target.classList.add("active");
}




// start handling colors 
colorsList.forEach((li) => {
    li.addEventListener("click", function (e) {

        handleActiveClass(e);

        let clickedColor = this.dataset.color;
        // set color on root
        document.documentElement.style.setProperty("--main-color", clickedColor);
        // set color on local storage
        localStorage.setItem("color_option", clickedColor);

    })
})
// end handling colors 





// start handling Random Background 
let backgroundOption = true;
let backgroundInterval;

// chekcing if there is a random background in the local storage
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {

    randomBackgroundElements.forEach((span) => {
        span.classList.remove("active");
    });


    if (backgroundLocalItem === "true") {
        backgroundOption = true;
        document.querySelector(".random-background .yes").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelector(".random-background .no").classList.add("active");
    }

}


randomBackgroundElements.forEach((span) => {
    span.addEventListener("click", function (e) {

        handleActiveClass(e)

        if (this.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
        }

        localStorage.setItem("background_option", backgroundOption);
    })

})
// end handling Random Background 





// start changing landing page background
function randomizeImgs() {
    if (backgroundOption) {

        backgroundInterval = setInterval(function () {

            let randomNum = Math.floor(Math.random() * imgsArr.length);

            landingPage.style.backgroundImage = `url("imgs/${imgsArr[randomNum]}")`;

        }, 5000)
    }
}
// end changing landing page background





// start animating skills when reaching section
window.onscroll = function () {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOffsetHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.scrollY;
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    if (windowScrollTop > (skillsOffsetHeight + skillsOffsetTop - windowHeight)) {
        allSkills.forEach((span) => {
            span.style.width = span.dataset.progress;
        })
    }
}
// end animating skills when reaching section



// start creating popup with the images
let ourGallery = document.querySelectorAll(".gallery .image-box img");

ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {

        // creat overlay element
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        // create popup box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        // create the image
        popupImage = document.createElement("img");

        popupImage.src = img.src;

        popupBox.appendChild(popupImage);

        document.body.appendChild(popupBox);

        if (img.alt !== null) {
            // create a heading contain the alt text
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }

        // create close span 
        let closeButton = document.createElement("span");
        let closeText = document.createTextNode("X");
        closeButton.appendChild(closeText);
        closeButton.className = "close-button";
        popupBox.appendChild(closeButton)

    })
})
// end creating popup with the images


// start closing popup 
document.addEventListener("click", function (e) {
    if (e.target.className == "close-button") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }

    if (e.target.className == "popup-overlay") {
        document.querySelector(".popup-box").remove();
        e.target.remove();
    }
})
// end closing popup 


// start nav bullets (scrolling to section using nav bullets and links)
let bullets = document.querySelectorAll(".nav .bullet");
let links = document.querySelectorAll(".links a");

function scrollToSection(elements) {
    elements.forEach((element) => {

        element.addEventListener("click", (e) => {

            e.preventDefault();
            let section = document.querySelector(e.target.dataset.section);
            section.scrollIntoView({
                behavior: "smooth", block: "start", inline: "nearest"
            })
        })
    })
}

scrollToSection(bullets);
scrollToSection(links);
// end nav bullets (scrolling to section using nav bullets and links)\


// start show bullets option
let bulletSpans = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
    // there is a vlaue in LS
    bulletSpans.forEach((span) => {
        span.classList.remove("active");
    })

    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");

    }
}

bulletSpans.forEach((span) => {
    span.addEventListener("click", (e) => {



        bulletsContainer.style.display = e.target.dataset.display;

        localStorage.setItem("bullets_option", e.target.dataset.display);
        handleActiveClass(e);
    })

})


// end show bullets option 


// start reset local storage using reset-options button

document.querySelector(".settings .reset-options").onclick = function () {
    localStorage.clear();
    window.location.reload();
}
// end reset local storage using reset-options button


// start toggle menu for small screens
let toggleBtn = document.querySelector(".header .toggle-menu");
let linksMenu = document.querySelector(".header .links");

toggleBtn.onclick = function (e) {
    // stop propagation for button
    // when you click on the button stop propagation prevent the event from calling the childrens of the buttons (spans)
    e.stopPropagation()
    // toggle class menu-active on button to show the before (the arrow)
    this.classList.toggle("menu-active");
    // toggle class open on links to make show the menu on small screens
    linksMenu.classList.toggle("open")
}

// stop propagation for menu
linksMenu.onclick = function (e) {
    e.stopPropagation();
}

// end toggle menu for small screens

// start click anywhere outside menu and toggle button to close the button
document.addEventListener("click", (e) => {
    if (e.target !== linksMenu) {
        // check if the menu is open 
        if (linksMenu.classList.contains("open")) {

            toggleBtn.classList.toggle("menu-active");
            linksMenu.classList.toggle("open");
        }
    }

})
// end click anywhere outside menu and toggle button to close the button 