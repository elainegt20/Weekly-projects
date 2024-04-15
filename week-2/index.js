const drawer = require("./drawer");
// DO NOT EDIT CODE ABOVE

// Level 1: removeItem and addItem

function removeItem(name, drawer) {
  // Iterates through the drawer array
  for (let i = 0; i < drawer.length; i++) {
    // If the currency is found (name), decrement its quantity, equivalent to removing one item of the provided currency
    if (drawer[i]["name"] === name) {
      drawer[i].quantity -= 1;
    }
  }
  return drawer;
}

function addItem(name, drawer) {
  // Iterates through the drawer array
  for (let i = 0; i < drawer.length; i++) {
    // If the currency is found (name), increment its quantity, equivalent to adding one item of the provided currency
    if (drawer[i]["name"] === name) {
      drawer[i].quantity += 1;
    }
  }
  return drawer;
}
// Note: The value of each denomination is expressed in pennies

// Level 2: countCoins and countNotes
function countCoins(drawer) {
  let coins = 0;
  // Iterates through the drawer array
  for (let i = 0; i < drawer.length; i++) {
    // If the denomination's value is less than 100, it is considered a coin
    if (drawer[i].value < 100) {
      coins += drawer[i].quantity; // Adds the quantity of that denomination to the count
    }
  }
  return coins; // Returns the number of coins
}

function countNotes(drawer) {
  let notes = 0;
  // Iterates through the drawer array
  for (let i = 0; i < drawer.length; i++) {
    // If the denomination's value is 100 or more, it is considered a note
    if (drawer[i].value >= 100) {
      notes += drawer[i].quantity; // Adds the quantity of that denomination to the count
    }
  }
  return notes; // Returns the number of notes
}

// Level 3: sumDrawer

function sumDrawer(drawer) {
  let totalAmount = 0;

  // Iterates through the drawer array
  for (let i = 0; i < drawer.length; i++) {
    // Calculate the total amount of each denomination and add it to the total amount
    totalAmount += drawer[i].value * drawer[i].quantity;
  }

  // As the value of each currency is expressed in pennies, divide by 100 to get an acceptable amount
  // Format the total amount as a string in dollars
  // Round to two decimal points
  const formattedAmount = "$" + (totalAmount / 100).toFixed(2);

  return formattedAmount;
}

// Level 4: canMakeAmount

function canMakeAmount(target, drawer) {
  let money = [];

  // Iterates through the drawer array
  for (let i = 0; i < drawer.length; i++) {
    // For each denomination/item in the drawer, push the denomination's value times its quantity into the money array
    // As a result, the money array will have the quantity of every denomination expressed in pennies organized in ascending order
    for (let j = 0; j < drawer[i].quantity; j++) {
      money.push(drawer[i].value);
    }
  }

  // Function to determine if it is possible to make a certain target amount from the money array
  // It takes two arguments, currentAmount which may be reduced each time by subtracting the current money or money[index]
  function canMake(currentAmount, index) {
    if (currentAmount === 0) return true; // If currentAmount equals zero, it means the denominations to reach that target are available
    if (currentAmount < 0 || index >= money.length) return false; // Checks if the denomination exceeds the target or if it is out of the bounds of the array

    /*    using the current coin and not using the current coin.
          handling cases where coins cannot contribute to a solution,
          Skipping avoids unnecessary recursive calls.
          Calls function recursively until true or false is returned; 
          increasing index and decreasing or not the current amount
    */
    return (
      canMake(currentAmount - money[index], index + 1) ||
      canMake(currentAmount, index + 1)
    );
  }

  return canMake(target, 0);
}

// Level 5: transaction

function transaction(cost, paid, drawer) {
  let currentAmount = paid; // keeps track of the next denomination to be added to the drawer, initially set to the paid amount
  let change = paid - cost; // Calculates the change to be extracted from the drawer
  if (paid < cost) return "Insufficient Funds"; // Checks if the paid amount is enough to cover the cost

  // Add to drawer
  // Iterates through the drawer in descending order
  for (let i = drawer.length - 1; i >= 0; i--) {
    let amountToAdd = Math.floor(currentAmount / drawer[i].value); // Calculates and rounds the amount to add to the drawer by checking the times currentAmount fits into the current value
    drawer[i].quantity += amountToAdd;
    currentAmount %= drawer[i].value; // CurrentAmount is set to the remainder of currentAmount and current value for the next iteration's purposes
  }

  // Subtract change from the drawer
  // Iterates through the drawer in descending order
  for (let i = drawer.length - 1; i >= 0; i--) {
    // Checks if the quantity of the current denomination is greater than zero to avoid processing over that denomination
    if (drawer[i].quantity > 0) {
      // e.g., if the amount to subtract is 2 of $1 dollar but the quantity available of that denomination is 1 $1 dollar, take what is left ($1) from that denomination
      let amountToSubtract = Math.min(
        Math.floor(change / drawer[i].value),
        drawer[i].quantity
      );
      drawer[i].quantity -= amountToSubtract;
      change -= amountToSubtract * drawer[i].value; // Subtracts quantity per value from the change to update it
      if (change === 0) break; // Checks if reached change to give back to stop further processing
    }
  }

  // Final check to see if all change was given
  if (change > 0) return "Unable to provide exact change";
  return drawer;
}

// DO NOT EDIT CODE BELOW
module.exports = {
  removeItem,
  addItem,
  countCoins,
  countNotes,
  sumDrawer,
  canMakeAmount,
  transaction,
};
