import Ship from "./ship"

class Gameboard {
    constructor() {
        this.board = this.initialize()
    }

    initialize() {
        const board = []

        for (let i = 0; i < 100; i++) {
            board.push({ ship: null, isShot: false })
        }
        return board
    }

    placeShip(ship, startPosition, vertical = false) {
        if (!(ship instanceof Ship)) throw "Not a ship"
        if (!(startPosition >= 0)) throw "Invalid start position"
        const endPosition = vertical
            ? startPosition + ship.length * 10
            : startPosition + ship.length - 1
        this.board[startPosition].ship = ship
        this.board[endPosition].ship = ship
    }
}

export default Gameboard
