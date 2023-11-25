import createNode from "../createNode.js";
import Cell from "./Cell.js";

const FIELD_SIZE = 3;

export default class Field {
    constructor(index) {
        this.cellArray = [];
        this.node = this.createFieldNode(index);
        this.winner = null;
    }

    createFieldNode(index) {
        const node = createNode('div', 'field');
        node.dataset.fieldIndex = index;
        for (let i = 0; i < FIELD_SIZE * FIELD_SIZE; i++) {
            const cell = new Cell(i);
            this.cellArray.push(cell);
            node.append(cell.node);
        }
        return node;
    }

    tryMarkField(cellIndex, mark) {
        if (this.winner !== null) return false;
        const currentCell = this.cellArray[cellIndex];
        if (currentCell.tryMarkCell(mark) === false) return false;
        if (this.checkFieldWinner(cellIndex) === false) {
            if (this.checkFieldTie()) this.winner = 'Tie';
        }
        return true;
    }

    checkFieldWinner(cellIndex) {
        let col = cellIndex % FIELD_SIZE;
        let row = (cellIndex - col) / FIELD_SIZE;
        let flagWinner = false;
        // check rows cols diags
        if (this.cellArray[0 * FIELD_SIZE + col].owner === this.cellArray[1 * FIELD_SIZE + col].owner &&
            this.cellArray[0 * FIELD_SIZE + col].owner === this.cellArray[2 * FIELD_SIZE + col].owner) {
            flagWinner = true;
        }
        if (this.cellArray[row * FIELD_SIZE + 0].owner === this.cellArray[row * FIELD_SIZE + 1].owner &&
            this.cellArray[row * FIELD_SIZE + 0].owner === this.cellArray[row * FIELD_SIZE + 2].owner) {
            flagWinner = true;
        }
        if (row == col) {
            if (this.cellArray[0 * FIELD_SIZE + 0].owner === this.cellArray[1 * FIELD_SIZE + 1].owner &&
                this.cellArray[0 * FIELD_SIZE + 0].owner === this.cellArray[2 * FIELD_SIZE + 2].owner) {
                flagWinner = true;
            }
        }
        if (row + col == FIELD_SIZE - 1) {
            if (this.cellArray[0 * FIELD_SIZE + 2].owner === this.cellArray[1 * FIELD_SIZE + 1].owner &&
                this.cellArray[0 * FIELD_SIZE + 2].owner === this.cellArray[2 * FIELD_SIZE + 0].owner) {
                flagWinner = true;
            }
        }

        if (flagWinner) {
            this.winner = this.cellArray[cellIndex].owner;
            console.log(`field winner: ${this.winner}`);
            this.displayWinner(this.winner);
            return true;
        }
        return false;
    }

    displayWinner(winner) {
        if (winner == 'X') {
            this.node.classList.add('x-win');
            // this.cellArray.forEach((cell, index) => {
            //     if (index % 2 == 0) cell.changeCellDisplay('X');
            //     else cell.resetDisplay();
            // });
        }
        if (winner == 'O') {
            this.node.classList.add('o-win');
            // this.cellArray.forEach((cell, index) => {
            //     if (index % 2 == 1) cell.changeCellDisplay('O');
            //     else cell.resetDisplay();
            // });
        }
    }

    checkFieldTie() {
        if (this.winner !== null) return;
        let isTie = true;
        return this.cellArray.filter(item => item.owner === null).length === 0;
    }
}