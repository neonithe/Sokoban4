
function createMapMenu(mapNr) {
    return "<tr><td> <button class='mapB' onclick='startGame("+mapNr+")'>Map "+mapNr+"</button> </td></tr>";
}

function mapMenuHtml() {
    let html = "<tr><td> <br> </td></tr><tr><td> <b>MAPS</b> </td></tr><tr><td> <hr> </td></tr>";
    let htmlMenu =
        createMapMenu(1)+
        createMapMenu(2);

    return html+htmlMenu;
}

function returnMap(nr) {
    switch ( nr ) {
        case 1: return map01(); break;
        case 2: return map02(); break;
    }
}

/** Convert maps, get position of player **/

function convertMap(array) {

    for (var i = 0; i < array.length; i++ ) {
        for (var j = 0; j < array[0].length; j++ ) {
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

/** Get position of player **/
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

/** Maps **/

function mapStart() {
    var map = [];

    map[0]   = ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"];
    map[1]   = ["E", "W", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W", "W", "E"];
    map[2]   = ["E", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W", "E"];
    map[3]   = ["E", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W", "E"];
    map[4]   = ["E", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W", "E"];
    map[5]   = ["E", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W", "E"];
    map[6]   = ["E", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W", "E"];
    map[7]   = ["E", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W", "E"];
    map[8]   = ["E", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W", "E"];
    map[9]   = ["E", "W", "W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W", "W", "E"];
    map[10]  = ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"];

    return map;
}

function map01() {

    var map = [];

    map[0]   = ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"];
    map[1]   = ["W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
    map[2]   = ["W", "F", "F", "F", "W", "W", "W", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "W"];
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

function map02() {

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