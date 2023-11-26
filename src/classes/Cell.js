import createNode from "../createNode.js";

export default class Cell {
    constructor(index) {
        this.node = this.createCellNode(index);
        this.owner = null;
    }

    createCellNode(index) {
        const node = createNode('div', 'cell');
        node.dataset.cellIndex = index;
        return node;
    }

    tryMarkCell(mark) {
        if (this.owner != null) return false;

        this.owner = mark;
        this.node.innerHTML = mark;
        console.log(this.node);
        console.log(`Cell owner - ${this.owner}`);
        return true;
    }

    changeCellDisplay(value) {
        this.node.innerHTML = value;
    }
}