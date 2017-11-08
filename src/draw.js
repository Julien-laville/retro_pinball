base.width = window.innerWidth
base.height = window.innerHeight
const ctx = base.getContext('2d')

function draw() {
    // clear canvas (xem hack)
    base.width += 0
    ctx.transform(1, 0, 0, -1, 0, base.height)

    // draw physics objects
    for (var body = world.getBodyList(); body; body = body.getNext()) {
        for (var fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
            fixture.getUserData().draw()
        }
    }

    // playground
    //playground.draw()


}