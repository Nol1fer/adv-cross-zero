import createNode from "../createNode.js";
import Field from "./Field.js";

const BIG_FIELD_SIZE = 3;

export default class BigField {
    constructor() {
        this.node = createNode('div', 'big-field');
    }

    generateBigField() {
        this.node.innerHTML = '';

        for (let i = 0; i < BIG_FIELD_SIZE * BIG_FIELD_SIZE; i++) {
            const field = new Field(i);
            this.node.append(field.node);
        }
        this.node.addEventListener('mousedown', this.handleMouseDown);
    }

    handleMouseDown = (event) => {
        console.log(event);
        const cellNode = event.target.closest('.cell');
        if (!cellNode) return;
        const fieldNode = event.target.closest('.field');
        console.log(cellNode);
        console.log(fieldNode);

        const cellIndex = cellNode.dataset.cellIndex;
        const fieldIndex = fieldNode.dataset.fieldIndex;
        console.log(`cellIndex: ${cellIndex}, fieldIndex: ${fieldIndex}`);
    }
}