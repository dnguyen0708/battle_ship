import { Ship } from "./ship";
// const { Ship } = require('./ship');
const gameBoard = (size) => {

    const ships = new Array();

    function getSize() {
        return size;
    }

    function placeShip(coords) {
        const ship = Ship(coords);
        ships.push(ship);
    }

    function receiveAttack(coord) {
        for (let i = 0; i < ships.length; i++) {
            if (ships[i].hit(coord)) return;
        }
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