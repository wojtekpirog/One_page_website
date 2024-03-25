const pageHeading = document.querySelector("h1");
const appContainer = document.querySelector(".app-container");
let headingHeight = pageHeading.offsetHeight;

document.addEventListener("DOMContentLoaded", () => {
  headingHeight = pageHeading.offsetHeight;
  appContainer.style.height = `calc(100vh - ${headingHeight}px)`;
});