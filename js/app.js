const startButton = document.querySelector(".btn__reset");
const screenOverlay = document.getElementById('overlay');
const loseScreen = document.getElementById('overlayLose');
const winScreen = document.getElementById('overlayWin');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const triesHeart = document.getElementsByClassName("tries");
const title = document.querySelector(".title");
const winner = document.querySelector(".winner");
const loser = document.querySelector(".lostDude");
const sadEmoji = document.querySelector(".sadEmoji");
const mainDiv = document.querySelector(".main-container");

let missed = 0;



startButton.addEventListener("click", () => {
  screenOverlay.style.display = 'none';
});



// This fucntion sets everything to zero
mainDiv.addEventListener('click', (e) => {
  if (e.target.textContent === "Play Again") {
    const li = document.querySelectorAll(".section ul li");
// Loops through li item and removes it.
    for (var i = 0; i < li.length; i++) {
        const list = li[i];
        const ul = list.parentNode;
        ul.removeChild(list);
    }


// Removes the class "chosen" and "disabled" attribute.
    const chosen = document.querySelectorAll(".chosen");
    for (var i = 0; i < chosen.length; i++) {
      const chosenClass = chosen[i];
      chosenClass.removeAttribute("disabled");
      chosenClass.classList.remove("chosen");
    }

// Returns all tries
    for (var i = 0; i < triesHeart.length; i++) {
      const tries = triesHeart[i];
      tries.removeAttribute("style");
    }

// Returns phrases randomly
    addPhraseToDisplay(phraseArray);
    loseScreen.style.display = 'none';
    winScreen.style.display = 'none';
  }
});



//Phrases array that contains at least 5 different phrases as strings
const phrases =[
'a picture is worth a thousand words',
'a piece of cake',
'a good neighbor a found treasure',
'a penny saved is a penny earned',
'age is just a number'
];

// This function randomly chooses a phrase from the phrases array and split that phrase into a new array of characters
function getRandomPhraseArray(arr){
    let newArray = arr[Math.floor(Math.random() * arr.length)];
    let splitArray = newArray.split('');
    return splitArray;
}


// addPhraseToDisplay function takes any array of letters and add it to the display.
function addPhraseToDisplay(arr){
  for (var i = 0; i < arr.length; i++) {
    const characterArray = arr[i];
    const ul = document.querySelector('.section ul');
    const li = document.createElement('li');
    li.textContent = characterArray.toUpperCase();
    ul.appendChild(li);
    if (characterArray !== " ") {
      li.classList.add("letter");
    } else {
      li.classList.add();
    }
  }
}

//To use the function, I get the value returned by the getRandomPhrasesArray,
// save it to a variable, and pass it to addPhraseToDisplay as an argument:
const phraseArray = getRandomPhraseArray(phrases);
addPhraseToDisplay(phraseArray);





qwerty.addEventListener("click", (e) => {
  e.preventDefault();
    if (e.target.tagName === 'BUTTON') {

  //This function return button the player has clicked
      function targetButton() {
          let buttonLetters = e.target;
//The function sets “disabled” attribute so will not respond to user clicks.
          buttonLetters.setAttribute("disabled", " ");
//When a player chooses a letter, the function adds “chosen” class to that button so the same letter can’t be chosen twice.
          buttonLetters.classList.add("chosen");
          return buttonLetters;
      }



  //This function gets all of the elements with a class of “letter”, and loops over the letters
  // and check if they match the letter in the button the player has chosen.
      const checkLetter = function (keyboard) {
       const classletter = document.getElementsByClassName('letter');
       let keyboardButton = keyboard.textContent;
       for (let i = 0; i < classletter.length; i++) {
       let listItem = classletter[i];
       let listLetter = listItem.textContent;


//If there’s a match, the function should add the “show” class to the list item
       if (listLetter === keyboardButton) {
       listItem.classList.add("show");
//Store the matching letter inside of a variable.
       var letterFound = listLetter;
       }
      }


      if (letterFound) {
// If match the function returns that letter.
        return letterFound;
      }else {
//If a match wasn’t found, the function should return null.
        return null;
      }
     };
// Storing checkLetter variable inside returnLetter variable
      let returnLetter = checkLetter(targetButton());
// If the player has guessed the wrong letter. The missed variable increases count by 1.
      if (returnLetter === null) {
         missed++;
      }

// This statement checks if the value of the letterFound variable.
//If the value is null, will remove one of the tries from the scoreboard.
      if (missed === 1) {
        triesHeart[0].style.display = 'none';
      }else if (missed === 2) {
        triesHeart[1].style.display = 'none';
      }else if (missed === 3) {
        triesHeart[2].style.display = 'none';
      } else if (missed === 4) {
        triesHeart[3].style.display = 'none';
      }else if (missed === 5) {
        triesHeart[4].style.display = 'none';
      }
    }


// This function checks whether the game has been won or lost.
    function checkWin () {
      const showClass = document.getElementsByClassName("show");
      const letterClass = document.getElementsByClassName("letter");
      let showLetterNum = showClass.length;
      let letterClassNum = letterClass.length;
//If the number of letters with class “show” is equal to the number of letters with class “letters”.
// Shows the overlay screen with the “win” class.
       if (showLetterNum === letterClassNum) {
           winScreen.style.display = 'inherit';
           title.style.opacity= 0;
       }
//if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class.
       if (missed >= 5) {
         loseScreen.style.display= 'inherit';
         title.style.opacity= 0;
         missed = 0;

       }
    }
    checkWin ();
});
