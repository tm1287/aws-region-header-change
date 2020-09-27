//Region colormappings from https://github.com/JB4GDI/awsazcolorchromeextension
const regions = {
  Global: { fontColor: "#ffffff", backgroundColor: "#232f3e" },
  "N. Virginia": { fontColor: "#00297b", backgroundColor: "#97c8f0" },
  Ohio: { fontColor: "#d43547", backgroundColor: "#00155a" },
  "N. California": { fontColor: "#be8b5e", backgroundColor: "#b80a31" },
  Oregon: { fontColor: "#ffeb07", backgroundColor: "#002587" },
  "Hong Kong": { fontColor: "#ff9933", backgroundColor: "#ffffff" },
  Mumbai: { fontColor: "#138808", backgroundColor: "#ff9933" },
  Seoul: { fontColor: "#359a3e", backgroundColor: "#be1135" },
  Singapore: { fontColor: "#ffffff", backgroundColor: "#ed2939" },
  Sydney: { fontColor: "#262873", backgroundColor: "#f0ba19" },
  Tokyo: { fontColor: "#ffffff", backgroundColor: "#4b0082" },
  Central: { fontColor: "#d52b1e", backgroundColor: "#ffffff" },
  Frankfurt: { fontColor: "#fccf00", backgroundColor: "#ff0000" },
  Ireland: { fontColor: "#ff883e", backgroundColor: "#169b62" },
  London: { fontColor: "#cf142b", backgroundColor: "#ffffff" },
  Paris: { fontColor: "#ed2939", backgroundColor: "#002395" },
  Stockholm: { fontColor: "#ffc90e", backgroundColor: "#2452bd" },
  "São Paulo": { fontColor: "#294292", backgroundColor: "#212125" },
};

const navContainer = document.getElementById("awsc-navigation-container");
const headerShelf = navContainer.childNodes[0];

const regionMenuParent = document.getElementById(
  "awsc-navigation__more-menu--list"
);

let menuButton = regionMenuParent.querySelector(
  '[data-testid = "awsc-nav-regions-menu-button"]'
);

let currentRegion = menuButton.innerHTML.match(/(?<=>)(.*?)(?=<)/g)[0];
console.log(currentRegion);

headerShelf.style.backgroundColor = regions[currentRegion].fontColor;
