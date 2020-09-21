//challenge 1: age in days
function ageInDays() {
  var birthYear = prompt("what year were you born");
  var ageInDayss = (2020 - birthYear) * 365;
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode("you are " + ageInDayss + " days");
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}
function reset() {
  document.getElementById("ageInDays").remove();
}
//challenge 2: cat generator
function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src =
    "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
}
//challenge 3: rock, paper, scissors
function rpsGame(yourChoice) {
  console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  console.log(botChoice);
  results = decideWinner(humanChoice, botChoice);
  console.log(results);
  message = finalMessage(results);
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}
function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}
function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}
function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };
  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];
  return [yourScore, computerScore];
}
function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "you lost", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "you tied", color: "yellow" };
  } else {
    return { message: "you won", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();
  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");
  humanDiv.innerHTML =
    "<img src=" +
    imagesDatabase[humanImageChoice] +
    " height=150 width=150 style='  box-shadow: 0px 10px 50px rgba(37,50,233,1)'>";
  botDiv.innerHTML =
    "<img src='" +
    imagesDatabase[botImageChoice] +
    "' height=150 width=150 style='  box-shadow: 0px 10px 50px rgba(243,38,24,1)'>";
  messageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage["color"] +
    ";font-size:60px;padding:30px; '>" +
    finalMessage["message"] +
    "</h1>";
  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
}
//challenge 4: change color of the buttons
var all_buttons = document.getElementsByTagName("button");
console.log(all_buttons);
var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);
function buttonColorChange(buttonThingy) {
  console.log(buttonThingy.value);
  if (buttonThingy.value === "red") {
    buttonsRed();
  } else if (buttonThingy.value === "green") {
    buttonsGreen();
  } else if (buttonThingy.value === "reset") {
    buttonColorReset();
  } else if (buttonThingy.value === "random") {
    randomColors();
  }
}
function buttonsRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}
function buttonsGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}
function buttonColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}
function randomColors() {
  var choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];
  for (let i = 0; i < all_buttons.length; i++) {
    var randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}
//challenge 5: black jack
let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    J: 10,
    Q: 10,
    A: [1, 11],
  },
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];
console.log(YOU["div"]);

const hitSound = new Audio("sounds/swish.m4a");
const winSound = new Audio("sounds/cash.mp3");
const lossSound = new Audio("sounds/aww.mp3");
document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);
function blackjackHit() {
  let card = randomCard();
  showCard(YOU, card);
  updateScore(card, YOU);
  showScore(YOU);
  console.log(card);
  console.log(YOU["score"]);
}

function randomCard() {
  let randomNumber = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomNumber];
}

function showCard(activePlayer, card) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

function blackjackDeal() {
 showResult(computeWinner());
  let yourImages = document.querySelector("#your-box").querySelectorAll("img");
  let dealerImages = document
    .querySelector("#dealer-box")
    .querySelectorAll("img");

  console.log(yourImages);
  for (let i = 0; i < yourImages.length; i++) {
    yourImages[i].remove();
  }
  for (let i = 0; i < dealerImages.length; i++) {
    dealerImages[i].remove();
  }
  YOU['score'] = 0;
  DEALER['score'] = 0;
  document.querySelector('#your-blackjack-result').textContent = 0
  document.querySelector('#your-blackjack-result').style.color ='white';
  document.querySelector('#dealer-blackjack-result').textContent = 0
  document.querySelector('#dealer-blackjack-result').style.color ='white';
  
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if ((activePlayer["score"] += blackjackGame["cardsMap"][card][1] <= 21)) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

function dealerLogic(){
  let card = randomCard();
  showCard(DEALER,card);
  updateScore(card,DEALER);
  showScore(DEALER);
  //if(DEALER['score'] > 15){
    //let winner = computeWinner();
    //showResult(winner);
  //}
  //showResult(winner);
}
//compute winner and return who just won
function computeWinner(){
  let winner;
  if(YOU['score'] <=21){
    //condition : higher score than dealer or when dealer busts
    if(YOU['score'] > DEALER['score'] || (DEALER['score']>21)){
      console.log('you won');
      winner = YOU;
    }else if (YOU['score'] < DEALER['score']){
      console.log('you lost');
      winner=DEALER;
    }else if(YOU['score'] === DEALER['score']){
      console.log('you drew');
    }
    //condition :when user busts but dealer doesnt 
  }else if(YOU['score'] > 21 && DEALER['score'] <=21){
    console.log('you lost');
    winner = DEALER;
  
  //conditon when you and dealer busts
  }else if(YOU['score'] > 21 && DEALER['score'] > 21){
    console.log('you drew');
  }
  console.log('winner is ',winner);
  return winner;
}

function showResult(winner){
  let message,messageColor;
  if(winner === YOU){
    message = 'you won';
    messageColor = 'green';
    winSound.play();
  }else if(winner === DEALER){
    message = 'you lost';
    messageColor = 'red';
    lossSound.play();
  }else{
    message = 'you drew';
    messageColor = 'black';
  }
  document.querySelector('#blackjack-result').textContent = message;
  document.querySelector('#blackjack-result').style.color = messageColor;
  
}



















