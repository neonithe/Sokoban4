
let PLAYERIMG   = "<img src='img/playerR.png'>";
let MONSTERIMG  = "<img src='img/monster.png'>";

const MOVR = "<img src='img/playerR.png' width='47' height='47'>";
const MOVL = "<img src='img/playerL.png' width='47' height='47'>";
const MOVD = "<img src='img/playerD.png' width='47' height='47'>";
const MOVU = "<img src='img/playerU.png' width='47' height='47'>";

/** Save end result to variable **/
let countV = 0;
let timeV = 0;

/** Game end message to modal **/
let gEnd;

/** TO HTML **/
const count = document.getElementById("count");

/** Use arrow keys and w,a,s,d to move player **/
window.addEventListener("keydown", function(event) {
    const i = pPos.i;
    const j = pPos.j;

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

/** Move player with game rules **/
function move(i,j) {

    const iD = i - pPos.i;
    const jD = j - pPos.j;
    let canMove = true;

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
    let cell;
    let inGame = true;

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
    for(let k = 0; k < gameMap.length; k++ ) {
        for(let l = 0; l < gameMap[0].length; l++ ) {
            cell = gameMap[k][l];
            if ( cell.model === GOAL && cell.status !== MONSTER )  inGame = false;
        }
    }
    if ( inGame ) {
        openModal("<p><b>YOU ARE A WINNER</b></p><br><p><b>Moves:"+countV+" || Timer: "+timeV+"</b></p>");
        stop();
        pPos.i = 0;
        pPos.j = 0;
        gEnd = true;
    }
}

