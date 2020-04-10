const battleEvents = document.getElementById('battle-events');
const sonicStatus = document.getElementById('sonic-status');
const motobugStatus = document.getElementById('motobug-status');
const victoryMessage = document.getElementById('victory-message');
const defeatMessage = document.getElementById('defeat-message');
let newButton = new Array;

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

const spinAttack = new Move("Spin Attack", 50, 1);
const kick = new Move("Kick", 70, .8);
const poke = new Move("Poke", 60, 1);
const idle = new Move("Idle", 0, 1);

let sonic = new Character("Sonic", 100, [spinAttack, kick, idle]);
let motobug = new Character("Motobug", 80, [poke]);

function attack(chosenMove, target) {
    if (target.currentHp - chosenMove.power <= 0) {
        
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
    let initialHp = sonic.currentHp;
    let responseMove = enemy.moves[0];
    sonic.currentHp -= responseMove.power;
    let attackRecord = document.createElement('p');
    attackRecord.textContent = enemy.name + ' uses ' + responseMove.name + '. ' + sonic.name + ' lost ' + responseMove.power + " HP!";
    battleEvents.appendChild(attackRecord);
    if (initialHp - responseMove.power <= 0) {
        showResults(false);
    }
}

function showResults(victory) {
    if (victory === true) {
        target.currentHp = 0;
        battleEvents.appendChild(victoryMessage);
        victoryMessage.style.display = 'block';
    }
    if (victory === false) {
        sonic.currentHp = 0;
        battleEvents.appendChild(defeatMessage);
        defeatMessage.style.display = 'block';
    }
}

function createMoveButtons(chosenCharacter) {
    for (let i = 0; i < chosenCharacter.moves.length; i++) {
        currentMove = chosenCharacter.moves[i];
        newButton[i] = document.createElement('button');
        newButton[i].className = "move-button";
        newButton[i].value = currentMove.name;
        newButton[i].textContent = currentMove.name + " - Power: " + currentMove.power;
        document.querySelector('main').appendChild(newButton[i]);
    }
}

function updateStatus() {
    sonicStatus.textContent = "HP: " + sonic.currentHp + "/" + sonic.hp;
    motobugStatus.textContent = "HP: " + motobug.currentHp + "/" + motobug.hp;
}

document.addEventListener('click', function (event) {
	if (event.target.matches('.move-button')) {
        if (event.target.value == 'Spin Attack') {
            attack(spinAttack, motobug)
        }
        if (event.target.value == 'Kick') {
            attack(kick, motobug)
        }
        if (event.target.value == 'Idle') {
            attack(idle, motobug)
        }
	}
}, false);


createMoveButtons(sonic);
updateStatus();