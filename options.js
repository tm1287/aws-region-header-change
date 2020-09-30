let table = document.getElementById("color-table");
let form = document.getElementById("color-form");
let resetDefaultButton = document.getElementById("reset-default-button");

/**
 * Update the color cell (If valid or not).
 * Save colors to storage as well
 */
function updateColor() {
  let colorCell = document.getElementById(this.name + "-color");
  let newHex = validateHex(this.value);
  console.log(newHex);
  colorCell.style.backgroundColor = newHex ? newHex : "#FFFFFF";
  colorCell.innerHTML = newHex ? "" : "INVALID";
  this.setAttribute("valid", newHex ? true : false);
  validateForm();
}

/**
 * Return standardized Hex Code if valid.
 * @param {Hex code from input field} hexCode
 */
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

/**
 * Checks if all input fields contains valid hex codes.
 * Then saves new colors to storage
 */
function validateForm() {
  chrome.storage.local.get("regionColors", function (data) {
    let invalidCount = 0;
    let regionColors = data.regionColors;
    for (var key in regionColors) {
      if (regionColors.hasOwnProperty(key)) {
        console.log(document.forms["color-form"][key]);
        if (
          document.forms["color-form"][key].getAttribute("valid") === "false"
        ) {
          invalidCount += 1;
        }
      }
    }
    if (invalidCount >= 1) {
      console.log("Ensure all Hex Codes are valid");
    } else {
      //Write new colors to storage
      for (var key in regionColors) {
        if (regionColors.hasOwnProperty(key)) {
          regionColors[key].fontColor = document.forms["color-form"][key].value;
        }
      }

      chrome.storage.local.set({ regionColors: regionColors }, function () {
        console.log("Colors Updated");
      });
    }
  });
}

/**
 * Resets options and input fields to default colors.
 */
function resetDefaultForm() {
  chrome.storage.local.get("defaultRegionColors", function (data) {
    let defaultColors = data.defaultRegionColors;
    for (var key in defaultColors) {
      if (defaultColors.hasOwnProperty(key)) {
        let inputCell = document.getElementById(key + "-input");
        let colorCell = document.getElementById(key + "-color");

        inputCell.value = defaultColors[key].fontColor.toUpperCase();
        inputCell.setAttribute("valid", true);

        colorCell.style.backgroundColor = defaultColors[key].fontColor;
        colorCell.innerHTML = "";
      }
    }
  });
  validateForm();
}

/**
 * Fully resets options and input fields
 */
function resetForm() {
  chrome.storage.local.get("regionColors", function (data) {
    let regionColors = data.regionColors;
    for (var key in regionColors) {
      if (regionColors.hasOwnProperty(key)) {
        let inputCell = document.getElementById(key + "-input");
        let colorCell = document.getElementById(key + "-color");

        inputCell.setAttribute("valid", true);

        colorCell.style.backgroundColor = "";
        colorCell.innerHTML = "";
      }
    }
  });
  validateForm();
}

// Bind elements to functions
form.onsubmit = validateForm;
form.onreset = resetForm;
resetDefaultButton.onclick = resetDefaultForm;

// Populate html with table, labels, and input fields from active region colors
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
      input.setAttribute("valid", true);

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
