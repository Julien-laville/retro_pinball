function Light(pos, active) {
    let isActive = active
    return {
        trigger: function (active) {
            isActive = active
        },
        draw : function () {
            ctx.fillStyle = isActive ? "white" : "black"
            ctx.beginPath()
            ctx.arc(pos.x*SCREEN_SCALE, pos.y*SCREEN_SCALE, 10, 0, 2*Math.PI)
            ctx.fill()
        }
    }
}