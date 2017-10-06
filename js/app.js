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

let missed = 0;



startButton.addEventListener("click", () => {
  screenOverlay.style.display = 'none';
});


const phrases =[
'a picture is worth a thousand words',
'a piece of cake',
'a good neighbor a found treasure',
'a penny saved is a penny earned',
'age is just a number'
];


function getRandomPhraseArray(arr){
    let newArray = arr[Math.floor(Math.random() * arr.length)];
    let splitArray = newArray.split('');
    return splitArray;
}


function addPhraseToDisplay(arr){
  for (var i = 0; i < arr.length; i++) {
    const characterArray = arr[i];
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.textContent = characterArray;
    ul.appendChild(li);
    if (characterArray !== " ") {
      li.classList.add("letter");
    } else {
      li.classList.add();
    }
  }
}

const phraseArray = getRandomPhraseArray(phrases);
addPhraseToDisplay(phraseArray);





qwerty.addEventListener("click", (e) => {
  e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      function targetButton() {
          let buttonLetters = e.target;
          buttonLetters.setAttribute("disabled", " ");
          buttonLetters.classList.add("chosen");
          return buttonLetters;
      }
      const checkLetter = function (keyboard) {
       const classletter = document.getElementsByClassName('letter');
       let keyboardButton = keyboard.textContent;
       for (let i = 0; i < classletter.length; i++) {
       let listItem = classletter[i];
       let listLetter = listItem.textContent;



       if (listLetter === keyboardButton) {
       listItem.classList.add("show");
       var letterFound = listLetter;
       }
      }
      if (letterFound) {
        return letterFound;
      }else {
        return null;
      }
     };
      let returnLetter = checkLetter(targetButton());
      if (returnLetter === null) {
         missed++;
      }


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


    function checkWin () {
      const showClass = document.getElementsByClassName("show");
      const letterClass = document.getElementsByClassName("letter")
      let showLetterNum = showClass.length;
      let letterClassNum = letterClass.length;
       if (showLetterNum === letterClassNum) {
           winScreen.style.display = 'inherit';
           title.style.opacity= 0;
       }

       if (missed >= 5) {
         loseScreen.style.display= 'inherit';
         title.style.opacity= 0;
         sadEmoji.style.opacity= 1;
       }

    }
    checkWin ();
});
