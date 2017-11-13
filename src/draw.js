base.width = window.innerWidth
base.height = window.innerHeight
const ctx = base.getContext('2d')

function draw() {
    // clear canvas (xem hack)
    base.width += 0
    // reverse y axis
    ctx.transform(1, 0, 0, -1, 0, base.height)
    // draw physics objects
    for (var body = world.getBodyList(); body; body = body.getNext()) {
        for (var fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
            fixture.getUserData().draw()
        }
    }
    if(MODE === EDITOR_MODE) {
        editor.draw()
    }
}


HOME_PAGE = Symbol()
MENU_PAGE = HOME_PAGE

current = 0
keyAvailable = true
function drawMenu() {
    base.width += 0
    ctx.fillStyle="#07090c"
    ctx.fillRect(0,0, base.width, base.height)

    ctx.fillStyle="#fff"
    ctx.font = '30px serif'
    ctx.fillText('Editor', 300,300)
    ctx.fillText('Play', 300,350)

    ctx.fillRect(270, current*50+300-20, 20,20)
    if((up || down) && keyAvailable) {
        keyAvailable = false
        setTimeout(function () {
            keyAvailable = true
        },300)
        current++
        current = current%2
    }
    if(plungerActive) {
        if(current%2 === 1) {
            MODE = GAME_MODE
        } else if(current%2 === 0) {
            MODE = EDITOR_MODE
        }
    }
}