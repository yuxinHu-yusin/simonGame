var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var index = 0;
var start = false;
var level = 0;
var end = false;

var languageCheck = "en";
var title = "Press START Key to Start";

// event.key: etermine which key was pressed during a keyboard event.
$(".start").on("click", function(){
      var a = new Audio("./sounds/startGame.mp3");
      a.play();
     
      if(start == false){
        setTimeout(function(){
          nextSequence();
        }, 1200);
        start = true;
        end = false;

      }

});

$(".restart").on("click", function(){
  var reSound = new Audio("./sounds/startGame.mp3");
  reSound.play();
  resetGame();
});


$(".btn").on("click", function(){
  var userChosenColour = this.id;
  animatePress(this.id);
  playSound(this.id);

  if(start == false){
    $("#level-title").fadeIn(100).fadeOut(100).fadeIn(100);
  }

  if(end === false && start == true){
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  }

});


// add the sound to the buttons
function playSound(name){
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// push the new random color into the gamePattern
function nextSequence(){
  // update the title
  $("#level-title").text("Level " + level);

  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("gamePattern: " + gamePattern);

  // use jQuery to select the specific button with the same color and add animate
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  userClickedPattern = [];
  level ++;
}

function animatePress(buttonID){
  $("#" + buttonID).addClass("pressed");
  //  use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function(){
            $("#" + buttonID).removeClass("pressed");
  },100);

}

function resetGame(){
  gamePattern = [];
  userClickedPattern = [];
  start = false;
  level = 0;
  index = 0;
  $("#level-title").text(title);
  
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);}
    }else{
      console.log("wrong");
      $("#level-title").text("GAME OVER");
      $("body").addClass("game-over");
      playSound("wrong");
      setTimeout(function(){
        $("body").removeClass("game-over");
        resetGame();
      }, 2200);
      end = true;
    }

}

// the lanuage selector
function changeLanguage(language){
  switch(language){
    case "en":
      $("#level-title").text("Press START to Start").addClass("eng");
      $("#start").text("START").addClass("eng");
      $("#reStart").text("RESTART").addClass("eng");
      title = "Press START to Start";
      break;

    case "zh":
      $("#level-title").text("点 开始 进行游戏").addClass("chinese");
      $("#start").text("开始").addClass("chinese");
      $("#reStart").text("重新开始").addClass("chinese");
      languageCheck = "zh";
      title = "点 开始 进行游戏";
      break;

    default:
      $("#level-title").text("Press START to Start");
      break;

  }

}

$("#language-select").change(function(){
  const selectedLanguage = $(this).val();
  changeLanguage(selectedLanguage);
});