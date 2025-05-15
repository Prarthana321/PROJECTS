// Function to calculate and display total petrol cost
function calculateTotal() {
    const costPerLiter = parseFloat(document.getElementById("costPerLiter").value);
    const liters = parseFloat(document.getElementById("litersPurchased").value);
  
    // Validate inputs
    if (isNaN(costPerLiter) || isNaN(liters)) {
      alert("Please enter valid numbers!");
      return;
    }
  
    // Calculate total cost
    const total = (costPerLiter * liters).toFixed(2);
  
    // Display result in the paragraph element
    document.getElementById("totalCost").innerText = `Total: $${total}`;
  }