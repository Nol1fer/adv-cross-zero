import createNode from "../createNode.js";
import checkFieldTie from "../functions/checkFieldTie.js";
import checkFieldWin from "../functions/checkFieldWin.js";
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
    }

    generateBigField() {
        this.node.innerHTML = '';
        this.playerTurn = 0;
        this.status = null;
        this.fieldArray = [];

        for (let i = 0; i < BIG_FIELD_SIZE * BIG_FIELD_SIZE; i++) {
            const field = new Field(i);
            this.fieldArray.push(field);
            this.node.append(field.node);
        }
        this.node.addEventListener('mousedown', this.handleMouseDown);
    }

    gameSimulation() {
            this.aiMove();
            this.playerTurn = (this.playerTurn + 1) % players.length;
    }

    handleMouseDown = (event) => {
        if (this.status !== null) return;

        const cellNode = event.target.closest('.cell');
        if (!cellNode) return;
        const fieldNode = event.target.closest('.field');

        const cellIndex = cellNode.dataset.cellIndex;
        const fieldIndex = fieldNode.dataset.fieldIndex;

        const currentField = this.fieldArray[fieldIndex];
        const userMadeMove = currentField.tryMarkField(cellIndex, players[this.playerTurn]);

        if (userMadeMove) {
            this.checkBigFieldStatus(fieldIndex);
            if (this.status !== null) return;
            this.playerTurn = (this.playerTurn + 1) % players.length;
            this.aiMove();
            this.playerTurn = (this.playerTurn + 1) % players.length;
        }
    };

    checkBigFieldStatus(fieldIndex) {
        const checkArray = this.fieldArray.map(field => field.status);

        if (this.fieldArray[fieldIndex].status === 'Tie') {
            let isTie = checkFieldTie(checkArray);
            if (isTie) {
                this.status = 'Tie';
            }
        } else {
            let isWin = checkFieldWin(fieldIndex, checkArray, BIG_FIELD_SIZE);
            if (isWin) {
                this.status = this.fieldArray[fieldIndex].status;
            } else {
                let isTie = checkFieldTie(checkArray);
                if (isTie) {
                    this.status = 'Tie';
                }
            }
        }

        if (this.status !== null) this.displayStatus(this.status);
    }

    displayStatus(status) {
        console.log(`Big field status: ${status}`);
        let alertString;
        if (status === 'X') {
            alertString = 'X won';
        }
        if (status === 'O') {
            alertString = 'O won';
        }
        if (status === 'Tie') {
            alertString = 'Tie';
        }
        setTimeout(() => alert(alertString), 100);
    }

    aiMove() {
        if (this.status !== null) return;

        let aiMadeTurn = false;
        let randomFieldIndex;
        let randomCellIndex;
        do {
            randomCellIndex = getRandomInt(0, 9);
            randomFieldIndex = getRandomInt(0, 9);
            const rCurrentField = this.fieldArray[randomFieldIndex];
            if (rCurrentField.status !== null) continue;
            aiMadeTurn = rCurrentField.tryMarkField(randomCellIndex, players[this.playerTurn]);
        } while (!aiMadeTurn);

        console.log(`AI marked cell: field: ${randomFieldIndex}, cell: ${randomCellIndex}`);
        this.checkBigFieldStatus(randomFieldIndex);
    }
}