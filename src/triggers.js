fixtureA = null
fixtureB = null
function trigger(contact) {
    const fixtureA = contact.getFixtureA()
    const fixtureB = contact.getFixtureB()

    if(fixtureA.getUserData && fixtureA.getUserData().touch) {
        if(fixtureB.getUserData().type === BALL_TYPE)
            fixtureA.getUserData().touch(contact, fixtureB.getUserData().getBall())
    }

    if(fixtureB.getUserData && fixtureB.getUserData().touch) {
        if(fixtureA.getUserData().type === BALL_TYPE)
            fixtureB.getUserData().touch(contact, fixtureA.getUserData().getBall())
    }
}
