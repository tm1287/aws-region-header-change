let changeStatus = document.getElementById("changeStatus");

chrome.storage.sync.get("status", function (data) {
  changeStatus.style.backgroundColor = "#3aa757";
  changeStatus.setAttribute("value", "asdasd");
});

changeStatus.onclick = function (element) {
  let status = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.body.style.backgroundColor = "' + "#3aa757" + '";',
    });
  });
};
