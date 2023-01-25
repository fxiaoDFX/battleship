import Gameboard from "./gameboard"

class Player {
    constructor(name) {
        this.name = name
        this.gameboard = new Gameboard()
        this.ships = []
    }

    fire(x, y, targetPlayer) {
        const targetGameboard = targetPlayer.gameboard
        return targetGameboard.receiveAttack(x, y)
    }
}

export default Player
