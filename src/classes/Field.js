import createNode from "../createNode.js";
import Cell from "./Cell.js";

const FIELD_SIZE = 3;

export default class Field {
    constructor(index) {
        this.node = this.createFieldNode(index);
    }

    createFieldNode(index) {
        const node = createNode('div', 'field');
        node.dataset.fieldIndex = index;

        for (let i = 0; i < FIELD_SIZE * FIELD_SIZE; i++) {
            const cellInstance = new Cell(i);
            node.append(cellInstance.node);
        }
        return node;
    }
}