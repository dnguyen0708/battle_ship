const { Ship } = require('./ship');
const { Position } = require('./position');

function seedPosition() {
    const pos1 = Position(0, 0);
    const pos2 = Position(1, 0);
    const pos3 = Position(2, 0);
    const pos4 = Position(3, 0);
    const pos5 = Position(4, 0);
    const testCoords = [pos1, pos2, pos3, pos4, pos5];
    return testCoords;
}


test("test ship length is 5", () => {
    expect(Ship(seedPosition()).getLength()).toBe(5);
});

test("test hit function at position x=4 and y=0", () => {
    expect(Ship(seedPosition()).hit(Position(4, 0))).toBe(true);
});
test("test hit function at position x=0 and y=4", () => {
    expect(Ship(seedPosition()).hit(Position(0, 4))).toBe(false);
});
test("test isSunk to be true, all position has been hit", () => {
    const ship = Ship(seedPosition());
    ship.hit(Position(0, 0));
    ship.hit(Position(1, 0));
    ship.hit(Position(2, 0));
    ship.hit(Position(3, 0));
    ship.hit(Position(4, 0));
    expect(ship.isSunk()).toBe(true);
});
test("test isSunk to be false, all position has not been hit", () => {
    const ship = Ship(seedPosition());
    ship.hit(Position(0, 0));
    ship.hit(Position(1, 0));
    expect(ship.isSunk()).toBe(false);
});