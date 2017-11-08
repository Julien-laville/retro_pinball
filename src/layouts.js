function Ball(pos) {
    ballDef = {
        friction: 0.1,
        restitution: 0.99,
        density: 1,
        userData : {
            draw: function () {
                ctx.beginPath()
                ctx.arc(ball.getPosition().x*SCREEN_SCALE, ball.getPosition().y*SCREEN_SCALE,10, 0, Math.PI*2)
                ctx.fillStyle = "#E2E3E4"
                ctx.fill()
            }
        }
    }

    const ball = world.createDynamicBody(ballDef);
    ball.setBullet(true);
    ball.setPosition(pos);
    ball.createFixture(planck.Circle(0.1), ballDef);
}

function Flipper(pos) {

    const flipperFixture = {
        userData: {
            draw: function () {

            }
        }
    }

    const flipper = world.createDynamicBody(pos);

    flipper.createFixture(planck.Chain(), flipperFixture);

    const flipperJoinFixture = {
        enableMotor : true,
        maxMotorTorque : 1000.0,
        enableLimit : true,
        motorSpeed : 0.0,
        lowerAngle : -30.0 * Math.PI / 180.0,
        upperAngle : 5.0 * Math.PI / 180.0
    }
    const flipperJoint = planck.RevoluteJoint(flipperJoinFixture, flipper, pos);
    world.createJoint(leftJoint);

    return {
        hit : function () {
            
        }
    }
}
