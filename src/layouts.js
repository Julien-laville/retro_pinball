const FLIPPER_SPEED = 1000
const BALL_SIZE = 0.4
const BALL_TYPE = Symbol()


function Ball(pos, active) {
    const ballDef = {
        friction: 0.2,
        restitution: 0.3,
        density:6,
        userData : {
            type : BALL_TYPE,
            getBall : function () {
                return ball
            },
            draw: function () {
                ctx.beginPath()
                ctx.arc(ball.getPosition().x*SCREEN_SCALE, ball.getPosition().y*SCREEN_SCALE,BALL_SIZE*SCREEN_SCALE, 0, Math.PI*2)
                ctx.fillStyle = "#E2E3E4"
                ctx.fill()
            }
        }
    }

    const ball = world.createDynamicBody()
    ball.setBullet(true)
    ball.setPosition(pos)
    ball.setActive(active)
    ball.createFixture(planck.Circle(BALL_SIZE), ballDef)

    return {
        getBall : function() {
            return ball
        },
        isActive : function () {
            return ball.isActive()
        },
        setActive : function (active) {
            ball.setActive(active)
        },
        launch : function (pos, imoulse) {
            ball.setActive(true)
            ball.setPosition(pos)
            ball.setLinearVelocity(impulse)
        }
    }
}

Ball.get = function () {
    return balls[Ball.position++]
}

Ball.position = 1

function Flipper(pos, options) {

    const flipperFixture = {
        density:0.2,
        userData: {
            draw: function () {
                ctx.fillStyle = "#ac7935"
                let fixtures = flipper.getFixtureList()
                let chain = fixtures.getShape()
                ctx.save()
                ctx.translate(pivot.x*SCREEN_SCALE, pivot.y*SCREEN_SCALE)
                ctx.rotate(flipper.getAngle())
                ctx.translate(-pivot.x*SCREEN_SCALE, -pivot.y*SCREEN_SCALE)

                ctx.beginPath()
                let vertices = chain.m_vertices
                ctx.moveTo((vertices[0].x+pos.x)*SCREEN_SCALE, (vertices[0].y+pos.y)*SCREEN_SCALE)
                for(let i = 1; i < vertices.length;i ++) {
                    ctx.lineTo((vertices[i].x+pos.x)*SCREEN_SCALE, (vertices[i].y+pos.y)*SCREEN_SCALE)
                }
                ctx.fill()

                ctx.restore()

                //show pivot
                ctx.beginPath()
                ctx.fillStyle = "#123"
                ctx.arc(pivot.x*SCREEN_SCALE, pivot.y*SCREEN_SCALE,0.1*SCREEN_SCALE, 0, Math.PI*2)
                ctx.fill()

            }
        }
    }

    const flipper = world.createDynamicBody(pos);

    flipper.setAngle(options.baseAngle)
    flipper.createFixture(planck.Polygon([
        new v2d(0.1,0),
        new v2d(0,0.3),
        new v2d(0.1,0.6),
        new v2d(3,0.4),
        new v2d(3.1,0.2),
        new v2d(3,0),
    ], true), flipperFixture);


    const flipperJoinFixture = {
        enableMotor : true,
        maxMotorTorque : 1000 ,
        enableLimit : true,
        motorSpeed : 0,
        lowerAngle : Math.PI / 180 * -10,
        upperAngle : Math.PI / 180 * 20
    }
    const pivot = pos.clone()
    pivot.add(new v2d(.3,.2))
    const ground = world.createBody(pivot);
    const flipperJoint = planck.RevoluteJoint(flipperJoinFixture, ground, flipper, pivot);
    world.createJoint(flipperJoint);

    return {
        hit : function () {
            flipperJoint.setMotorSpeed(options.isClockWise ? FLIPPER_SPEED : -FLIPPER_SPEED)
        },
        unhit : function () {
            flipperJoint.setMotorSpeed(options.isClockWise ? -FLIPPER_SPEED : FLIPPER_SPEED)
        }
    }
}

function Plunger(pos) {
    let isArmed = false
    const piston = world.createDynamicBody(pos)
    const pistonFixture = {
        fixedRotation : true,

        userData : {
            draw : function () {
                ctx.fillStyle = 'red'
                ctx.fillRect(piston.getPosition().x*SCREEN_SCALE,piston.getPosition().y*SCREEN_SCALE,1*SCREEN_SCALE,0.1*SCREEN_SCALE)
            }
        }
    }

    piston.createFixture(planck.Box(1,0.1), pistonFixture)
    const ground = world.createBody(pos);
    const spring = world.createJoint(planck.PrismaticJoint({
        maxMotorForce: 1000.0,
        lowerTranslation : -1.0,
        upperTranslation : 0.0,
        enableLimit : true,
        enableMotor: true,
        motorSpeed : 0
    }, ground, piston, new v2d(0.0, 17.0), new v2d(0.0, 1.0)));
    return {
        arm : function () {
            spring.setMotorSpeed(-1)
            isArmed = true
        },
        release : function () {
            if(isArmed) {
                spring.setMotorSpeed(100)
            }
        }
    }
}


function Slingshots(a,b, pulse) {
    const edgeFixture = {
        userData : {
            draw : function () {
                ctx.fillStyle = 'orange'

                ctx.beginPath()
                ctx.moveTo(a.x*SCREEN_SCALE,a.y*SCREEN_SCALE)
                ctx.lineTo(b.x*SCREEN_SCALE,b.y*SCREEN_SCALE)

                ctx.lineWidth = 4
                ctx.stroke()
                ctx.strokeStyle = "green"


                ctx.beginPath()
                ctx.arc(a.x*SCREEN_SCALE,a.y*SCREEN_SCALE,3,0,2*Math.PI)
                ctx.fill()
                ctx.beginPath()
                ctx.arc(b.x*SCREEN_SCALE,b.y*SCREEN_SCALE,3,0,2*Math.PI)
                ctx.fill()
            },
            touch : function (contact, ball) {
                ball.applyLinearImpulse(pulse, ball.getWorldCenter())
            }
        }
    }

    

    const edge = world.createBody()
    edge.createFixture(planck.Edge(a,b),edgeFixture)
}



function Trap(pos, size, time) {
    const trapBody = world.createBody(pos)

    const trapDef = {
        isSensor : true,
        shape : planck.Circle(size),
        userData : {
            draw : function () {
                ctx.strokeStyle = "#fff"
                ctx.beginPath()
                ctx.arc(pos.x*SCREEN_SCALE,pos.y*SCREEN_SCALE,size*SCREEN_SCALE,0,2*Math.PI)
                ctx.stroke()
            },
            touch : function (contact, ball) {
                ball.setActive(false)
            }
        }
    }
    trapBody.createFixture(trapDef)
}

function Switch(pos) {
    let client = null


    const switchBody = world.createBody(pos)

    const switchDef = {
        isSensor : true,
        shape : planck.Circle(5),
        userData : {
            draw : function () {
                ctx.strokeStyle = "blue"
                ctx.beginPath()
                ctx.arc(pos.x*SCREEN_SCALE,pos.y*SCREEN_SCALE,size*SCREEN_SCALE,0,2*Math.PI)
                ctx.stroke()
            },
            touch : function (contact, ball) {
                client.trigger()
            }
        }
    }
    switchBody.createFixture(switchDef)

    return {
        register : function (c) {
            client = c
        }
    }
}

function Cannon(pos, impulse) {

    let ball = null
    return {
        fire : function () {
            ball = Ball.get()
            ball.launch(pos, impulse)
        }
    }
}

function Mushroom(pos, size, force) {
    let normale = new v2d()
    const mushroomDef = {
        userData : {
            draw : function () {
                ctx.beginPath()
                ctx.arc(pos.x*SCREEN_SCALE,pos.y*SCREEN_SCALE,size*SCREEN_SCALE,0,2*Math.PI)
                ctx.fillStyle = 'white'
                ctx.fill()
            },
            touch : function (contact, ball) {
                normale.set(ball.getPosition())
                normale.sub(pos)
                normale.clamp()
                normale.mul(force)
                ball.applyLinearImpulse(normale, ball.getWorldCenter())
            }
        }
    }
    const mushroom = world.createBody(pos)
    mushroom.createFixture(planck.Circle(size), mushroomDef)

}