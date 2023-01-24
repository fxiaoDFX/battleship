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

    /**
     * placeShip.
     *
     * @param {} ship
     * @param {Number} startPosition is the coordinate where the ship will start from poisitions 0-99
     * @param {Boolean} vertical is the boolean for whether to place to the ship
     * horizontally or vertically
     */
    placeShip(ship, startPosition, vertical = false) {
        if (!(ship instanceof Ship)) throw "Not a ship"
        if (!(startPosition >= 0) || startPosition > 99)
            throw "Invalid start position"

        if (!vertical)
            for (let i = 0; i < ship.length; i++) {
                this.board[startPosition + i].ship = ship
            }
        else {
            for (let i = 0; i < ship.length; i++) {
                this.board[startPosition + i * 10].ship = ship
            }
        }
    }

    receiveAttack(x, y) {
        if (!(x > -1 && x < 100)) throw "Invalid x coordinate"
        if (!(y > -1 && y < 100)) throw "Invalid y coordinate"
        const index = parseInt("" + y + x)

        this.board[index].isShot = true

        return index
    }
}

export default Gameboard
