const nav = document.querySelector(".nav");
const navBtn = document.querySelector(".burger-btn");
const allNavItems = document.querySelectorAll(".nav__item");

console.log(allNavItems);

const toggleNavbar = () => {
  nav.classList.toggle("nav--active");

  allNavItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
      nav.classList.remove("nav--active");
    });
  });
}

navBtn.addEventListener("click", toggleNavbar)