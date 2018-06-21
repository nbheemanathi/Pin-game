/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gameplaying, maxscore;

var diceImg = document.querySelector('.dice');
var dice1Img = document.querySelector('.dice1');
var imgPath = './assets/images/';

onInit();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gameplaying){
        var dice = Math.floor(Math.random() * 6) + 1;  
        var dice1 = Math.floor(Math.random() * 6) + 1;    
        diceImg.style.display = 'block';
        diceImg.src = imgPath +'dice-' + dice + '.png';

        dice1Img.style.display = 'block';
        dice1Img.src = imgPath +'dice-' + dice1 + '.png';
        
        var dicescore = dice + dice1;
    
        document.querySelector('#current-' + activePlayer).textContent = dicescore;
    
        if(dice !== 1){
            roundScores += dicescore;        
            document.querySelector('#current-'+ activePlayer).textContent = roundScores;  
        }
        else {
            nextplayer();
        }    
    }    
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gameplaying) {
        //add current score to global score
        scores[activePlayer] += roundScores;
        maxscore = document.getElementById('maxScore').value;
        if(!maxscore){
            maxscore = 100;
        }    
        //update ui with score
        // switch active player & chceck player won the game    
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= maxscore) {
            document.querySelector('#name-' + activePlayer).textContent = 'winner!';
            diceImg.style.display = 'none';
            dice1Img.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameplaying = false;
        }
        else {
            nextplayer();
        }

    }
    
});

document.querySelector('.btn-new').addEventListener('click', onInit);

function nextplayer(){    

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;

    // if(activePlayer ===1){
    //     document.querySelector('.player-0-panel').classList.remove('active');
    //     document.querySelector('.player-1-panel').classList.add('active');
    // }
    // else {
    //     document.querySelector('.player-1-panel').classList.remove('active');
    //     document.querySelector('.player-0-panel').classList.add('active');
    // }

    //toggle
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceImg.style.display = 'none';
    dice1Img.style.display = 'none';
}
 
function onInit(){
    scores = [0,0];
    activePlayer = 0;
    roundScores = 0;
    gameplaying = true;
    diceImg.style.display = 'none';
    dice1Img.style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');    
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    maxscore = 0;
    document.getElementById('maxScore').value = '';

    
}





























