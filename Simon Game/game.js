// Array list of the colours we want the JS functions to register
const buttonColours = ["red", "blue", "green", "yellow"]; 

// Store the pattern of the colours
const gamePattern = [];
// Store the colours the user clicked
let userClickedPattern = [];

// enable if statement
let started = false;
// Originally starting level after key press
let level = 0;

// event listener for key press where we can press any key to start the game
$(document).keypress(function() {
    if(!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
});
// event listener for click where we can store information from the user clicking on a coloured box
$(".btn").click(function() {
    const userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // Identify current level - 1 due to the value will go up by one every time, so to get the value user clicked must - 1
    checkAnswer(userClickedPattern.length - 1);
})
// function to check if the user pattern matches game pattern, if not its wrong and resets
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver()
    }
}
// Reset function
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
// we generate a random number so it selects a random colour to flash each level, also every correct level it will increment to the next
function nextSequence() {
    userClickedPattern = [];
    level++;
    let randomNumber = Math.floor((Math.random() * 4));
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    const audio = new Audio('sounds/' + randomChosenColour + '.mp3');
    audio.play();
}
// function to play sound
function playSound(name) {
    const audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}
// functiono to add animation
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


    

