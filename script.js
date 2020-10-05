
var WALL    = "W";
var FLOOR   = "F";
var PLAYER  = "P";
var MONSTER = "M";
var GOAL    = "G";
var EMPTY   = "E";
var PRINT   = "X";

var PLAYERIMG   = "<img src='img/playerR.png'>";
var MONSTERIMG  = "<img src='img/monster.png'>";

var gameMap = mapStart();
var pPos = {i:0, j:0};

// Timer

/** Messages to HTML **/
var count = document.getElementById("count");

/** Game Menu **/
function startGame(map) {
    switch ( map ) {
        case 1:
            gameMap = convertMap(map1());
            console.log(gameMap);
            createBoard();
        break;
    }
}

/** Move player with game rules [WALL] [MOVE MONSTER] **/
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
            } else {
                canMove = false;
            }
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
    count.innerHTML++;

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
        message.innerHTML = "You are a winner";
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
        case 37: // Vänster
            move(i, j-1);
            break;
        case 38: // Upp
            move(i-1, j);
            break;
        case 39: // Höger
            move(i, j+1);
            break;
        case 40: // Ner
            move(i+1, j);
            break;
        case 32: // Ner
            alert("Hello World");
            break;

        /** WASD **/
        case 65: // Vänster
            move(i, j-1);
            break;
        case 87: // Upp
            move(i-1, j);
            break;
        case 68: // Höger
            move(i, j+1);
            break;
        case 83: // Ner
            move(i+1, j);
            break;
    }
}, false);



/**  1. Create HTML, 2. Player position, 3. Maps, 4. Convert Map   ***********************************************/

/** 1. Create HTML table **/
function createBoard() {
    var printBoard = document.getElementById("gameMap");
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

/** 2. Get position of player **/
function getPlayer(array) {
    for (var i = 0; i < array.length; i++ ) {
        for (var j = 0; j < array[0].length; j++ ) {
            if ( array[i][j] === "P" ) {
                pPos.i = i; pPos.j = j;
            }
        }
    }
}
console.log(gameMap);
console.log(goalMap(mapStart()));

/** 3. MAPS **/
function map1() {

    var map = [];

    /**     M = Monster | P = PLayer | W = Wall | F = Floor | G = Goal      **/
    /*
        map[0]   = ["E", "E", "E", "E", "W", "W", "W", "W", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"];
        map[1]   = ["E", "E", "E", "E", "W", "F", "F", "F", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"];
        map[2]   = ["E", "E", "E", "E", "W", "M", "F", "F", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"];
        map[3]   = ["E", "E", "W", "W", "W", "F", "F", "M", "W", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E"];
        map[4]   = ["E", "E", "W", "F", "F", "M", "F", "M", "F", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E"];
        map[5]   = ["W", "W", "W", "F", "W", "F", "W", "W", "F", "W", "E", "E", "W", "W", "W", "W", "W", "W", "E"];
        map[6]   = ["W", "F", "F", "F", "W", "F", "W", "W", "F", "W", "W", "W", "W", "F", "F", "G", "G", "W", "E"];
        map[7]   = ["W", "F", "M", "F", "F", "M", "F", "F", "F", "F", "F", "F", "F", "F", "F", "G", "G", "W", "E"];
        map[8]   = ["W", "W", "W", "W", "W", "F", "W", "W", "W", "F", "W", "P", "W", "F", "F", "G", "G", "W", "E"];
        map[9]   = ["E", "E", "E", "E", "W", "F", "F", "F", "F", "F", "W", "W", "W", "W", "W", "W", "W", "W", "E"];
        map[10]  = ["E", "E", "E", "E", "W", "W", "W", "W", "W", "W", "W", "E", "E", "E", "E", "E", "E", "E", "E"];
    */
    map[0]   = ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"];
    map[1]   = ["W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[2]   = ["W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[3]   = ["W", "F", "F", "F", "F", "F", "F", "W", "W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[4]   = ["W", "F", "F", "F", "F", "F", "F", "W", "G", "M", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[5]   = ["W", "F", "F", "F", "F", "F", "F", "W", "G", "M", "P", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[6]   = ["W", "F", "F", "F", "F", "F", "F", "F", "G", "M", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[7]   = ["W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[8]   = ["W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[9]   = ["W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[10]  = ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"];

    return map;
}

function mapStart() {
    var map = [];

    map[0]   = ["G", "G", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"];
    map[1]   = ["W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[2]   = ["W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[3]   = ["W", "F", "F", "F", "F", "X", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[4]   = ["W", "F", "F", "F", "F", "X", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[5]   = ["W", "F", "F", "F", "F", "X", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[6]   = ["W", "F", "F", "F", "F", "X", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[7]   = ["W", "F", "F", "F", "F", "X", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[8]   = ["W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[9]   = ["W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[10]  = ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"];

    return map;
}

/** 4. Convert Map to object **/

function convertMap(array) {

    for ( i = 0; i < array.length; i++ ) {
        for ( j = 0; j < array[0].length; j++ ) {
            if ( array[i][j] === "W" ) {
                array[i][j] = {model: WALL, status: null};
            } else if ( array[i][j] === "F" ) {
                array[i][j] = {model: FLOOR, status: null};
            } else if ( array[i][j] === "E" ) {
                array[i][j] = {model: EMPTY, status: null};
            } else if ( array[i][j] === "G" ) {
                array[i][j] = {model: GOAL, status: null};
            } else if ( array[i][j] === "X" ) {
                array[i][j] = {model: PRINT, status: null};
            } else if ( array[i][j] === "M" ) {
                array[i][j] = {model: FLOOR, status: MONSTER};
            } else if ( array[i][j] === "P" ) {
                array[i][j] = {model: FLOOR, status: PLAYER};
                getPlayer(map1());
            }
        }
    }
  return array;
}

/** Load map from file **/
