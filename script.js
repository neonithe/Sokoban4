"use strict";

const WALL = "W";
const FLOOR = "F";
const PLAYER = "P";
const MONSTER = "M";
const GOAL = "G";
const EMPTY = "E";
const PRINT = "X";

let gameMap = mapStart();
let pPos = {i: 0, j: 0};

/** Messages to HTML **/
const whatMap = document.getElementById("whatMap");

/** HTML **/
const printBoard = document.getElementById("gameMap");
const modalHtml = document.getElementById("modalHtml");
const mapMenu = document.getElementById("mapmenu");

startPage();

/** Start Page **/
function startPage() {
    stop();
    reset();
    count.innerHTML = 0;
    countV = 0;
    whatMap.innerHTML = "START PAGE";
    mapMenu.innerHTML = mapMenuHtml();
    gameMap = convertMap(mapStart());
    createBoard();
}

/** Game Menu **/
function startGame(map) {
    switch ( map ) {
        case 1:
            startTable(map);
        break;
        case 2:
            startTable(map);
        break;
    }
}

function startTable(nr) {
    stop();
    reset();
    gameMap = convertMap(returnMap(nr));
    getPlayer(returnMap(nr));
    count.innerHTML = 0;
    whatMap.innerHTML = "Map "+nr;
    timer();
}


/** Create HTML table **/
function createBoard() {
    let html = "";
    let cell = "";
    let cellCss = "";

    for (let i = 0; i < gameMap.length; i++) {
        html = html + "<tr>";
        for (let j = 0; j < gameMap[0].length; j++ ){
            cell = gameMap[i][j];

            if ( cell.model === WALL ) {
                cellCss = "wall";
            } else if ( cell.model === FLOOR ) {
                cellCss = "floor";
            } else if ( cell.model === GOAL ) {
                cellCss = "goal";
            } else if ( cell.model === EMPTY ) {
                cellCss = "empty";
            } else if ( cell.model === PRINT ) {
                cellCss = "print";
            }

            html = html + "<td class='cell " + cellCss +  "'>";

            if ( cell.status === PLAYER ) {
                html = html + PLAYERIMG;
            } else if ( cell.status === MONSTER ) {
                html = html + MONSTERIMG;
            }
            html = html + "</td>";
        }
        html = html + "</tr>";
    }
    printBoard.innerHTML = html;
  return gameMap;
}

