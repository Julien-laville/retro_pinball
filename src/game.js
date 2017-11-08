WORLD_STEP = 1/60.0// we will speed up dat shit
FRAME_STEP = 1000/60.0// we will speed up dat shit
PLAYFIELD_ANGLE = 6.5 //degree
SCREEN_SCALE = 20

leftFlipper = false
rightFlipper = false
plunger = false

window.onload = init
function init() {




    world = planck.World(new v2d(0,-10))
    balls = [new Ball(new v2d(9,14))]
    playground = new Playground()

    // main loop
    setInterval(function() {
        world.step(WORLD_STEP)
        draw()
    }, FRAME_STEP)
}
