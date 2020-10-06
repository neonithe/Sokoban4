
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

// Timer
var s = 0;
var m = 0;
var t = 0;

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

/** Start Page **/
function startPage() {
    stop();
    reset();
    count.innerHTML = 0;
    countV = 0;
    whatMap.innerHTML = "START PAGE";
    message.innerHTML = "Click one of the maps to start the game";
    gameMap = convertMap(mapStart());
    createBoard();
}

startPage();

/** Game Menu **/
function startGame(map) {
    switch ( map ) {
        case 1:
            startTable(map);
            gameMap = convertMap(map1());
            getPlayer(map1());
        break;
        case 2:
            startTable(map);
            gameMap = convertMap(map2());
            getPlayer(map2());
        break;
    }
}

function startTable(nr) {
    stop();
    reset();
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

/** TIMER **/
function runTime() {
    s++;
    if ( s >= 60 ) { s = 0; m++; }
    timeV = (m > 9 ? m : "0" + m) + ":" + (s > 9 ? s : "0" + s);
    gTimer.innerHTML = timeV;
    timer();
}
function timer() {
    t = setTimeout(runTime, 1000);
}
function stop() {
    clearTimeout(t);
}
function reset() {
    stop();
    gTimer.textContent ="00:00";
    s = 0; m = 0;
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
        openModal("<p>YOU ARE A WINNER</p><br><p>Moves:"+countV+" || Timer: "+timeV+"</p>");
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
        case 37: // Vänster
            PLAYERIMG = MOVL;
            move(i, j-1);
            break;
        case 38: // Upp
            PLAYERIMG = MOVU;
            move(i-1, j);
            break;
        case 39: // Höger
            PLAYERIMG = MOVR;
            move(i, j+1);
            break;
        case 40: // Ner
            PLAYERIMG = MOVD;
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

/** Modal window ********************************************/
function closeModal() {
    if ( gEnd ) {
        startPage();
    }
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
    }
}



/**  1. Create HTML, 2. Player position, 3. Maps, 4. Convert Map   ***********************************************/

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

/** 2. Get position of player **/
function getPlayer(array) {
    for (var i = 0; i < array.length; i++ ) {
        for (var j = 0; j < array[0].length; j++ ) {
            if ( array[i][j] === "P" ) {
                pPos.i = i; pPos.j = j;
            }
        }
    }
    createBoard();
}

/** 3. MAPS     M = Monster | P = PLayer | W = Wall | F = Floor | G = Goal      **/
function map1() {

    var map = [];

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

function map2() {
    var map = [];

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

    return map;
}

function mapStart() {
    var map = [];

    map[0]   = ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"];
    map[1]   = ["W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[2]   = ["W", "F", "W", "W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W", "W", "F", "W"];
    map[3]   = ["W", "F", "W", "M", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "M", "W", "F", "W"];
    map[4]   = ["W", "F", "W", "M", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "M", "W", "F", "W"];
    map[5]   = ["W", "F", "W", "M", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "M", "W", "F", "W"];
    map[6]   = ["W", "F", "W", "M", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "M", "W", "F", "W"];
    map[7]   = ["W", "F", "W", "M", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "M", "W", "F", "W"];
    map[8]   = ["W", "F", "W", "W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W", "W", "F", "W"];
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
            }
        }
    }
  return array;
}


/** Load map from file **/
