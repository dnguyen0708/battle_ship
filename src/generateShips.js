import Position from "./position";
function generateShips() {
    // const allSqr = document.querySelectorAll('.square.computer');
    const ship1 = [Position(1, 1), Position(2, 1), Position(3, 1), Position(4, 1), Position(5, 1)];
    const ship2 = [Position(3, 3), Position(3, 4), Position(3, 5), Position(3, 6)];
    const ship3 = [Position(5, 4), Position(5, 5), Position(5, 6)];
    const ship4 = [Position(7, 5), Position(7, 6)];
    const ship5 = [Position(9, 6)];
    return [ship1, ship2, ship3, ship4, ship5];
}
export default generateShips;