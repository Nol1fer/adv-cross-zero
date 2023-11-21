import createNode from "../createNode.js";
import Cell from "./Cell.js";

const FIELD_SIZE = 3;

export default class Field {
    constructor() {
        this.node = this.createFieldNode();
    }

    createFieldNode() {
        const node = createNode('div', 'field');
        for (let i = 0; i < FIELD_SIZE * FIELD_SIZE; i++) {
            const cellInstance = new Cell();
            node.append(cellInstance.node);
        }
        return node;
    }
}