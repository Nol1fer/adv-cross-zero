export default function checkFieldTie(array) {
    let isTie = array.filter(item => item === null).length === 0;
    return isTie;
}