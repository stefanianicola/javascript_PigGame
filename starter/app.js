/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if (gamePlaying) {
        //numero del dado
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //mostrar el dado con el numero correcto
        var diceDom = document.querySelector('.dice');
        var diceDom2 = document.querySelector('.dice2');
        diceDom.style.display = 'block';
        diceDom2.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
        diceDom2.src = 'dice-' + dice2 + '.png';

        //imprimir el puntaje distinto de 1
        if (dice === 6 && lastDice === 6) {
            console.log('perdiste');
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer()
        } else if (dice !== 1 && dice2 !==1) {
            //sumar el valor del dado cada vez que salga
            roundScore += dice + dice2;
            //imprimir el valir de la suma en el current de cada jugador
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            nextPlayer();
        }
        lastDice = dice;
    }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
   
    if (gamePlaying) {
        var puntaje = document.getElementById('puntaje').value;
        
        //guardar el valor current en el global
        scores[activePlayer] += roundScore;

        // mostrarlo en la UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if(puntaje){
            var winningScore = puntaje;
        } else {
            winningScore = 100;
        }


        //determinar quien gana
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            diceNone();
            gamePlaying = false;

        } else {
            //proximo turno
            nextPlayer();
        }
    }
})

function nextPlayer() {
    // si sale uno cambia al jugador siguiente
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //restablece el puntaje a 0
    roundScore = 0;
    document.getElementById('current-0').textContent = roundScore;
    document.getElementById('current-1').textContent = roundScore;

    //cambia la imagen para distinguien que jugador esta jugando
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //se esconde el dado hasta que el jugador correspondiente tire
    diceNone();
}

function diceNone() {
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    diceNone();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
(Hint: Always save the previous dice roll in a separate variable)*/

/*2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined
score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to
use google to figure this out :)*/

/*3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of
them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
















