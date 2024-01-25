function addData(e) {
  e.preventDefault();

  // Get values from form elements
  var productName = document.getElementById("productName").value;
  var allergens = document.getElementById("allergens").selectedOptions;
  var allergensValue = Array.from(allergens)
    .map((option) => option.value)
    .join(", ");
  var ingredients = document.getElementById("ingredients").value;
  var handlingInstructions = document.getElementById(
    "handlingInstructions"
  ).value;
  var cookingInstructions = document.getElementById(
    "cookingInstructions"
  ).value; // New field
  var productNumber = document.getElementById("productNumber").value;
  var repackDate = document.getElementById("repackDate").value;
  var weight = document.getElementById("weightInput").value;
  var weightUnit = document.getElementById("weightSelect").value;
  var distributorLocation = document.getElementById(
    "distributorLocation"
  ).value;
  var labelSize = document.getElementById("labelSize").value;
  var establishmentNumber = document.getElementById(
    "establishmentNumber"
  ).value;

  // Create an object with the form data
  var formData = {
    productName: productName,
    allergens: allergensValue,
    ingredients: ingredients,
    handlingInstructions: handlingInstructions,
    cookingInstructions: cookingInstructions, // Include the new field
    productNumber: productNumber,
    repackDate: repackDate,
    weight: weight,
    weightUnit: weightUnit,
    distributorLocation: distributorLocation,
    labelSize: labelSize,
    establishmentNumber: establishmentNumber,
  };

  // Get existing data from local storage or initialize an empty array
  var existingData = JSON.parse(localStorage.getItem("labelData")) || [];

  // Remove previous data if any
  existingData = [formData];

  // Save the updated array back to local storage
  localStorage.setItem("labelData", JSON.stringify(existingData));

  alert("Data added successfully!");
}