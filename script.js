"use strict";

var WALL    = "W";
var FLOOR   = "F";
var PLAYER  = "P";
var MONSTER = "M";
var GOAL    = "G";
var EMPTY   = "E";
var PRINT   = "X";

var PLAYERIMG   = "<img src='img/playerR.png'>";
var MONSTERIMG  = "<img src='img/monster.png'>";

var MOVR = "<img src='img/playerR.png' width='47' height='47'>";
var MOVL = "<img src='img/playerL.png' width='47' height='47'>";
var MOVD = "<img src='img/playerD.png' width='47' height='47'>";
var MOVU = "<img src='img/playerU.png' width='47' height='47'>";

var gameMap = mapStart();
var pPos = {i:0, j:0};

// Get values for count, timer or if game is ended
var countV = 0;
var timeV = 0;
var gEnd;

// Modal
var modal = document.getElementById("myModal");             // Get the modal

/** Messages to HTML **/
var count   = document.getElementById("count");
var message = document.getElementById("message");
var whatMap = document.getElementById("whatMap");
var gTimer  = document.getElementById("timeCount");
/** HTML **/
var printBoard = document.getElementById("gameMap");
var modalHtml  = document.getElementById("modalHtml");
var mapMenu    = document.getElementById("mapmenu");


startPage();
/** Start Page **/
function startPage() {
    stop();
    reset();
    count.innerHTML = 0;
    countV = 0;
    whatMap.innerHTML = "START PAGE";
    message.innerHTML = "Click one of the maps to start the game";
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
    message.innerHTML = "Click one of the maps to start the game";
    whatMap.innerHTML = "Map "+nr;
    timer();
}
function endTable() {
    stop();
    pPos.i = 0;
    pPos.j = 0;

}

/** Move player with game rules **/
function move(i,j) {

    var iD = i - pPos.i;
    var jD = j - pPos.j;
    var canMove = true;

    if ( gameMap[i][j].model !== WALL) {
        canMove = true;
        if ( gameMap[i][j].status === MONSTER ) {
            if ( gameMap[i+iD][j+jD].model !== WALL && gameMap[i+iD][j+jD].status === null){
                 gameMap[i][j].status = null;
                 gameMap[i+iD][j+jD].status = MONSTER;
                canMove = true;
            } else { canMove = false;}
        }
        if ( canMove )  updateCheckPlayer(i,j);
    }
}

function updateCheckPlayer(i,j) {
    var cell;
    var inGame = true;

    /** Update movement on player **/
    gameMap[pPos.i][pPos.j].status = null;
        pPos.i = i;
        pPos.j = j;
    gameMap[pPos.i][pPos.j].status = PLAYER;

    /** Update move counter **/
    countV++;
    count.innerHTML = countV;

    /** Update map **/
    createBoard();

    /** Check for victory **/
    for(var k = 0; k < gameMap.length; k++ ) {
        for(var l = 0; l < gameMap[0].length; l++ ) {
            cell = gameMap[k][l];
            if ( cell.model === GOAL && cell.status !== MONSTER )  inGame = false;
        }
    }
    if ( inGame ) {
        openModal("<p><b>YOU ARE A WINNER</b></p><br><p><b>Moves:"+countV+" || Timer: "+timeV+"</b></p>");
        endTable();
        gEnd = true;
    }
}

/** Use arrow keys and w,a,s,d to move player **/
window.addEventListener("keydown", function(event) {
    var i= pPos.i;
    var j= pPos.j;
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
    switch ( event.keyCode ) {
        case 37: PLAYERIMG = MOVL; move(i, j-1); break;
        case 38: PLAYERIMG = MOVU; move(i-1, j); break;
        case 39: PLAYERIMG = MOVR; move(i, j+1); break;
        case 40: PLAYERIMG = MOVD; move(i+1, j); break;
        /** WASD **/
        case 65: PLAYERIMG = MOVL; move(i, j-1); break;
        case 87: PLAYERIMG = MOVU; move(i-1, j); break;
        case 68: PLAYERIMG = MOVR; move(i, j+1); break;
        case 83: PLAYERIMG = MOVD; move(i+1, j); break;
        /** Space **/
        case 32: alert("Hello World"); break;
    }
}, false);

/** Modal window ************************************************************************************************/

function closeModal() {
    if ( gEnd ) startPage();
    modal.style.display = "none";
}
function openModal(message) {
    modalHtml.innerHTML = message;
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        closeModal();
    }
}

/** 1. Create HTML table **/
function createBoard() {
    var html    = "";
    var cell    = "";
    var cellCss = "";

    for (var i = 0; i < gameMap.length; i++) {
        html = html + "<tr>";
        for (var j = 0; j < gameMap[0].length; j++ ){
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

