const startButton = document.querySelector("a");
const screenOverlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');

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



 const checkLetter = function (keyboard) {
  const classletter = document.getElementsByClassName('letter');

  for (let i = 0; i < classletter.length; i++) {
  let listItem = classletter[i];
  let listLetter = listItem.textContent;
  let keyboardButton = keyboard.textContent;


  if (listLetter === keyboardButton) {
  listItem.classList.add("show");
  var letterFound = listLetter;
  }
 }
 if (letterFound) {
   return letterFound;
 }else {
   missed +=1
   return null;
 }
};




qwerty.addEventListener("click", (e) => {
  e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      function targetButton() {
          let buttonLetters = e.target;
          buttonLetters.setAttribute("disabled", " ");
          buttonLetters.classList.add("chosen");
          return buttonLetters;
      }
      let returnLetter = checkLetter(targetButton());
      console.log(returnLetter);
    }
});
