let region = document.getElementById("region");

chrome.storage.local.get("region", function (data) {
  region.textContent = data.region;
});
