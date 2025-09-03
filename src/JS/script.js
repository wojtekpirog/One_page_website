let navbar;
let burgerBtn;
let navbarItems;
let burgerBtnBars;
let allSections;
let fullname;
let email;
let textarea;
let error;
let clearBtn;
let submitBtn;
let modal;
let modalShadow;
let modalCloseButton;
let footerYear;

const main = () => {
  prepareElements();
  addEventListeners();
  handleCurrentYear();
}

const prepareElements = () => {
  navbar = document.querySelector(".navbar");
  burgerBtn = document.querySelector(".burger-btn");
  navbarItems = document.querySelectorAll(".navbar__item");
  burgerBtnBars = document.querySelector(".burger-btn__bars");
  allSections = document.querySelectorAll(".section");
  fullname = document.querySelector("#fullname");
  email = document.querySelector("#email");
  textarea = document.querySelector("#message");
  error = document.querySelector(".contact__form-error");
  clearBtn = document.querySelector(".contact__form-btn--reset");
  submitBtn = document.querySelector(".contact__form-btn--submit");
  modal = document.querySelector(".modal");
  modalShadow = document.querySelector(".modal-shadow");
  modalCloseButton = document.querySelector(".modal__btn-close");
  footerYear = document.querySelector(".footer__year");
}

const addEventListeners = () => {
  burgerBtn.addEventListener("click", toggleNavbar);
  clearBtn.addEventListener("click", handleFormClear);
  submitBtn.addEventListener("click", handleFormSubmit);
  modalCloseButton.addEventListener("click", closeModal);
  window.addEventListener("scroll", handleObserver);
}

const handleFormClear = (event) => {
  event.preventDefault();
  [fullname, email, textarea].forEach((input) => {
    input.value = "";
    clearError(input);
  });
}

const handleFormSubmit = (event) => {
  event.preventDefault();

  checkForm([fullname, email, textarea]);
  checkLength([fullname, email, textarea]);
  checkEmailAddress(email);
  showModal();
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
  input.nextElementSibling.textContent = "";
  input.nextElementSibling.style.display = "none";
}

const toggleNavbar = () => {
  if (!navbar.classList.contains("navbar--active")) {
    // If the navigation is not active, activate it & set the aria-expanded attribute to true
    navbar.classList.add("navbar--active");
    burgerBtn.classList.add("burger-btn__active");
    burgerBtn.setAttribute("aria-expanded", "true");
    // Add an event listener to each link inside the navigation
    navbarItems.forEach((item) => {
      item.addEventListener("click", () => {
        navbar.classList.remove("navbar--active");
        burgerBtn.classList.remove("burger-btn__active");
      });
    });
  } else {
    // If the navigation is active, deactivate it & set the aria-expanded attribute to false
    navbar.classList.remove("navbar--active");
    burgerBtn.classList.remove("burger-btn__active");
    burgerBtn.setAttribute("aria-expanded", "false");
    // Remove the event listener from each link inside the navigation
    navbarItems.forEach((item) => {
      item.removeEventListener("click", () => {
        navbar.classList.remove("navbar--active");
        burgerBtn.classList.remove("burger-btn__active");
      });
    });
  }
  
  handleNavItemAnimation();
  handleObserver();
}

const handleNavItemAnimation = () => {
  let delay = 0;

  navbarItems.forEach((item) => {
    item.classList.toggle("navbar__item-animation");
    item.style.animationDelay = `${delay}ms`;
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

const showModal = () => {
  let errorCount = 0;

  [fullname, email, textarea].forEach((input) => {
    if (input.nextElementSibling.style.display === "block") {
      errorCount += 1;
    }
  })

  if (errorCount === 0) {
    modal.classList.add("active", "animation");
    modalShadow.classList.add("active", "animation");
  }
}

const closeModal = () => {
  modal.classList.remove("active", "animation");
  modalShadow.classList.remove("active", "animation");
}

document.addEventListener("DOMContentLoaded", main);