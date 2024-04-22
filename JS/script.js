let nav;
let burgerBtn;
let allNavItems;

const main = () => {
  prepareElements();
  addEventListeners();
}

const prepareElements = () => {
  nav = document.querySelector(".nav");
  burgerBtn = document.querySelector(".burger-btn");
  allNavItems = document.querySelectorAll(".nav__item")
}

const addEventListeners = () => {
  burgerBtn.addEventListener("click", toggleNavbar);  
}

const toggleNavbar = () => {
  nav.classList.toggle("nav--active");
  
  allNavItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
      nav.classList.remove("nav--active");
    });
  });
  
  handleNavItemAnimation();
}

const handleNavItemAnimation = () => {
  let delay = 0;

  allNavItems.forEach((navItem) => {
    navItem.classList.toggle("nav__item-animation");
    navItem.style.animationDelay = `${delay}ms`;
    delay += 100;
  });
}

window.addEventListener("DOMContentLoaded", main);