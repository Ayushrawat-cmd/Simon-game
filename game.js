var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var started = false;
var level = 0;
$(".btn").click(function () { 
    var userChosenColour = $(this).attr("id");;  
    userClickedPattern.push(userChosenColour);
    var n = userClickedPattern.length -1;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(n);
});

function nextSequence(){
    level++;
    var randomNumber = Math.random();
    randomNumber = randomNumber*4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        
        if(userClickedPattern.length-1===gamePattern.length-1){
            userClickedPattern = [];
            setTimeout( function ()  {
            $("h1").text("Level "+level);
            nextSequence();   
            }, 1000);  
        
        }
        
        
           
    }
    else{
        $("h1").text("Game over, Press any key to restart");

        $("body").addClass("game-over");
        setTimeout( function () {
            $("body").removeClass("game-over");
        }, 200);
        
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        gamePattern = [];
        userClickedPattern = [];
        started = false;
        level = 0;

    }

}
document.addEventListener("keypress",function(){
    if(!started){
    $("h1").text("Level "+level);    
    nextSequence();
    started=true;
    }
});
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){ 
        $("#"+currentColour).removeClass("pressed"); 
    }, 100);
}