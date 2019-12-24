const battleEvents = document.getElementById('battle-events');
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
        this.moves = moves;
    }
}

const spinAttack = new Move("Spin Attack", 50, 1);
const kick = new Move("Kick", 70, .8);
const poke = new Move("Poke", 60, 1);

let sonic = new Character("Sonic", 100, [spinAttack, kick]);
let motobug = new Character("Motobug", 80, [poke]);

function attack(chosenMove, target) {
    console.log(chosenMove);
    target.hp -= chosenMove.power;
    battleEvents.textContent += target.name + ' lost ' + chosenMove.power + " HP!";
}

function createMoveButtons(chosenCharacter) {
    for (let i = 0; i < chosenCharacter.moves.length; i++) {
        currentMove = chosenCharacter.moves[i];
        newButton[i] = document.createElement('button');
        newButton[i].className = "move-button";
        newButton[i].value = currentMove.name;
        newButton[i].textContent = currentMove.name + " - Power: " + currentMove.power;
        document.querySelector('body').appendChild(newButton[i]);
    }
}

document.addEventListener('click', function (event) {
	if (event.target.matches('.move-button')) {
        if (event.target.value == 'Spin Attack') {
            attack(spinAttack, motobug)
        }
        if (event.target.value == 'Kick') {
            attack(kick, motobug)
        }
	}
}, false);


createMoveButtons(sonic);