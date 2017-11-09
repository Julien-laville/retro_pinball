function Playground() {
    const wallDef = {
        friction: 0.05,
        restitution: 0.98,
        userData : {
            draw : function () {
                ctx.fillStyle = "#345"

                let fixtures = wall.getFixtureList()
                let chain = fixtures.getShape()
                ctx.beginPath()
                let vertices = chain.m_vertices
                ctx.moveTo(vertices[0].x*SCREEN_SCALE, vertices[0].y*SCREEN_SCALE)
                for(let i = 1; i < vertices.length;i ++) {
                    ctx.lineTo(vertices[i].x*SCREEN_SCALE, vertices[i].y*SCREEN_SCALE)
                }
                ctx.fill()
            }
        }
    }
    const wall = world.createBody()
    wall.createFixture(planck.Chain([
        new v2d(8, 0),
        new v2d(16.0, 8.0),
        new v2d(16.0, 20.0),
        new v2d(14.0, 22.0),
        new v2d(0, 22.0),
        new v2d(0, 8.0)
    ], true), wallDef);

    // Bottom

}
