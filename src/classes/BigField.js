import createNode from "../createNode.js";
import Field from "./Field.js";

const BIG_FIELD_SIZE = 3;
const players = ['X', 'O'];
const AI = true;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export default class BigField {
    constructor() {
        this.node = createNode('div', 'big-field');
        this.fieldArray = [];
        this.playerTurn = 0;
    }

    generateBigField() {
        this.node.innerHTML = '';
        this.fieldArray = [];

        for (let i = 0; i < BIG_FIELD_SIZE * BIG_FIELD_SIZE; i++) {
            const field = new Field(i);
            this.fieldArray.push(field);
            this.node.append(field.node);
        }
        this.node.addEventListener('mousedown', this.handleMouseDown);
    }

    handleMouseDown = (event) => {
        const cellNode = event.target.closest('.cell');
        if (!cellNode) return;
        const fieldNode = event.target.closest('.field');

        const cellIndex = cellNode.dataset.cellIndex;
        const fieldIndex = fieldNode.dataset.fieldIndex;

        const currentField = this.fieldArray[fieldIndex];
        const thereWasAMove = currentField.tryMarkField(cellIndex, players[this.playerTurn]);

        if (thereWasAMove) {
            this.playerTurn = (this.playerTurn + 1) % players.length;

            if (AI) {
                let aiMadeTurn = false;
                do {
                    const randomCellIndex = getRandomInt(0, 9);
                    const randomFieldIndex = getRandomInt(0, 9);
                    const rCurrentField = this.fieldArray[randomFieldIndex];
                    console.log(`AI trying cell: field: ${randomFieldIndex}, cell: ${randomCellIndex}`);
                    aiMadeTurn = rCurrentField.tryMarkField(randomCellIndex, players[this.playerTurn]);
                } while (!aiMadeTurn);

                this.playerTurn = (this.playerTurn + 1) % players.length;
            }
        }
    };
}