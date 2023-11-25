import createNode from "../createNode.js";

export default class Cell {
    constructor(index) {
        this.node = this.createCellNode(index);
    }
    
    createCellNode(index) {
        const node = createNode('div', 'cell');
        node.dataset.cellIndex = index;
        return node;
    }

}