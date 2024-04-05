//call prompt-sync in order to get prompting function.

const prompt = require("prompt-sync")();

// Function to generate a random choice of rock, paper, or scissors
function randomChoice() {
  let choice = Math.random(); // Generate a random number between 0 and 1
  choice *= 3; // Scale the random number to be between 0 and 3
  choice = Math.floor(choice); // Round down to the nearest integer
  if (choice === 0) {
    return "rock";
  } else if (choice === 1) {
    return "paper";
  } else if (choice === 2) {
    return "scissors";
  }
}

// Function to determine the winner between two player choices

function winner(player1, player2) {
  if (player1 === player2) {
    return "It's a tie";
  } else if (
    (player1 === "rock" && player2 === "scissors") ||
    (player1 === "scissors" && player2 === "paper") ||
    (player1 === "paper" && player2 === "rock")
  ) {
    return "Player 1 wins!";
  } else {
    return "Player 2 wins!";
  }
}

let player1Score = 0; // Initialize Player 1's score
let player2Score = 0; // Initialize Player 2's score

// Function to update the scores based on the result

function score(result) {
  if (result === "Player 1 wins!") {
    player1Score += 1;
  } else if (result === "Player 2 wins!") {
    player2Score += 1;
  }
}

let round = 0; // Initialize the round counter

// Loop to play 10 rounds of rock, paper, scissors

while (round < 10) {
  console.log("computer's turn");
  const player1 = randomChoice(); // Get player computer choice
  console.log("your turn");
  let player2 = prompt("My choice is: ").toLocaleLowerCase(); // Get player 2's choice and format it
  //check for an invalid answer, keeps running until a valid answer is provided
  while (player2 !== "rock" && player2 !== "paper" && player2 !== "scissor") {
    console.log("Not a valid answer");
    let tryAgain = prompt("Try Again, please: ").toLocaleLowerCase();// get correct answer and format it
    player2 = tryAgain; //assign proper answer to your player
  }
  const result = winner(player1, player2); // Determine the winner
  score(result); // Update the scores based on the result
  round += 1; // Increment the round counter
}

//function to return a winner announcement message: compares player1Score and player2Score variable to return the right message

function winnerannouncement(player1Score, player2Score) {
  if (player1Score > player2Score) {
    return "Congratulations to Player 1 for triumphing over Player 2 in a thrilling match! Well done!";
  } else if (player2Score > player1Score) {
    return "Congratulations to Player 2 for triumphing over Player 2 in a thrilling match! Well done!";
  } else {
    return "After an intense match, Player 1 and Player 2 have both emerged victorious, ending in a remarkable tie. Congratulations to both!";
  }
}

// Display the final scores a winner message
console.log("Final score:");
console.log("Player 1 Score:", player1Score);
console.log("Player 2 Score:", player2Score);
console.log(winnerannouncement(player1Score, player2Score));
