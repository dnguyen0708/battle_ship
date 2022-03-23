const Ship = (ship) => {

    // const ship = new Array(shipCoords.length);

    function getLength() {
        return ship.length;
    }

    function hit(pos) {
        for (let i = 0; i < ship.length; i++) {
            if (ship[i].x == pos.x && ship[i].y == pos.y) {
                ship[i].mark = true;
                return true;
            }
        }
        return false;
    }
    function isSunk() {
        for (let i = 0; i < ship.length; i++) {
            if (ship[i].mark !== true) {
                return false;
            }
        }
        return true;
    }

    return { getLength, hit, isSunk };
}
export default Ship;