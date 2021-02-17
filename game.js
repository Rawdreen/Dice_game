var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var userChosenColour;
var level = 0;
var levelStarted = false;

var iterator = 0;

function nextSequence() {
  var min = 0;
  var max = 3;
  var r = (Math.random() * 100) % 4;
  var randomNumber = Math.floor(r);

  randomChosenColour = buttonColours[randomNumber];
  setTimeout(function () {
    $(`#${randomChosenColour}`)
      .animate({ opacity: 0 }, 200)
      .animate({ opacity: 1 }, 200);
    playSound(randomChosenColour);

    gamePattern.push(randomChosenColour);

    level++;
    $("h1").text("level: " + level);
  }, 1000);
}

function checkAnswer(currentLevel) {
  for (i = 0; i <= currentLevel; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
      $("h1").text("Kirib ketdi");
      return;
    } else {
      $("h1").text("level: " + level);
    }

    console.log("game pattern after:" + gamePattern);
    console.log("user pattern after:" + userClickedPattern);
  }
  userClickedPattern = [];
  console.log("game pattern after release:" + gamePattern);
  console.log("user pattern after release:" + userClickedPattern);
  nextSequence();
}

$(".items").click(function () {
  if (levelStarted) {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    console.log("game pattern before:" + gamePattern);
    console.log("user pattern before:" + userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    if (userChosenColour != gamePattern[iterator]) {
      iterator = 0;
      $("h1").html("You suck!<br>press any key");
      levelStarted = false;
      level = 0;
      $("body").addClass("lost");
      setTimeout(function () {
        $("body").removeClass("lost");
      }, 1000);
    } else if (iterator == gamePattern.length - 1) {
      nextSequence();
      iterator = 0;
    } else {
      iterator++;
    }

    // if (userClickedPattern.length == gamePattern.length) {
    //   checkAnswer(level);
    // }
  }
});

function playSound(name) {
  var sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
}

function animatePress(name) {
  $(`#${name}`).addClass("pressed");

  setTimeout(function () {
    $(`#${name}`).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  if (level < 1) {
    nextSequence();
    levelStarted = true;
  }
});
