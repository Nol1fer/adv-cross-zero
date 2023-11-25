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
        console.log('owner: ' + this.owner);
        return true;
    }

    resetDisplay(){
        this.node.innerHTML = '';
    }

    changeCellDisplay(value){
        this.node.innerHTML = value;
    }
}