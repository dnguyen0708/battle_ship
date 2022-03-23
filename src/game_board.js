import Ship from "./ship";
const gameBoard = (size) => {

    const ships = new Array();

    function getSize() {
        return size;
    }

    function placeShip(ship) {
        const newShip = Ship(ship);
        ships.push(newShip);
    }

    function receiveAttack(coord) {
        for (let i = 0; i < ships.length; i++) {
            if (ships[i].hit(coord)) return true;
        }
        return false;
    }

    function checkAllShipSunk() {
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isSunk()) {
                return false;
            }
        }
        return true;
    }

    return { getSize, placeShip, receiveAttack, checkAllShipSunk };
}
export default gameBoard;