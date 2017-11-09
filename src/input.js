leftFlipperActive = false
rightFlipperActive = false
plungerActive = false

window.onkeydown = function (e) {
    if(e.keyCode === 81) {
        leftFlipperActive = true
    }
    if(e.keyCode === 68) {
        rightFlipperActive = true
    }
    if(e.keyCode === 32) {
        plungerActive = true
    }
}


window.onkeyup = function (e) {
    if(e.keyCode === 81) {
        leftFlipperActive = false
    }
    if(e.keyCode === 68) {
        rightFlipperActive = false
    }
    if(e.keyCode === 32) {
        plungerActive = false
    }
}

function inputPump() {
    if(rightFlipperActive) {
        rightFlipper.hit()
    } else if(!rightFlipperActive) {
        rightFlipper.unhit()
    }
    if(leftFlipperActive) {
        leftFlipper.hit()
    } else if(!leftFlipperActive) {
        leftFlipper.unhit()
    }
    if(plungerActive) {
        plunger.arm()
    } else {
        plunger.release()
    }


}