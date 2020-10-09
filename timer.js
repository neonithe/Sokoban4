
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
    gTimer.textContent ="00:00";
    s = 0; m = 0;
}