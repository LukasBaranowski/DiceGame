/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, dice, gamePlaying = true;



start();

var lastRoll1;
var lastRoll2;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
         //1. A random number
    
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //2. Display result
        document.getElementById('die-1').style.display = 'block';
        document.getElementById('die-2').style.display = 'block';
        document.getElementById('die-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('die-2').src = 'dice-' + dice2 + '.png';
     
        //dice disappear for 3 secs
        window.setTimeout(function(){
        document.getElementById('die-1').style.display = 'none';
        },1000)
        window.setTimeout(function(){
        document.getElementById('die-2').style.display = 'none';
        },1000)
        
        
        
        //3. Update the round score if the roll number is not 1 
        if (dice1 === 1 && dice2 === 1){
            
        //Player looses score
            scores[activePlayer] = 0;
            
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; 
            
            nextPlayer();
        }
        
        else if (dice1 !== 1 && dice2 !== 1) {
        // add score
            roundScore = roundScore + dice1 + dice2;
            document.querySelector('#current-'+ activePlayer).textContent = roundScore;
        } else {
        //next player
        
            nextPlayer();  
        }
        
        //4. Check if thers's double six
        
        lastRoll1 = dice1
        lastRoll2 = dice2
        
    }
   
    
    
        
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if (gamePlaying) {
        
        //add the currnt score to the global score
        scores[activePlayer] += roundScore;
    
    
    
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; 
    
    
        //Change winning score
        var input = document.querySelector('.winning-score').value;
        //Undefined, Null, Nan, "" are coerced false
        
        if (input){
            var winScore =input;
        } else {
            winScore = 100;
        }
   
        //check if player won the game
    
    
        if (scores[activePlayer] >= winScore){
            document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';
        
            
            document.getElementById('die-1').style.display = 'none';
            document.getElementById('die-2').style.display = 'none';
            document.querySelector('.player-' +activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' +activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else{
            //change the player after clicking hold
            nextPlayer();
        }
        
    }
    
 
    
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    
    
    /* it is the same meaning as below and it's called turnery operator
        if (activePlayer === 0){
            activePlayer === 1;
        }   else {
            activePlayer === 0;
        }
        */
    roundScore = 0;
    
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
        
    document.querySelector('.player-0-panel').classList.toggle('active');
        
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    document.querySelector('.dice').style.display = 'dice-1';
    
    
    //document.querySelector('.player-0-panel').classList.remove('active');
        
    //document.querySelector('.player-1-panel').classList.add('active');
    
}
  

document.querySelector('.btn-new').addEventListener('click', start);

gamePlaying = true;

function start(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('die-1').style.display = 'none';
    document.getElementById('die-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying = true;
}





























