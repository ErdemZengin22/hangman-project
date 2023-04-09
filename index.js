/*
Game starts by importing two modules: "prompt" from "readline-sync" and "wordBank" from "./word-bank.js".
The "prompt" module gets user input, and "wordBank" is a list of words that the game uses for the game.
*/
import prompt from "readline-sync";
import wordBank from "./word-bank.js";
/*Two variables, "wins" and "losses", are initialized to keep track of the player's wins and losses*/
let wins = 0;
let losses = 0;

/*The "getRandomWord()" function selects a random word from the "wordBank" for the player to guess.*/
function getRandomWord() {
  return wordBank[Math.floor(Math.random() * wordBank.length)];
}

/*The "hasWordBeenGuessed()" function checks if the player has guessed the word correctly
by comparing the original word to the player's current progress.*/
function hasWordBeenGuessed(word, progress) {
  return word === progress.join('');
}

/*The "updateProgress()" function updates the player's progress by replacing underscores with the correctly guessed letter.*/
function updateProgress(word, progress, letter) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      progress[i] = letter;
    }
  }
}
/*The "hangMan()" function is the main function that runs the game.*/
function hangMan() {
  /*Calling "getRandomWord()" to get a random word and initialize the player's progress (an array of underscores).*/
  const word = getRandomWord();
  const progress = Array(word.length).fill('_');
  /*Setting the limit of guesses to 6*/
  let guesses = 6;
/*while loop runs until the player either guesses the word or runs out of guesses.*/
  while (!hasWordBeenGuessed(word, progress) && guesses > 0) {
    /*Inside the loop, the player's progress and remaining guesses are displayed.*/
    console.log(`\n\nCurrent progress: ${progress.join(' ')}`);
    console.log(`You have ${guesses} guesses left.`);

    /*Asking player to input their guess*/
    const guess = prompt.question("Press CTRL + C to shutdown\nEnter your guess and hit Enter: ");

    /*If they enter more than one letter, they are prompted to enter a single letter.*/
    if (guess.length !== 1) {
      console.log("Please enter a SINGLE letter.");
    }
    /*If the player guesses a correct letter, the "updateProgress()" function is called to update their progress.*/
    else {
      const letter = guess.toLowerCase();
      if (word.includes(letter)) {
        updateProgress(word, progress, letter);
      }
      /*If not, the number of remaining guesses is decremented.*/
      else {
        guesses--;
      }
    }
  }

/*After the loop is complete, checking if the player has guessed the word correctly,
display a conditional message, update the wins or losses, and show the current win loss track*/
  if (hasWordBeenGuessed(word, progress)) {
    console.log(`\n**********\nCongratulations! You've guessed the word: ${word}`);
    wins++;
    console.log(`\nWins: ${wins}\nLosses: ${losses}\n`);
  } else {
    console.log(`\n\nUh-oh! You run out of your guesses. The word was: ${word}`);
    losses++;
    console.log(`\nWins: ${wins}\nLosses: ${losses}\n`);
  }
/*Asking player if they want to play again.*/
  const playAgain = prompt.question("\nWould you like to play again? (y/n): ");
  /*If they choose 'yes'the "hangMan()" function is called to start a new game.*/
  if (playAgain.toLowerCase() === 'y') {
    hangMan();
  }
  /*If not, their wins and losses are displayed, and the game ends.*/
  else {
    console.log(`\nWins: ${wins}\nLosses: ${losses}\n`);
    console.log("Thanks for playing!");
  }
}

hangMan();