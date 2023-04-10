# Hangman Terminal Game - MidTerm Project - AlbanyCanCode - JSFunSpring2023
Hi, I'm Erdem Zengin

This is my first project at Albany Can Code.

In order to complete this project, I had to do long hours of research and method development. Compiling the answers to questions such as how to design a game, what steps are required, what functions should be written, when they should be called and so on... This was the most difficult part of the project. This is my very first javaScript project after all :)

In this readme file I will try to explain every part of this process and what my code does. I like reading perfectly explained codes and I tried my best to explain everything whats going on in the code.

More updates and details are coming to this file soon...

## Purpose Of The Project

The aim of the project is to code a very simple text-based hangman game that can be played in the terminal using only JavaScript.

## What do do first?

In order to program our game, first thing we need to know is what our program will do? What are the steps of the game and how to structure this game?
So we need to think and create a list of things to do.

1. We need to pick a random word from our word-bank
2. Take the player's guess
3. Quit the game if the player wants to
4. Check that if the player's guess is a valid letter
5. Keep track of players stats (guessed letters, wins, losses)
6. Show the player their progress
7. Finish the game when the player has guessed the word
8. Ask the player if wants to play again

All of this steps need to happen more than once so we need a loop to run the game. But how to know what to code now? First, we need to write a draft code. It is called *pseudocode*.

## Pseudocode

We can think of this as a designer's draft sketch. For this project I started with something like this:

```javascript
import prompt from "readline-sync";
import wordBank from "./word-bank.js";
Pick a random word from wordBank
Set the guess limit to 6
While the word has not been guessed and player still have guesses {
  Show the player their current progress
  Show the player their remaining guesses
  Get a guess from the player

If the player wants to quit the game {
  Quit the game
} Else if the guess is not a single letter {
  Tell the player to pick a single letter
} Else {
If the guesses letter is in the word{
  update the player's progress with the guess
    }
  }
}
Congratulate the player on guessing the word
```
While the word has not been guessed, this loop needs to keep looping until the player either quits the game or wins the game or loses the game. So we need to keep tracking answers of these questions in every loop to know where to break the loop. In other words the whole game needs to run in this loop.

Understanding this logic is a huge step for going forward.

## Starting To Code

### Picking a random word from word-bank.js

Before start breaking down every step of the code there is something we need to keep in mind during this process. Our code needs to be nice and clean as possible. One thing we learned is that combining pre-made functions and calling them back is the best way to clean coding.

Remember; The whole game will run in a loop. This loop will start itself if the player wants to play again. So we need to approach everything we code as reusable assets. We need to prepare templates for each task.

For the first task, we need to code this function below:
```javascript
function getRandomWord() {
  return wordBank[Math.floor(Math.random() * wordBank.length)];
}
```
#### What's going on in `getRandomWord()` function?

The `getRandomWord()` function generates a random index within the range of the wordBank array, accesses the word at that index, and returns it as the result. This function is used to pick a random word in the games loop.

##### Breaking down the `getRandomWord()` for deeper understanding

1. What `Math.random()` does?
> `Math.random()` generates a random decimal number between 0 and 1.
> The result will be a number like 0.46 or 0.89.
2. What `Math.random() * wordBank.length` does?
> Multiplies the random decimal number by the length of wordBank.
> This scales the random number to the range between 0 and the length of wordBank.
> For example, if wordBank has 10 words, the result will be a number like 4.6 or 8.9
3. What `Math.floor()` does?
> Takes the result from step 2 and rounds it down to the nearest whole number (integer).
> In our example, the numbers 4.6 and 8.9 would become 4 and 8.
> This gives us a valid index to access an item in the wordBank array.`
4. We do this inside the wordBank[array] and as a result this returns a random index number of the array.
 > We can visualize the result like this: wordBank[2]

 Now we can create a variable inside the loop and call this function to equal it to a random word like this:

 ```javascript
 const word = getRandomWord();
 ```
 Now it's time to use our first template inside the main function which the game will run.

 ```javascript
 function hangMan(){
  const word = getRandomWord();
 }
 ```
Current status of the game is like this:
```javascript
import prompt from "readline-sync";
import wordBank from "./word-bank.js";
function getRandomWord() {
  return wordBank[Math.floor(Math.random() * wordBank.length)];
}
function hangMan(){
  const word = getRandomWord();
 }
```
### Turning our random words letters into underscores '_'

Now we need to hide the letters of our chosen word and show underscores instead of actual letters. We need to overwrite every letter with _

For this we can do something like this
```javascript
const progress = Array(word.length).fill('_');
```
##### How this code works?

1. Array(word.length):
> This creates a new array with a length equal to the length of the variable word.
> If word is "hello", the array will have a length of 5.
2. fill() Method:
> This method fills the entire array created in the previous step with the specified value,
> which is an underscore '_' in this case. The result is an array with the same length as word,
> but all elements are underscores.
3. `const progress = Array(word.length).fill('_');`:
> This whole line of code makes the `progress` variable as an array with the same length as word,
> filled with underscores. This array represents the player's progress in the game,
> showing which letters have been guessed correctly and which are still unknown.

For example if our word is "hello", the `progress` array would be like this:
```javascript
["_", "_", "_", "_", "_"]
```
Later in the game when the player guesses are correct, we will change them with the correct letters like this:

```javascript
["h", "_", "l", "_", "o"]
```
Now each time our game starts, our `hangMan()` function will set a random word and change the letters into underscores:

Current status of the game is like this:
```javascript
import prompt from "readline-sync";
import wordBank from "./word-bank.js";
function getRandomWord() {
  return wordBank[Math.floor(Math.random() * wordBank.length)];
}
function hangMan(){
  const word = getRandomWord();
  const progress = Array(word.length).fill('_');
 }
```

It is time to create our loop. This loop needs to run over and over until;
1. Player is successfuly guessed all the letters
and
2. Player still have guess points.

Lets add guess limit before starting the loop so we can make subtractions later

```javascript
let guesses = 6;
//now player will have 6 lives
```
Current status of the game is like this:
```javascript
import prompt from "readline-sync";
import wordBank from "./word-bank.js";
function getRandomWord() {
  return wordBank[Math.floor(Math.random() * wordBank.length)];
}
function hangMan(){
  const word = getRandomWord();
  const progress = Array(word.length).fill('_');
  let guesses = 6;
 }
```
### Creating the game loop

How do we now what kind of loop we need to use? We can go deep in this topic but I will summarize what I've learned from the web:
1. for loop:
> is used when you know the exact number of iterations required. It consists of three parts: the initialization, the condition, and the increment/> decrement.
```javascript
for (let i = 0; i < count; i++) {
  // Code to execute
}
```
2. while loop:
> is used when you don't know the number of iterations in advance but have a condition that must be met.
```javascript
let i = 0;
while (i < count) {
  // Code to execute
  i++;
}
```
3. do...while loop:
> is similar to a while loop but executes a code block at least once, even if the condition is false from the beginning.
```javascript
let i = 0;
do {
  // Code to execute
  i++;
} while (i < count);
```
4. for...in loop:
> is used to iterate over the properties of an object. This is not recommended for iterating over arrays.
```javascript
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    // Code to execute using obj[key]
  }
}
```
5. for...of loop:
> is used to iterate over iterable objects, such as arrays, strings, or sets.
```javascript
const array = [1, 2, 3];
for (const value of array) {
  // Code to execute using value
}
```

Since we don't know how many times we need to run our codes (the word might be 12 letters or 3 letters long, and also we don't know how many times the player will make a wrong guess etc.) we need to go with `while` loop.

Now we are gonna tell the program "While the word has not been guessed, and player still have guesses, do this"

For the condition part "has not been guessed" we need a function that compares the user progress and the word to see if they are equal.

```javascript
function hasWordBeenGuessed(word, progress) {
  return word === progress.join('');
}
```
##### How this `hasWordBeenGuessed()` function works?

As we can remember we separated our chosen word into array of letters before to show them as underscores. Later in the game we need to display this underscores with the spaces between like "_ _ _ _" to make them visualy countable. So here `progress.join('');` we are joinin the array and then we check if they are equal or not.

So `hasWordBeenGuessed()` function checks if the player has guessed the entire chosen word by comparing the original word with the joined version of the player's progress array. If the two strings are equal, the function returns `true`, indicating that the word has been guessed; otherwise, it returns `false`.

Now we can use our callback function in our condition:
```javascript
while (!hasWordBeenGuessed(word, progress) && guesses > 0){}
```
##### How this condition works?

1. `!hasWordBeenGuessed(word, progress)`:
> This part of the condition checks if the player has not yet guessed the word correctly.
> The ! symbol negates the result of the hasWordBeenGuessed function.
> If hasWordBeenGuessed returns true (meaning the word has been guessed), the ! symbol changes it to false, causing the loop to exit.
2. `guesses > 0`:
> This part of the condition checks if the player still has guesses remaining. As long as the guesses variable is greater than 0, this condition is true, and the
> loop will continue.
3. `&&`:
> This logical operator, called "AND", connects the two conditions. Both conditions must be true for the entire expression to be true.
> If either of the conditions is false, the loop will exit.

So far our game looks like this:
```javascript
import prompt from "readline-sync";
import wordBank from "./word-bank.js";
function getRandomWord() {
  return wordBank[Math.floor(Math.random() * wordBank.length)];
}
function hasWordBeenGuessed(word, progress) {
  return word === progress.join('');
}
function hangMan(){
  const word = getRandomWord();
  const progress = Array(word.length).fill('_');
  let guesses = 6;
  while (!hasWordBeenGuessed(word, progress) && guesses > 0) {
    
  }
 }
```