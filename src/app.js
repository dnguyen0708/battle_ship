import './style.css'
import {
    drawBoard,
    getShipPlacement,
    toggleAxis,
    populateCompBoard,
    ships
} from './ui';
import gameBoard from "./game_board";
import Position from "./position";
import { Player, Computer } from "./player";
import generateShips from './generateShips';

//global var

drawBoard(".left-wrapper");
drawBoard(".right-wrapper");
populateCompBoard();
getShipPlacement();
toggleAxis();

const startBtn = document.querySelector(".header button");
const compShips = generateShips();
let playerboard;
let compboard;
const player = Player("Dan");
const comp = Computer();
let gameOver = false;

function checkAllShipSunked() {
    const winner = document.querySelector("#winner");
    if (playerboard.checkAllShipSunk()) {
        winner.textContent = "COMP WINS! YOU SUCK";
        gameOver = true;
    }
    else if (compboard.checkAllShipSunk()) {
        winner.textContent = "YOU WINS! YOU ROCK";
        gameOver = true;
    }

}
function populateBoard() {
    playerboard = gameBoard(ships.length);
    compboard = gameBoard(compShips.length);
    for (let i = 0; i < ships.length; i++) {
        playerboard.placeShip(ships[i]);
        compboard.placeShip(compShips[i]);
    }
}
function attackComp(e) {
    if (player.attack(compboard, Position(e.target.dataset.x, e.target.dataset.y))) {
        e.target.textContent = "O";
        // gameOver = true;
    } else {
        e.target.textContent = "X";
    }
    gameLoop(false);
}
function attackPlayer() {
    const { attack, attackSucceeded } = comp.attack(playerboard);
    const square = document.querySelector(`.square.human[data-x="${attack.x}"][data-y="${attack.y}"]`);
    if (attackSucceeded) {
        square.textContent = "O";
    } else {
        square.textContent = "X";
    }
    gameLoop(true);
}

function compBoardListener() {
    const allSqr = document.querySelectorAll('.square.computer');
    allSqr.forEach(sqr => {
        sqr.addEventListener('click', attackComp);
    })
}
function removeCompListener() {
    const allSqr = document.querySelectorAll('.square.computer');
    allSqr.forEach(sqr => {
        sqr.removeEventListener('click', attackComp);
    })
}
function gameLoop(playerTurn) {
    checkAllShipSunked();
    if (gameOver) {
        removeCompListener();
        return;
    }
    else if (playerTurn) {
        compBoardListener();
        // console.log("player turn");
    }
    else {
        removeCompListener();
        attackPlayer();
        // console.log("comp turn");
    }
}


function startGame() {
    if (ships.length == 5) {
        populateBoard();
        gameLoop(true);
    } else {
        alert("must place more ships!");
    }
}

startBtn.addEventListener('click', startGame);

