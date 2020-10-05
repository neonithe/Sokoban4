

var gameMap = map1();
var pPosI = 0;
var pPosJ = 0;

getPlayer(map1());
var pPos = {i:pPosI, j:pPosJ};


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

/** Create HTML table **/
function createBoard() {
    var printBoard = document.getElementById("gameMap");
    var html = "";
    var cell = "";

    for (var i = 0; i < gameMap.length; i++) {
        html = html + "<tr>";
        for (var j = 0; j < gameMap[0].length; j++ ){
            cell = gameMap[i][j];
            html = html + "<td>" + cell + "</td>";
        }
        html = html + "</tr>";
    }
    printBoard.innerHTML = html;
}

/** Get position of player **/
function getPlayer(array) {
    for (var i = 0; i < array.length; i++ ) {
        for (var j = 0; j < array[0].length; j++ ) {
            if ( array[i][j] === "P" ) {
                pPosI = i; pPosJ = j;
            }
        }
    }
}

/** Map with the GOALS **/
function goalMap(array) {
    var arr = new Array(gameMap.length);

    for (var i=0; i < arr.length; i++) {
        arr[i] = new Array(gameMap[0].length);
    }
    for (var i=0; i < arr.length; i++ ) {
        for (var j=0; j < arr[0].length; j++ ) {
            if ( array[i][j] === "G" ) {
                arr[i][j] = "G";
            }
        }
    }
    return arr;
}

/** Check if MONSTER is in goal area **/
function checkVic(arr) {
    var test =0;
    var test2 =0;

    for(var ii =0; ii < arr.length; ii++) {
       for(var jj =0; jj < arr[0].length; jj++) {
           if ( gameMap[ii][jj] === "F" && arr[ii][jj] === "G") {
               gameMap[ii][jj] = "G";
           }
           if ( arr[ii][jj] === "G") {
               test++;
           }
           if ( arr[ii][jj] === "G" && gameMap[ii][jj] === "M" ) {
               test2++;
           }
       }
    }
    if ( test === test2 ) {
    console.log("Game");
    }
}

/** Move player with game rules [WALL] [MOVE MONSTER] **/
function move(i,j) {

    var iD = i - pPos.i;
    var jD = j - pPos.j;

    var canMove = true;

    if ( gameMap[i][j] !== "W") {
        if ( gameMap[i][j] === "M" ) {
            if ( gameMap[i+iD][j+jD] !== "W" && gameMap[i+iD][j+jD] !== "M"){
                 gameMap[i+iD][j+jD] = "M";
                canMove = true;
            } else {
                canMove = false;
            }
        }
        if ( canMove ) {
            gameMap[pPos.i][pPos.j] = "F";
            pPos.i = i;
            pPos.j = j;
            gameMap[pPos.i][pPos.j] = "P";
            checkVic(goalMap(map1()));
            createBoard();


        }
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

createBoard();