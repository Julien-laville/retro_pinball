function Editor() {
    const chains = []
    const chain = []
    base.addEventListener('mousedown', this.checkMove)
    base.addEventListener('mouseup', this.endCheckMove)
    return {
        beginPlayground : function() {
            chain.length = 0
            base.addEventListener('click', this.addPoint)
        },
        stopPlayGround : function () {
            chains.push(chain)
        },
        addPoint : function (e) {
            chain.push(new v2d(e.mouseX,e.mouseY))
        },
        draw : function () {
            for(var i = 0; i < chains.length; i++) {
                for(var j = 0; j < chains[i].length; j++) {
                    point = chains[i][j]
                    ctx.beginPath()
                    ctx.arc(point.x, point.y, 9, 0, Math.PI)
                    ctx.fill()
                    ctx.beginPath()
                    ctx.arc(point.x, point.y, 3, 0, Math.PI)
                    ctx.fill()
                }
            }
        },
        checkMove : function (e) {
            for(let i = 0; i < chains.length; i ++) {
                for(let j = 0; j < chains[i].length; j ++) {

                }
            }
            if(e.mouseX, e.mouseY) {

            }
        },
        endCheckMove : function () {
            
        }
    }
}




