let table = document.getElementById("color-table");

function updateColor(currentColors) {
  let colorCell = document.getElementById(this.name + "-color");
  let newHex = validateHex(this.value);
  console.log(newHex);
  colorCell.style.backgroundColor = newHex ? newHex : "#FFFFFF";
  colorCell.innerHTML = newHex ? "" : "INVALID HEX CODE";
}

function validateHex(hexCode) {
  const hashRegEx = RegExp("^#[0-9A-Fa-f]{6}$");
  const noHashRegEx = RegExp("^[0-9A-Fa-f]{6}$");
  if (hexCode.match(hashRegEx)) {
    return hexCode.match(hashRegEx)[0].toUpperCase();
  } else if (hexCode.match(noHashRegEx)) {
    return "#" + hexCode.match(noHashRegEx)[0].toUpperCase();
  } else {
    return false;
  }
}

chrome.storage.local.get("regionColors", function (data) {
  let regionColors = data.regionColors;
  for (var key in regionColors) {
    if (regionColors.hasOwnProperty(key)) {
      let tableRow = document.createElement("tr");
      tableRow.id = key + "-row";

      let labelDataCell = document.createElement("td");

      let label = document.createElement("label");
      label.for = key;
      label.innerHTML = key;
      labelDataCell.appendChild(label);

      let inputDataCell = document.createElement("td");

      let input = document.createElement("input");
      input.type = "text";
      input.id = key + "-input";
      input.name = key;
      input.value = regionColors[key].fontColor.toUpperCase();

      input.addEventListener("change", updateColor);
      inputDataCell.appendChild(input);

      let colorDataCell = document.createElement("td");
      colorDataCell.id = key + "-color";
      colorDataCell.style.backgroundColor = regionColors[key].fontColor;
      colorDataCell.style.color = "red";

      tableRow.appendChild(labelDataCell);
      tableRow.appendChild(inputDataCell);
      tableRow.appendChild(colorDataCell);

      table.appendChild(tableRow);
    }
  }
});
