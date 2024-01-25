// Dom Selections
const labelSizeCount = document.getElementById("labelSize");
const gridContainer = document.getElementById("printablePart");
const printCount = document.getElementById("printCount");

// Change grid view function
labelSizeCount.addEventListener("change", () => {
  const labelSize = labelSizeCount.value;
  // Add the updated value on the exiting data in local storage which is labelData[0].labelSize
  let data = localStorage.getItem("labelData");
  data = JSON.parse(data); // parse the data string into an array of objects
  data[0].labelSize = labelSize;
  console.log(data);
  localStorage.setItem("labelData", JSON.stringify(data)); // stringify the data array before storing it
  // Call the function to maintain the label size
  maintainLabelSize();
  // Call the function to create information cards
  createInfoCards();
});

function maintainLabelSize() {
  let data = localStorage.getItem("labelData");
  data = JSON.parse(data); // parse the data string into an array of objects

  let labelSize = data[0].labelSize; // get the first label size value
  labelSizeCount.value = labelSize;
  console.log(labelSize);
  if (labelSize == 5160) {
    gridContainer.style.gridTemplateColumns = `repeat(3, 1fr)`;
    printCount.value = 30; // 3 across x 10 down
  } else if (labelSize == 5163) {
    gridContainer.style.gridTemplateColumns = `repeat(2, 1fr)`;
    printCount.value = 20; // 2 across x 10 down
  } else if (labelSize == 5168) {
    gridContainer.style.gridTemplateColumns = `repeat(2, 1fr)`;
    printCount.value = 4; // 2 across x 2 down
  } else {
    gridContainer.style.gridTemplateColumns = `repeat(2, 1fr)`;
    printCount.value = 4; // default value
  }
  // alert(data.labelSize);
  // gridPerLine.value(labelSize);
}
maintainLabelSize();

// Print the data
const printBtn = document.getElementById("print");
printBtn.addEventListener("click", () => {
  window.print();
});

// Function to create information cards dynamically
function createInfoCards() {
  const gridContainer = document.getElementById("printablePart");
  const fragment = document.createDocumentFragment();

  const data = localStorage.getItem("labelData");
  const informationData = JSON.parse(data);

  // Retrieve the first data entry
  const dataToDisplay = informationData.length > 0 ? [informationData[0]] : [];

  // Repeat the first data entry based on the printCount value
  const repeatedData = Array.from(
    { length: parseInt(printCount.value) },
    () => dataToDisplay[0]
  );

  repeatedData.forEach((data, index) => {
    const card = document.createElement("div");
    card.classList.add("info-card");

    let oldDate = new Date(data.repackDate);
    let newDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(oldDate);

    // Modify card content to include Establishment Number
    let establishmentNumberContent = "";
    if (data.establishmentNumber) {
      establishmentNumberContent = `EST P ${data.establishmentNumber};`;
    }

    const cardContent = `<h2>${data.productName}</h2>
        <p>Ingredients: ${data.ingredients}</p>
        <p>${
          data.allergens === "no" || data.allergens === "" ? "" : "Allergens: " + data.allergens + ";"
        } ${
      data.handlingInstructions === "no" ? "" : data.handlingInstructions + ";"
    } ${
      data.cookingInstructions ? data.cookingInstructions + ";" : ""
    } ${establishmentNumberContent}</p>
        
        <div class="card-main-info">
          <div class="card-left">
            <p>${data.distributorLocation}</p>
          </div>
          <div class="card-right">
            <p>${data.productNumber}</p>
            <p>${newDate}</p>
            <p>${data.weight} ${data.weightUnit}</p>
          </div>
        </div>`;

    card.innerHTML = cardContent;
    fragment.appendChild(card);
  });

  // Clear the existing cards before appending the new ones
  gridContainer.innerHTML = "";
  // Append all cards to the gridContainer at once
  gridContainer.appendChild(fragment);
}

// Call the function to create information cards
createInfoCards();

// Event listener for print count input change
printCount.addEventListener("input", () => {
  // Validate and set the minimum value to 1
  const count = Math.max(1, parseInt(printCount.value));
  printCount.value = count;
  createInfoCards();
});
// Font size control
const fontSizeInput = document.getElementById("fontSize");
const fontSizeValue = document.getElementById("fontSizeValue");

// Font size initialization
function initialFontSize() {
  const fontSize = localStorage.getItem("fontSize") || 14;
  if (fontSize) {
    fontSizeInput.value = fontSize;
    fontSizeValue.textContent = fontSize;
    updateCardFontSize(fontSize);
  }
}
initialFontSize();
fontSizeInput.addEventListener("input", () => {
  const newSize = fontSizeInput.value;
  fontSizeValue.textContent = newSize;
  localStorage.setItem("fontSize", newSize);
  updateCardFontSize(newSize);
});

function updateCardFontSize(fontSize) {
  const cards = document.querySelectorAll(".info-card");
  cards.forEach((card) => {
    card.style.fontSize = `${fontSize}px`;
  });
}
