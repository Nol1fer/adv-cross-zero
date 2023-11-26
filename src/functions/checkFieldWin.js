export default function checkFieldWin(index, array, fieldSize) {
    let col = index % fieldSize;
    let row = (index - col) / fieldSize;
    let flagWinner = false;

    if (array[0 * fieldSize + col] === array[1 * fieldSize + col] &&
        array[0 * fieldSize + col] === array[2 * fieldSize + col]) {
        flagWinner = true;
    }
    if (array[row * fieldSize + 0] === array[row * fieldSize + 1] &&
        array[row * fieldSize + 0] === array[row * fieldSize + 2]) {
        flagWinner = true;
    }
    if (row == col) {
        if (array[0 * fieldSize + 0] === array[1 * fieldSize + 1] &&
            array[0 * fieldSize + 0] === array[2 * fieldSize + 2]) {
            flagWinner = true;
        }
    }
    if (row + col == fieldSize - 1) {
        if (array[0 * fieldSize + 2] === array[1 * fieldSize + 1] &&
            array[0 * fieldSize + 2] === array[2 * fieldSize + 0]) {
            flagWinner = true;
        }
    }

    return flagWinner;
}