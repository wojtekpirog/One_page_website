let nav;
let navBtn;
let allNavItems;

const main = () => {
  prepareElements();
  addEventListeners();
}

const prepareElements = () => {
  nav = document.querySelector(".nav");
  navBtn = document.querySelector(".burger-btn");
  allNavItems = document.querySelectorAll(".nav__item")
}

const addEventListeners = () => {
  navBtn.addEventListener("click", toggleNavbar);  
}

const toggleNavbar = () => {
  nav.classList.toggle("nav--active");

  allNavItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
      nav.classList.remove("nav--active");
    });
  });
}

window.addEventListener("DOMContentLoaded", main);                                                    ''