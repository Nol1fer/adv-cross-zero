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
            const field = new Field();
            this.node.append(field.node);
        }
    }
}