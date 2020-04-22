const battleEvents = document.getElementById('battle-events');
const sonicStatus = document.getElementById('sonic-status');
const motobugStatus = document.getElementById('motobug-status');
const victoryMessage = document.getElementById('victory-message');
const defeatMessage = document.getElementById('defeat-message');
let newButton = new Array;
let turnCounter = 0;

class Move {
    constructor(name, power, accuracy) {
        this.name = name;
        this.power = power;
        this.accuracy = accuracy;
    }
}

class Character {
    constructor(name, hp, moves) {
        this.name = name;
        this.hp = hp;
        this.currentHp = hp;
        this.moves = moves;
    }
}

class TurnHeader {
    constructor(turnNumber) {
        this.element = document.createElement('h2');
        this.element.innerHTML = 'Turn ' + turnNumber;
    }
}

const sonicMoves = new Array();
sonicMoves[0] = new Move("Kick", 70, .8);
sonicMoves[1] = new Move("Spin Attack", 50, 1);
sonicMoves[2] = new Move("Idle", 0, 1);
const poke = new Move("Poke", 60, 1);

let sonic = new Character("Sonic", 100, sonicMoves);
let motobug = new Character("Motobug", 80, [poke]);

function attack(chosenMove, target) {
    turnCounter++;
    battleEvents.appendChild(new TurnHeader(turnCounter).element);
    if (target.currentHp - chosenMove.power <= 0) {
        target.currentHp = 0;
        victoryMessage.style.display = 'block';
        endGame();
    } else {
        target.currentHp -= chosenMove.power;
        counterAttack(target);
    }
    let attackRecord = document.createElement('p');
    attackRecord.textContent = sonic.name + ' uses ' + chosenMove.name + ". " + target.name + ' lost ' + chosenMove.power + " HP!";
    battleEvents.appendChild(attackRecord);
    updateStatus();
}

function counterAttack(enemy) {
    let responseMove = enemy.moves[0];
    if (sonic.currentHp - responseMove.power <= 0) {
        sonic.currentHp = 0;
        defeatMessage.style.display = 'block';
        endGame();
    } else {
        sonic.currentHp -= responseMove.power;
    }
    let attackRecord = document.createElement('p');
    attackRecord.textContent = enemy.name + ' uses ' + responseMove.name + '. ' + sonic.name + ' lost ' + responseMove.power + " HP!";
    battleEvents.appendChild(attackRecord);
}

function createMoveButtons(chosenCharacter) {
    for (let i = 0; i < chosenCharacter.moves.length; i++) {
        currentMove = chosenCharacter.moves[i];
        newButton[i] = document.createElement('button');
        newButton[i].className = "move-button";
        newButton[i].value = i;
        newButton[i].textContent = currentMove.name + " - Power: " + currentMove.power;
        document.querySelector('main').appendChild(newButton[i]);
    }
}

function endGame() {
    moveButtons = document.getElementsByClassName('move-button');
    for (i = 0; i < moveButtons.length; i++) {
        moveButtons[i].style.display = 'none';
    }
}

function updateStatus() {
    sonicStatus.textContent = "HP: " + sonic.currentHp + "/" + sonic.hp;
    motobugStatus.textContent = "HP: " + motobug.currentHp + "/" + motobug.hp;
}

document.addEventListener('click', function (event) {
    if (event.target.className.includes('move-button')) {
        let attackToUse = sonic.moves[event.target.value];
        attack(attackToUse, motobug);
    }
}, false);


createMoveButtons(sonic);
updateStatus();