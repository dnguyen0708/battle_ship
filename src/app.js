import './style.css'
import {
    drawBoard,
    getShipPlacement,
    toggleAxis,
    removeShipPlacementListener,
    getShipCoordinates,
    ships
} from './ui';
import { Ship } from "./ship";
import { gameBoard } from "./game_board";
import { Position } from "./position";
import { Player, Computer } from "./player";

//global var
let gameOver = false;







drawBoard(".left-wrapper");
getShipPlacement();
toggleAxis();
// console.log(ships);
// removeShipPlacementListener();