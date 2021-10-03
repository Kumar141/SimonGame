const buttonColors = ["red", "green", "blue", "yellow"];
var playerPattern = [];
var computerPattern = [];
var level = 1;
var gameStarted = false;

$(document).keypress(() => {
    if (!gameStarted) {
        computerTurn();
        gameStarted = true;
    }
});

const computerTurn = () => {
    playerPattern = [];
    $("h1").text("Level " + level);
    level += 1;
    let comChoice = buttonColors[Math.floor(Math.random() * 4)];
    computerPattern.push(comChoice);
    // console.log("before comp ", computerPattern);
    playAudio(comChoice);
    $("#" + comChoice)
      .fadeOut(100)
      .fadeIn(100);
}

$("button").click((event) => {
    let userChoice = event.target.id;
    playerPattern.push(userChoice);
    let len = playerPattern.length - 1;
    console.log("player len ", len);
    playAudio(userChoice);
    animateIt(userChoice);
    checkTheClick(len);
});

const animateIt = (userChoice) => {
    $("#" + userChoice).addClass("pressed");
    setTimeout(() => {
      $("#" + userChoice).removeClass("pressed");
    }, 100);
 }


function checkTheClick (index) {
    console.log("player ", playerPattern[index] + " array: " + playerPattern + " len: " + playerPattern.length);
    console.log("comp ", computerPattern[index] + " array: " + computerPattern + " len: " + computerPattern.length);
    if (playerPattern[index] == computerPattern[index]) {
      if (playerPattern.length === computerPattern.length) {
        setTimeout(function () {
          computerTurn();
        }, 1000);
      }
    } else {
      gameOver();
    }
}

const gameOver = () => {
    $("body").addClass("game-over");
    $("h1").text("Game Over! Press Any Key to Restart");
    playAudio("wrong");
    setTimeout(() => $("body").removeClass("game-over"), 500);
    gameStarted = false;
    level = 1;
    computerPattern = [];
    playerPattern = [];
}


const playAudio = (sound) => {
    let audioFile = "sounds/" + sound + ".mp3";
    new Audio(audioFile).play();
} 


