
/** HTML **/
const gTimer = document.getElementById("timeCount");


/** Modal function **/

var modal = document.getElementById("myModal");

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

/** Timer function **/

var s = 0;
var m = 0;
var t = 0;

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
   // gTimer.textContent ="00:00";
    s = 0; m = 0;
}