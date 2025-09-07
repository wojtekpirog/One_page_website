let root;
let navbar;
let burgerBtn;
let navbarItems;
let navbarOverlay;
let burgerBtnBars;
let scrollToTopButton;
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
  root = document.documentElement;
  navbar = document.querySelector(".navbar");
  burgerBtn = document.querySelector(".burger-btn");
  navbarItems = document.querySelectorAll(".navbar__link");
  navbarOverlay = document.querySelector(".navbar__overlay");
  burgerBtnBars = document.querySelector(".burger-btn__bars");
  scrollToTopButton = document.querySelector(".scroll-to-top-button");
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
  navbarOverlay.addEventListener("click", closeNavbar);
  scrollToTopButton.addEventListener("click", scrollToTop);
  clearBtn.addEventListener("click", handleFormClear);
  submitBtn.addEventListener("click", handleFormSubmit);
  modalCloseButton.addEventListener("click", closeModal);
  window.addEventListener("scroll", setBurgerBtnColor);
  window.addEventListener("scroll", handleScrollToTop);
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
    // If the navigation is closed, open it
    openNavbar();
    // When clicked, each link inside the navigation should close the navigation
    navbarItems.forEach((navbarItem) => {
      navbarItem.addEventListener("click", closeNavbar);
    });
  } else {
    // If the navigation is open, close it
    closeNavbar();
    // When closing the navigation, the event listener should be removed from each link
    navbarItems.forEach((navbarItem) => {
      navbarItem.removeEventListener("click", openNavbar);
    });
  }
  
  handleNavLinkAnimation();
}

const openNavbar = () => {
  navbar.classList.add("navbar--active");
  navbarOverlay.classList.add("navbar__overlay--active");
  burgerBtn.classList.add("burger-btn--active");
  burgerBtn.classList.remove("burger-btn--black-bars");
  burgerBtn.setAttribute("aria-expanded", "true");
  burgerBtn.setAttribute("aria-label", "Zamknij menu nawigacyjne");
  document.body.classList.add("no-scroll");
  burgerBtnBars.classList.remove("black-bars");
}

const closeNavbar = () => {
  navbar.classList.remove("navbar--active");
  navbarOverlay.classList.remove("navbar__overlay--active");
  burgerBtn.classList.remove("burger-btn--active");
  burgerBtn.setAttribute("aria-expanded", "false");
  burgerBtn.setAttribute("aria-label", "Otwórz menu nawigacyjne");
  document.body.classList.remove("no-scroll");
  // When closing the navigation, set the color of the burger menu icon color based to the background color of the current section
  setBurgerBtnColor();
}

const handleNavLinkAnimation = () => {
  let delay = 0;

  navbarItems.forEach((item) => {
    item.classList.toggle("navbar__link-animation");
    item.style.setProperty("animation-delay", `${delay}ms`);
    delay += 100;
  });
}

const handleCurrentYear = () => {
  const year = new Date().getFullYear();
  footerYear.textContent = year;
}

const setBurgerBtnColor = () => {
  // Current amount of scroll
  const currentSection = window.scrollY;

  allSections.forEach((section) => {
    if (section.classList.contains("section--white") && section.offsetTop <= currentSection) {
      burgerBtn.classList.add("burger-btn--black-bars");
    } else if (!section.classList.contains("section--white") && section.offsetTop <= currentSection) {
      burgerBtn.classList.remove("burger-btn--black-bars");
    }
  });
}

const handleScrollToTop = () => {
  // Get the current amount of scroll
  const currentScrollPosition = window.scrollY;
  // Get the total height of the document
  const totalScrollHeight = root.scrollHeight;
  // Get the current viewport height
  const viewportHeight = root.clientHeight;
  // Get the maximum scroll height
  const maxScrollHeight = totalScrollHeight - viewportHeight;
  // If the current scroll position is greater than half the maximum scroll height, show the scroll to top button
  currentScrollPosition > Math.round(maxScrollHeight * 0.3)
    ? scrollToTopButton.classList.remove("scroll-to-top-button--hidden")
    : scrollToTopButton.classList.add("scroll-to-top-button--hidden");
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
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