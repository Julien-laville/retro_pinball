WORLD_STEP = 1/60.0// we will speed up dat shit
FRAME_STEP = 1000/60.0// we will speed up dat shit
PLAYFIELD_ANGLE = 6.5 //degree
SCREEN_SCALE = 20

score = 0


window.onload = init
function init() {

    world = planck.World(new v2d(0,-8))
    world.on('begin-contact', trigger)
    balls = [new Ball(new v2d(15.5,9.1), true), new Ball(new v2d(15.5,9.1), false)]
    rightFlipper = new Flipper(new v2d(11,4), {baseAngle : Math.PI, isClockWise:false})
    leftFlipper = new Flipper(new v2d(4,4), {baseAngle : 0, isClockWise:true})
    plunger = new Plunger(new v2d(15,9))
    mushrooms = [new Mushroom(new v2d(4,11),0.7, 100),new Mushroom(new v2d(8,11),0.7, 100),new Mushroom(new v2d(12,11),0.7, 100)]

    slingShots = [new Slingshots(new v2d(3,7), new v2d(5,5), new v2d(100,100)), new Slingshots(new v2d(9,5), new v2d(11,7), new v2d(-100,100))]
    cannon = new Cannon(new v2d(0, 20, new v2d(2,-2)))

    traps = [new Trap(new v2d(8,17), 2)]

    playground = new Playground()

    // main loop
    setInterval(function() {
        world.step(WORLD_STEP)
        inputPump()
        draw()
    }, FRAME_STEP)
}
