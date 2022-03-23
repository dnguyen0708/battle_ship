import Position from "./position";
import Ship from "./ship";
import generateShips from "./generateShips";
// global var
const boardSize = 10;
let shipSize = 5;
let axis = 'x';
let ships = new Array();

function drawBoard(wrapper) {
    const wrap = document.querySelector(wrapper);
    const orientation = document.createElement('button');
    const board = document.createElement('div');
    orientation.className = "axis-toggle-btn btn"
    orientation.textContent = "Orientation: X";
    board.className = "board";
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const square = document.createElement('div');
            square.dataset.x = j;
            square.dataset.y = i;
            if (wrapper == ".left-wrapper") {
                square.className = 'square human active';
            }
            else {
                square.className = "square computer";
            }
            board.appendChild(square);
        }
    }
    wrap.append(orientation, board);
}

function checkOutOfBound(ax) {
    // return ax >= boardSize ? ax % 9 + (boardSize - shipSize - 1) : ax;
    return ((ax + shipSize) > boardSize) ? true : false;
}
function highlightSquare(e) {
    let x = parseInt(e.target.dataset.x);
    let y = parseInt(e.target.dataset.y);
    if (axis.toLowerCase() === 'x') {
        if (!checkOutOfBound(x)) {
            e.target.classList.add('highlight');
            for (let i = 1; i < shipSize; i++) {
                const nextSibling = document.querySelector(`.square.active[data-x="${x + i}"][data-y="${y}"]`);
                nextSibling.classList.add('highlight');
            }
        }
    } else {
        if (!checkOutOfBound(y)) {
            e.target.classList.add('highlight');
            for (let i = 1; i < shipSize; i++) {
                const nextSibling = document.querySelector(`.square.active[data-x="${x}"][data-y="${y + i}"]`);
                nextSibling.classList.add('highlight');
            }
        }
    }
}
function unHighlighSquare(e) {
    // e.target.classList.remove('highlight');
    let x = parseInt(e.target.dataset.x);
    let y = parseInt(e.target.dataset.y);
    if (axis.toLowerCase() === 'x') {
        if (!checkOutOfBound(x)) {
            e.target.classList.remove('highlight');
            for (let i = 1; i < shipSize; i++) {
                const nextSibling = document.querySelector(`.square.active[data-x="${x + i}"][data-y="${y}"]`);
                nextSibling.classList.remove('highlight');
            }
        }
    } else {
        if (!checkOutOfBound(y)) {
            e.target.classList.remove('highlight');
            for (let i = 1; i < shipSize; i++) {
                const nextSibling = document.querySelector(`.square.active[data-x="${x}"][data-y="${y + i}"]`);
                nextSibling.classList.remove('highlight');
            }
        }
    }
}
function getShipPlacement() {
    const playerBoard = document.querySelectorAll('.square.human.active');
    playerBoard.forEach(sqr => {
        sqr.addEventListener('mouseover', highlightSquare);
        sqr.addEventListener('mouseout', unHighlighSquare);
        sqr.addEventListener('click', getShipCoordinates);
    })
}

function toggleAxis() {
    const btn = document.querySelector('.axis-toggle-btn');
    btn.addEventListener('click', () => {
        if (axis === 'y') {
            axis = 'x';
            btn.textContent = "Orientation: X";
        } else {
            axis = 'y';
            btn.textContent = "Orientation: Y";
        }
    })
}

function removeShipPlacementListener() {
    const playerBoard = document.querySelectorAll('.square.human');
    playerBoard.forEach(sqr => {
        sqr.removeEventListener('mouseover', highlightSquare);
        sqr.removeEventListener('mouseout', unHighlighSquare);
        sqr.removeEventListener('click', getShipCoordinates);
    })
    const hideBtn = document.querySelector(".left-wrapper button");
    hideBtn.style.display = 'none';
}

function getShipCoordinates() {
    const ship = document.querySelectorAll('.square.highlight.active');
    let newShip = new Array();
    ship.forEach(s => {
        newShip.push(Position(s.dataset.x, s.dataset.y));
        s.classList.remove('active');
        s.removeEventListener('mouseover', highlightSquare);
        s.removeEventListener('mouseout', unHighlighSquare);
        s.removeEventListener('click', getShipCoordinates);
    });
    ships.push(newShip);
    shipSize > 1 ? shipSize-- : removeShipPlacementListener();
}

function populateCompBoard() {
    const ships = generateShips();
    for (let i = 0; i < ships.length; i++) {
        for (let j = 0; j < ships[i].length; j++) {
            const square = document.querySelector(`.square.computer[data-x="${ships[i][j].x}"][data-y="${ships[i][j].y}"]`);
            // square.classList.add('highlight');
        }
    }
}

export {
    drawBoard,
    getShipPlacement,
    toggleAxis,
    removeShipPlacementListener,
    getShipCoordinates,
    populateCompBoard,
    ships
};