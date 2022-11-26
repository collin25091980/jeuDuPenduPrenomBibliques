// Function

function generateRandomWord(wordList) {
   randomWord = wordList[Math.floor(Math.random() * wordList.length)];
   return randomWord;
}

function generateHiddenWord(randomWord) {
   for(let letter of randomWord) {
      hiddenWord.push(letter.replace(/.*/,'_'));
   }
   return hiddenWord;
}

function displayHiddenWord(hiddenWord) {
   hiddenWord = hiddenWord.join('');
   wordToFind.textContent = hiddenWord;
}

function gameOver() {
   if(numberOfLives == 0) {
      result.textContent = "Désolé vous avez perdu le mot était " + randomWord;
      keyboard.style.pointerEvents = "none";
      anwserButton.style.pointerEvents = "none";
      losingGameEffect();
   }
   if(wordToFind.textContent == randomWord) {
      result.textContent = "Bravo vous avez gagné";
      keyboard.style.pointerEvents = "none";
      anwserButton.style.pointerEvents = "none";
      victoryGameEffect()
   }
}

function checkLetter(e) {
      goodLetter = false;
      for(let i = 0; i < hiddenWord.length; i++) {
         if(randomWord[i] === e.target.textContent) {
            hiddenWord[i] = randomWord[i];
            goodLetter = true;
         }
      }
      if(goodLetter) {
         e.target.classList.add('goodLetter');
         e.target.style.pointerEvents = "none";
         goodChoiceEffect();
      }
      else {
         e.target.classList.add('badLetter');
         numberOfLives--;
         // console.log(numberOfLives);
         e.target.style.pointerEvents = "none";
         hangmanImg.style.display = "block";
         hangmanImg.src = "assets/images/pendu-" + numberOfLives + ".png";
         badChoiceEffect();
      }
      displayHiddenWord(hiddenWord);
      result.textContent = "Il vous reste " + numberOfLives + " " + (numberOfLives>1 ? "vies" : "vie") + " pour trouver le mot caché";
      gameOver();
}

function checkWord(e) {
   e.preventDefault();
   // console.log(answerWord.value.toUpperCase());
   if(answerWord.value.toUpperCase() != randomWord) {
      numberOfLives--;
      result.textContent = "Il vous reste " + numberOfLives + " " + (numberOfLives>1 ? "vies" : "vie") + " pour trouver le mot caché";
      hangmanImg.style.display = "block";
      hangmanImg.src = "assets/images/pendu-" + numberOfLives + ".png";
      badChoiceEffect();
   }
   else {
      let findedWord = answerWord.value.toUpperCase();
      // console.log(findedWord);
      wordToFind.textContent = findedWord;
      result.textContent = "Bravo vous avez gagné !";
   }
   answerWord.value = '';
   gameOver();
}

function goodChoiceEffect() {
   let goodChoice = new Audio()
   goodChoice.src = "assets/sounds/goodChoice.mp3";
   goodChoice.play();
}

function badChoiceEffect() {
   let badChoice = new Audio()
   badChoice.src = "assets/sounds/badChoice.mp3";
   badChoice.play();
}

function losingGameEffect() {
   let losingGame = new Audio()
   losingGame.src = "assets/sounds/losingGame.mp3";
   losingGame.play();
}

function victoryGameEffect() {
   let victoryGame = new Audio()
   victoryGame.src = "assets/sounds/victoryGame.mp3";
   victoryGame.play();
}


// Variables

let kbdKeys = document.querySelectorAll('kbd.key');
let keyboard = document.querySelector('.keyboard');
let wordToFind = document.querySelector('#wordToFind');
let numberOfLives = 8;
let hiddenWord = [];
let randomWord;
let result = document.querySelector('.result p');
let hangmanImg = document.querySelector('.hangman img');
hangmanImg.style.display ="none";
let anwserButton = document.querySelector('.answerWithAWord button');
let answerWord = document.querySelector('.answerWithAWord input');




// Excecution

generateRandomWord(wordList);
// console.log(randomWord);
generateHiddenWord(randomWord);
displayHiddenWord(hiddenWord);
for(let kbdKey of kbdKeys) {
   kbdKey.addEventListener('click', checkLetter);
}
anwserButton.addEventListener('click', checkWord);





