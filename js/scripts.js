const battleEvents = document.getElementById('battle-events');
const sonicStatus = document.getElementById('sonic-status');
const motobugStatus = document.getElementById('motobug-status');
const victoryMessage = document.getElementById('victory-message');
const defeatMessage = document.getElementById('defeat-message');
let newButton = new Array;
let turnCounter = 0;

class Move {
    constructor(name, power, epCost, accuracy) {
        this.name = name;
        this.power = power;
        this.epCost = epCost;
        this.accuracy = accuracy;
    }
}

class Character {
    constructor(name, hp, ep, moves) {
        this.name = name;
        this.hp = hp;
        this.ep = ep;
        this.currentHp = hp;
        this.currentEp = ep;
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
sonicMoves[0] = new Move("Spin Dash", 70, 10, 0.8);
sonicMoves[1] = new Move("Spin Attack", 50, 5, 1);
sonicMoves[2] = new Move("Idle", 0, 0, 1);
const motobugMoves = new Array();
motobugMoves[0] = new Move("Slash", 60, 5, 1);
motobugMoves[1] = new Move("Poke", 40, 2, 1)
motobugMoves[2] = new Move("Power Slash", 70, 20, 0.8);

let sonic = new Character("Sonic", 100, 100, sonicMoves);
let motobug = new Character("Motobug", 80, 80, motobugMoves);

function determineIfHit(chosenMove) {
    let moveHitSuccessfully;
    let accuracyRng;
    if (chosenMove.accuracy < 1) {
        accuracyRng = Math.random();
        if (accuracyRng <= chosenMove.accuracy) {
            moveHitSuccessfully = true;
        } else {
            moveHitSuccessfully = false;
        }
    } else {
        moveHitSuccessfully = true;
    }
    return moveHitSuccessfully;
}

function attack(chosenMove, target) {
    turnCounter++;
    let attackRecord = document.createElement('p');
    attackRecord.textContent = sonic.name + ' uses ' + chosenMove.name + ". " + target.name + ' lost ' + chosenMove.power + " HP!";
    battleEvents.appendChild(new TurnHeader(turnCounter).element);
    let accuracyCheck = determineIfHit(chosenMove);
    if (accuracyCheck === true) {
        if (target.currentHp - chosenMove.power <= 0) {
            target.currentHp = 0;
            battleEvents.appendChild(attackRecord);
            victoryMessage.style.display = 'block';
            endGame();
        } else {
            target.currentHp -= chosenMove.power;
            battleEvents.appendChild(attackRecord);
            counterAttack(target);
        }
        if (sonic.currentEp - chosenMove.epCost <= 0) {
            sonic.currentEp = 0;
            battleEvents.appendChild(attackRecord);
            defeatMessage.style.display = 'block';
            endGame();
        } else {
            sonic.currentEp -= chosenMove.epCost;
        }
    } else if (accuracyCheck === false) {
        attackRecord.textContent = sonic.name + ' uses ' + chosenMove.name + ", but it missed!";
        battleEvents.appendChild(attackRecord);
        counterAttack(target);
    }
    updateStatus();
}

function counterAttack(enemy) {
    let moveChoice = Math.floor(Math.random() * enemy.moves.length - 1) + 1;
    console.log(moveChoice);
    let responseMove = enemy.moves[moveChoice];
    if (sonic.currentHp - responseMove.power <= 0) {
        sonic.currentHp = 0;
        defeatMessage.style.display = 'block';
        endGame();
    } else {
        sonic.currentHp -= responseMove.power;
    }
    if (enemy.currentEp - responseMove.epCost <= 0) {
        enemy.currentEp = 0;
        victoryMessage.style.display = 'block';
        endGame();
    } else {
        enemy.currentEp -= responseMove.epCost;
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
        newButton[i].innerHTML = '<h2>' + currentMove.name + "</h2><b>Power:</b> " + currentMove.power + "<br /><b>Energy Cost:</b> " + currentMove.epCost + "<br /><b>Accuracy:</b> " + (currentMove.accuracy * 100 + '%');
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
    sonicStatus.innerHTML = "HP: " + sonic.currentHp + "/" + sonic.hp;
    motobugStatus.innerHTML = "HP: " + motobug.currentHp + "/" + motobug.hp;
    sonicStatus.innerHTML += "<br />EP: " + sonic.currentEp + "/" + sonic.ep;
    motobugStatus.innerHTML += "<br />EP: " + motobug.currentEp + "/" + motobug.ep;
}

document.addEventListener('click', function (event) {
    let attackToUse;
    if (event.target.className.includes('move-button') || event.target.parentNode.className.includes('move-button')) {
        if (event.target.className.includes('move-button')) {
            attackToUse = sonic.moves[event.target.value];
        } if (event.target.parentNode.className.includes('move-button')) {
            attackToUse = sonic.moves[event.target.parentNode.value];
        }
        attack(attackToUse, motobug);
    }
}, true);

createMoveButtons(sonic);
updateStatus();