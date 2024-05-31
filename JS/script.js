let nav;
let burgerBtn;
let allNavItems;
let burgerBtnBars;
let allSections;
let fullname;
let email;
let textarea;
let error;
let clearBtn;
let submitBtn;
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
  fullname = document.querySelector("#fullname");
  email = document.querySelector("#email");
  textarea = document.querySelector("#message");
  error = document.querySelector(".contact__form-error");
  clearBtn = document.querySelector(".contact__form-btn--reset");
  submitBtn = document.querySelector(".contact__form-btn--submit");
  footerYear = document.querySelector(".footer__year");
}

const addEventListeners = () => {
  burgerBtn.addEventListener("click", toggleNavbar);
  clearBtn.addEventListener("click", handleFormClear);
  submitBtn.addEventListener("click", handleFormSubmit);
  window.addEventListener("scroll", handleObserver);
}

const handleFormClear = (event) => {
  event.preventDefault();
  [fullname, email, textarea].forEach((input) => input.value = "");
}

const handleFormSubmit = (event) => {
  event.preventDefault();

  checkForm([fullname, email, textarea]);
  checkLength([fullname, email, textarea]);
  checkEmailAddress(email);
}

const checkForm = (formInputs) => {
  formInputs.forEach((input) => {
    if (input.value === "") {
      showError(input, "Pole jest puste!");
    } else {
      clearError(input);
    }
  });
}

const checkLength = (inputArray) => {
  inputArray.forEach((input) => {
    if (input.value.length < input.minLength || input.value.length > input.maxLength) {
      showError(input, `Pole "${input.previousElementSibling.textContent.slice(0, -2)}" musi zawierać od ${input.minLength} do ${input.maxLength} znaków.`);
    } else {
      clearError(input);
    }
  });
}

const checkEmailAddress = (emailInput) => {
  const regExp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  regExp.test(emailInput.value) ? clearError(emailInput) : showError(emailInput, "Adres e-mail jest nieprawidłowy!");
}

const showError = (input, message) => {
  input.style.borderColor = "tomato";
  input.nextElementSibling.style.display = "block";
  input.nextElementSibling.textContent = message;
}

const clearError = (input) => {
  input.style.borderColor = "#333";
  input.nextElementSibling.style.display = "none";
  input.nextElementSibling.textContent = "";
}

const toggleNavbar = () => {
  nav.classList.toggle("nav--active");
  burgerBtn.classList.toggle("active");
  
  allNavItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
      nav.classList.remove("nav--active");
      burgerBtn.classList.remove("active");
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