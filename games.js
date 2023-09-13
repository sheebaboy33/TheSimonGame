var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []; // Keeps track of the random patterns of the game
var userClickedPattern = []; // Keeps track of the user entered patterns
var hasStarted = false;
var level = 0;


$(document).on("keydown", () => {
    // Keeps track of the keypresses to start the game
    if (!hasStarted) {
        hasStarted = true;
        nextSequence();
    }
})

// Listens to user clicked buttons
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {
    // User pattern will be refreshed
    userClickedPattern = [];
    level++;
    // Updating the level count each time the function is called
    $("#level-title").html("Level " + level); 
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Adding a flash animation
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}
    

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }



function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");  

        if (userClickedPattern.length == gamePattern.length) {
            // In 1000 miliseconds user will move on to the next level
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart.");

        startOver();
    }
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    // Removes the pressed class after 100 miliseconds
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}


// Restarts the game when user gets it wrong
function startOver() {
    level = 0;
    gamePattern = [];
    hasStarted = false;
}