import createNode from "../createNode.js";

export default class Cell {
    constructor() {
        this.node = createNode('div', 'cell');
    }
}