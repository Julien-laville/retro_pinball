const HANDLE_SIZE = 10
const mousePos = new v2d()
let chain = []
let isMove = false
let pointMove = null
function Editor() {

    this.chains = []
    this.canAddPoint = false
    base.addEventListener('mousedown', (e) => {
        this.checkMove.call(this,e)
    })
    base.addEventListener('mouseup', (e) => {
        this.endCheckMove.call(this,e)
    })
    base.addEventListener('click', (e) => {
        this.addPoint.call(this,e)
    })

    base.addEventListener('contextmenu', (e) => {
        this.stopPlayGround.call(this,e)
        e.preventDefault()
    })
    base.addEventListener('mousemove', (e) => {
        mousePos.set(e.pageX,base.height -  e.pageY)
    })
}

Editor.prototype.beginPlayground = function() {
    chain = []
    this.canAddPoint = true
}

Editor.prototype.stopPlayGround = function () {
    this.canAddPoint = false
    this.chains.push(chain)
}

Editor.prototype.addPoint = function (e) {
    if(this.canAddPoint && MODE === EDITOR_MODE)
        chain.push(new v2d(e.pageX,base.height - e.pageY))
}

Editor.prototype.draw = function () {
    for(var i = 0; i < this.chains.length; i++) {
        for(var j = 0; j < this.chains[i].length; j++) {
            point = this.chains[i][j]
            ctx.beginPath()
            ctx.arc(point.x, point.y, HANDLE_SIZE, 0, 2*Math.PI)
            ctx.fill()
            ctx.beginPath()
            ctx.arc(point.x, point.y, 3, 0, 2*Math.PI)
            ctx.fill()
        }

        ctx.beginPath()
        point = this.chains[i][0]
        ctx.moveTo(point.x,point.y)
        for(let j = 0; j < this.chains[i].length; j++) {
            point = this.chains[i][j]
            ctx.lineTo(point.x,point.y)
        }
        ctx.closePath()
        ctx.stroke()
    }
    if(chain.length > 0) {
        for(let i = 0; i < chain.length; i++) {
            point = chain[i]
            ctx.beginPath()
            ctx.arc(point.x, point.y, 3, 0, 2*Math.PI)
            ctx.fill()
        }
        ctx.beginPath()
        point = chain[0]
        ctx.moveTo(point.x,point.y)
        for(let i = 0; i < chain.length; i++) {
            point = chain[i]
            ctx.lineTo(point.x,point.y)
        }
        ctx.stroke()
    }
    this.movePoint()

}

Editor.prototype.checkMove = function (e) {
    if(MODE === EDITOR_MODE) {
        for(let i = 0; i < this.chains.length; i ++) {
            for(let j = 0; j < this.chains[i].length; j ++) {
                let dot = this.chains[i][j]
                if(new v2d(e.pageX, base.height-e.pageY).sub(dot).length() < HANDLE_SIZE) {
                    isMove = true
                    pointMove = dot
                }
            }
        }
    }
}

Editor.prototype.movePoint = function() {
    if(isMove === true) {
        pointMove.set(mousePos)
    }

}

Editor.prototype.endCheckMove = function () {
    isMove = false
    pointMove = false
}




