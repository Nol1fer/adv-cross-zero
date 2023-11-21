import BigField from "./classes/BigField.js";
import createNode from "./createNode.js";

console.log('Hello world!');

const wrapper = createNode('div', 'wrapper');
document.body.append(wrapper);

const heading = createNode('h1', 'font-effect-anaglyph');
heading.innerHTML = 'Tic Tac Toe';
wrapper.append(heading);

const bigField = new BigField();
bigField.generateBigField();
wrapper.append(bigField.node);
