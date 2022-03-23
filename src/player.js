const Player = (name) => {

    function attack(board, atkSqr) {
        board.receiveAttack(atkSqr);
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

    function generateAttackSquare(board) {
        const x = Math.floor(Math.random * board.getSize());
        const y = Math.floor(Math.random * board.getSize());
        const attackPosition = Position(x, y);
        return attackPosition;
    }

    function generateAttack(board) {
        let attackPosition = generateAttackSquare(board);
        while (checkAttackMoveExist(attackPosition)) {
            attackPosition = generateAttackSquare(board);
        }
        attackMove.push(attackPosition);
        return attackPosition;
    }

    function attack(board) {
        board.receiveAttack(generateAttack(board));
    }

    return { attack };
}


module.exports = { Player, Computer };