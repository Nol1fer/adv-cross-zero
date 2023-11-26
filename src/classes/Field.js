import createNode from "../createNode.js";
import checkFieldTie from "../functions/checkFieldTie.js";
import checkFieldWin from "../functions/checkFieldWin.js";
import Cell from "./Cell.js";

const FIELD_SIZE = 3;

export default class Field {
    constructor(index) {
        this.cellArray = [];
        this.node = this.createFieldNode(index);
        this.status = null;
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
        if (this.status !== null) return false;
        const currentCell = this.cellArray[cellIndex];
        if (currentCell.tryMarkCell(mark) === false) return false;
        this.checkFieldStatus(cellIndex);
        return true;
    }

    checkFieldStatus(cellIndex) {
        let checkArray = this.cellArray.map(cell => cell.owner);

        let isWin = checkFieldWin(cellIndex, checkArray, FIELD_SIZE);
        if (isWin) {
            this.status = this.cellArray[cellIndex].owner;
        }
        else {
            let isTie = checkFieldTie(checkArray);
            if (isTie) {
                this.status = 'Tie';
            }
        }

        if (this.status !== null) this.displayStatus(this.status);
    }

    displayStatus(status) {
        console.log(`field status: ${status}`);
        if (status === 'X') {
            this.node.classList.add('x-win');
            // this.cellArray.forEach((cell, index) => {
            //     if (index % 2 == 0) cell.changeCellDisplay('X');
            //     else cell.changeCellDisplay('');
            // });
        }
        if (status === 'O') {
            this.node.classList.add('o-win');
            // this.cellArray.forEach((cell, index) => {
            //     if (index % 2 == 1) cell.changeCellDisplay('O');
            //     else cell.changeCellDisplay('');
            // });
        }
        if (status === 'Tie') {
            this.node.classList.add('tie');
        }
    }


}