const FLIPPER_SPEED = 1000
const BALL_SIZE = 0.4

function Ball(pos) {
    ballDef = {
        friction: 0.2,
        restitution: 0.6,
        density: 1,
        userData : {
            draw: function () {
                ctx.beginPath()
                ctx.arc(ball.getPosition().x*SCREEN_SCALE, ball.getPosition().y*SCREEN_SCALE,BALL_SIZE*SCREEN_SCALE, 0, Math.PI*2)
                ctx.fillStyle = "#E2E3E4"
                ctx.fill()
            }
        }
    }

    const ball = world.createDynamicBody();
    ball.setBullet(true);
    ball.setPosition(pos);
    ball.createFixture(planck.Circle(BALL_SIZE), ballDef);
}

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


function Slingshots() {



    return {

    }
}

function Target() {


    return {

    }
}


function Trap() {

}

function Switch() {

}