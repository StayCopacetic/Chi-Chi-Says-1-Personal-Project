var Game=(function(){
    var faces=$("#gameContent .circle");
    var sequence=[];
    var userSequence=[];

 // Click button to start the game.   
    function init(){
      makeFacesClickable();
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
    function makeFacesClickable(){
      faces.on('click',function(){
        highlight.call($(this));
        userSequence.push($(this).index("#gameContent .circle"));
        checkUserSequence();
      });
    }

// When the correct color is clicked the user's score is increased by one and if incorrect, the game is ended.     
    function checkUserSequence(){
      if(userSequence.join('')!=sequence.slice(0,userSequence.length).join('')) {
        $(".msg1").html("GAME");
        $(".msg2").html("OVER");
        alert("Your power levels are too low, Game Over!");
        return false;
      } else if(userSequence.length==sequence.length) {
        $(".msg1").html(sequence.length)
        addNextSequence();
        userSequence=[];
        setTimeout(playSequence,1000);
        return true;
      }
    }

// Game logic for the various sequences.    
    function addNextSequence(){
      sequence.push(Math.floor(Math.random()*4));
    }

// Highlight the colors and dehighlights as the game continues.     
    function highlight(){
      $(this)
        .addClass('hl .animated bounce .circle');
      setTimeout(dehighlight.bind(this),500);
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
    return {
      init:init,
      start:start};
  })();
  
  Game.init();
  Game.start();