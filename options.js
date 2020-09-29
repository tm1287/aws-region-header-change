let form = document.getElementById("hexForm");

chrome.storage.local.get("regionColors", function (data) {
  for (var key in data.regionColors) {
    if (data.regionColors.hasOwnProperty(key)) {
      let label = document.createElement("label");
      label.for = key;
      label.innerHTML = key;
      form.appendChild(label);

      let input = document.createElement("input");
      input.type = "text";
      input.id = key;
      input.name = key;
      input.value = data.regionColors[key].fontColor;
      form.appendChild(input);

      let lineBreak = document.createElement("br");
      form.appendChild(lineBreak);
    }
  }

  let saveButton = document.createElement("input");
  saveButton.type = "submit";
  saveButton.value = "Save";
  form.appendChild(saveButton);
});
