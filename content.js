/**
 * Gets the nav container from the dom and isolates the header shelf containing the css styles
 */
const navContainer = document.getElementById("awsc-navigation-container");
const headerShelf = navContainer.childNodes[0];

/**
 * Start to isolate the region dropdown to fetch the region data
 */
const regionMenuParent = document.getElementById(
  "awsc-navigation__more-menu--list"
);

let menuButton = regionMenuParent.querySelector(
  '[data-testid = "awsc-nav-regions-menu-button"]'
);

/**
 * Parse html using regex for region because element ids/classes are obfuscated
 */
let currentRegion = menuButton.innerHTML.match(/(?<=>)(.*?)(?=<)/g)[0];
console.log(currentRegion);
chrome.storage.local.set({ region: currentRegion });

/**
 * Fetch region colorings from storage
 */
chrome.storage.local.get("regionColors", function (data) {
  /**
   * Set the background color of the header based on the predefined styles
   */
  headerShelf.style.backgroundColor =
    data.regionColors[currentRegion].fontColor;
  chrome.storage.local.set({
    currentColor: data.regionColors[currentRegion].fontColor,
  });
});
