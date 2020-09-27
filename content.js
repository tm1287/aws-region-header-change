const navContainer = document.getElementById("awsc-navigation-container");
const headerShelf = navContainer.childNodes[0];
headerShelf.style.backgroundColor = "red";

const regionMenuParent = document.getElementById(
  "awsc-navigation__more-menu--list"
);

let menuButton = regionMenuParent.querySelector(
  '[data-testid = "awsc-nav-regions-menu-button"]'
);

let region = menuButton.innerHTML.match(/(?<=>)(.*?)(?=<)/g)[0];
