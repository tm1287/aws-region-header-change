let region = document.getElementById("region");

chrome.storage.local.get("region", function (data) {
  region.textContent = data.region;
});

chrome.storage.local.get("currentColor", function (data) {
  region.style.backgroundColor = data.currentColor;
});
