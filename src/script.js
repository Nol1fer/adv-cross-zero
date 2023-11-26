import BigField from "./classes/BigField.js";
import createNode from "./createNode.js";

console.log('Welcome to Tic Tac Toe!');

const wrapper = createNode('div', 'wrapper');
document.body.append(wrapper);

const heading = createNode('h1');
heading.innerHTML = 'Tic Tac Toe';
wrapper.append(heading);

const bigField = new BigField();
bigField.generateBigField();
wrapper.append(bigField.node);

// setInterval(() => bigField.gameSimulation(), 10);