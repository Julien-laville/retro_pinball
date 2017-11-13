GAME_MODE = Symbol()
EDITOR_MODE = Symbol()
MENU_MODE = Symbol()
WORLD_STEP = 1/60.0// we will speed up dat shit
FRAME_STEP = 1000/60.0// we will speed up dat shit
MODE = MENU_MODE

editor = new Editor()


function loop() {

    // main loop
    setInterval(function() {
        if(MODE === GAME_MODE) {
            world.step(WORLD_STEP)
            inputPump()
            draw()
        } else if(MODE === EDITOR_MODE) {
            draw()
        } else {
            drawMenu()
        }

    }, FRAME_STEP)
}
