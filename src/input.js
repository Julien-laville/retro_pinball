

window.onkeydown = function (e) {
    if(e.keyCode === 1) {
        leftFlipper = true
    }
    if(e.keyCode === 2) {
        leftFlipper = true
    }
    if(e.keyCode === 3) {
        plunger = true
    }
}


window.onkeyup = function (e) {
    if(e.keyCode === 1) {
        leftFlipper = false
    }
    if(e.keyCode === 2) {
        leftFlipper = false
    }
    if(e.keyCode === 3) {
        plunger = false
    }
}