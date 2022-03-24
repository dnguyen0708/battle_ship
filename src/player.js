import Position from "./position";
const Player = (name) => {

    function attack(board, atkSqr) {
        return board.receiveAttack(atkSqr);
    }

    return { name, attack };
}

const Computer = () => {

    const attackMove = new Array();

    function checkAttackMoveExist(pos) {
        for (let i = 0; i < attackMove.length; i++) {
            if (attackMove[i].x === pos.x && attackMove[i].y === pos.y) {
                return true;
            }
        }
        return false;
    }

    function generateAttackSquare() {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const attackPosition = Position(x, y);
        return attackPosition;
    }

    function generateAttack() {
        let attackPosition = generateAttackSquare();
        while (checkAttackMoveExist(attackPosition)) {
            attackPosition = generateAttackSquare();
        }
        attackMove.push(attackPosition);
        return attackPosition;
    }

    function attack(board) {
        const attack = generateAttack();
        const attackSucceeded = board.receiveAttack(attack);
        return { attack, attackSucceeded };
    }
    return { attack };
}


export { Player, Computer };