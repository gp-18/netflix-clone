// navbar js
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}

function closemenu() {
  sidemenu.style.right = "-200px";
}

document.querySelectorAll(".sidemenu-items").forEach((n) =>
  n.addEventListener("click", () => {
    sidemenu.style.right = "-200px";
  })
);

// banner js
let flag = 0;

function controller(x) {
  flag = flag + x;
  slideshow(flag);
}
slideshow(flag);

function slideshow(num) {
  let slides = document.getElementsByClassName("slide");

  if (num == slides.length) {
    flag = 0;
    num = 0;
  }

  if (num < 0) {
    flag = slides.length - 1;
    num = slides.length - 1;
  }

  for (let y of slides) {
    y.style.display = "none";
  }

  slides[num].style.display = "block";
}

// tv shows js

const carouselEffect = (c, i, a) => {
  const carousel = c;
  const firstImg = i;
  const arrowIcons = a;

  let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft,
    positionDiff;

  const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display =
      carousel.scrollLeft == scrollWidth ? "none" : "block";
  };
  arrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
      // if clicked icon is left, reduce width value from the carousel scroll left else add to it
      carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
  });

  const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if (
      carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) >
        -1 ||
      carousel.scrollLeft <= 0
    )
      return;
    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if (carousel.scrollLeft > prevScrollLeft) {
      // if user is scrolling to the right
      return (carousel.scrollLeft +=
        positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
    }
    // if user is scrolling to the left
    carousel.scrollLeft -=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  };
  const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
  };
  const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
  };
  const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if (!isDragging) return;
    isDragging = false;
    autoSlide();
  };
  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("touchstart", dragStart);
  document.addEventListener("mousemove", dragging);
  carousel.addEventListener("touchmove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("touchend", dragStop);
};

// first carousel variables
const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");

const carousel2 = document.querySelector(".carousel2");
const firstImg2 = carousel.querySelectorAll("img")[0];
const arrowIcons2 = document.querySelectorAll(".wrapper2 i");

const carousel3 = document.querySelector(".carousel3");
const firstImg3 = carousel.querySelectorAll("img")[0];
const arrowIcons3 = document.querySelectorAll(".wrapper3 i");

const carousel4 = document.querySelector(".carousel4");
const firstImg4 = carousel.querySelectorAll("img")[0];
const arrowIcons4 = document.querySelectorAll(".wrapper4 i");
// second carousel variables

carouselEffect(carousel, firstImg, arrowIcons);
carouselEffect(carousel2, firstImg2, arrowIcons2);
carouselEffect(carousel3, firstImg3, arrowIcons3);
carouselEffect(carousel4, firstImg4, arrowIcons4);
