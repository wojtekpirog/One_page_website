let nav;
let burgerBtn;
let allNavItems;
let burgerBtnBars;
let allSections;
let footerYear;

const main = () => {
  prepareElements();
  addEventListeners();
  handleCurrentYear();
}

const prepareElements = () => {
  nav = document.querySelector(".nav");
  burgerBtn = document.querySelector(".burger-btn");
  allNavItems = document.querySelectorAll(".nav__item");
  burgerBtnBars = document.querySelector(".burger-btn__bars");
  allSections = document.querySelectorAll(".section");
  footerYear = document.querySelector(".footer__year");
}

const addEventListeners = () => {
  burgerBtn.addEventListener("click", toggleNavbar);
  window.addEventListener("scroll", handleObserver);
}

const toggleNavbar = () => {
  nav.classList.toggle("nav--active");
  burgerBtnBars.classList.remove("black-bars");
  
  allNavItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
      nav.classList.remove("nav--active");
    });
  });
  
  handleNavItemAnimation();
  handleObserver();
}

const handleNavItemAnimation = () => {
  let delay = 0;

  allNavItems.forEach((navItem) => {
    navItem.classList.toggle("nav__item-animation");
    navItem.style.animationDelay = `${delay}ms`;
    delay += 100;
  });
}

const handleCurrentYear = () => {
  const year = new Date().getFullYear();
  footerYear.textContent = year;
}

const handleObserver = () => {
  const currentSection = window.scrollY; // Położenie krawędzi przeglądarki

  allSections.forEach((section) => {
    if (section.classList.contains("white-section") && section.offsetTop <= currentSection + 20) {
      burgerBtnBars.classList.add("black-bars");
    } else if (!section.classList.contains("white-section") && section.offsetTop <= currentSection + 20) {
      burgerBtnBars.classList.remove("black-bars");
    }
  });
}

window.addEventListener("DOMContentLoaded", main);