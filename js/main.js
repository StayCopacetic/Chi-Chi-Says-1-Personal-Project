var $title = $('.gameTitle h1')

var player1 = {
    name: "PLAYER 1",
    score: 0,
    sequence: []
}

var player2 = {
    name: "PLAYER 2",
    score: 0,
    sequence: []
}

var currentPlayer = player1

function switchTurns() {
    if(currentPlayer === player1) {
        currentPlayer = player2
        $title.text("Player 2 get ready...");
        setTimeout(start, 3000);
    } else {
        // compare player1.score and player2.score and announce the winner
        if(player1.score > player2.score) {
            alert("Player 1 win! Your power levels are over 9000.")
        } else if(player2.score > player1.score) {
            alert("Player 2 win! Your power levels are over 9000.")
        } else {
            alert("Tie game!")
        }
    }
}

// var Game=(function(){
    var faces=$("#gameContent .circle");
    var sequence=[];
    var userSequence=[];

 // Click button to start the game.   
    function init(){
      makeColorsClickable();
      $(".btn").on('click',start);
    }

// Targets the msg element, which changes as the game continues.     
    function start(){
      $(".msg1,.msg2").html("&nbsp;");
      sequence=[];
      userSequence=[];
      addNextSequence();
      playSequence();
    }
    
// Function so that you'll be able to click the colors in the correct sequence.    
    function makeColorsClickable(){
      faces.on('click',function(){
        highlight.call($(this));
        userSequence.push($(this).index("#gameContent .circle"));
        checkUserSequence();
      });
    }

// Provides alerts and stores user's score to compare with the other player.    
    function checkUserSequence(){
      if(userSequence.join('')!=sequence.slice(0,userSequence.length).join('')) {
        $(".msg1").html("Game");
        $(".msg2").html("Over");
        switchTurns();
        return false;
      } else if(userSequence.length == sequence.length) { 
        currentPlayer.score++;
        $(".msg1").html(sequence.length)
        addNextSequence();
        userSequence=[];
        setTimeout(playSequence,2000);
        return true;
      }
    }

// Game logic for the various sequences.    
    function addNextSequence(){
      sequence.push(Math.floor(Math.random()*4));
    }

// Highlight the colors and dehighlights as the game continues.     
    function highlight(){
      $(this).addClass('hl .animated flip .circle');
      setTimeout(dehighlight.bind(this),200);
    }

    function dehighlight(){
      $(this)
        .removeClass('hl');
    }
    
    function playSequence(){
      for(var i=0;i<sequence.length;i++) {
        setTimeout(highlight.bind(faces.eq(sequence[i])),i*400);
      }
    }
    // return {
    //   init:init,
    //   start:start};
//   })();
  
init();
// start();