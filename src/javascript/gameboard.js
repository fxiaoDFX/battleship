import Ship from "./ship"

class Gameboard {
    constructor() {
        this.board = this.initialize()
        this.numberOfShips = 0
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
            throw "Invalid start position, index out of bounds"

        const endPosition = vertical
            ? startPosition + (ship.length - 1) * 10
            : startPosition + ship.length - 1
        // check if coordinate for ship is valid
        if (endPosition > 99)
            throw "Invalid start position, ship end out of bounds"

        if (!vertical)
            for (let i = 0; i < ship.length; i++) {
                // check for existing ship
                if (this.board[startPosition + i].ship !== null)
                    throw "Overlapping ships not allowed"
                this.board[startPosition + i].ship = ship
            }
        else {
            for (let i = 0; i < ship.length; i++) {
                // check for existing ship
                if (this.board[startPosition + i * 10].ship !== null)
                    throw "Overlapping ships not allowed"
                this.board[startPosition + i * 10].ship = ship
            }
        }
        this.numberOfShips++
    }

    receiveAttack(x, y) {
        if (!(x > -1 && x < 100)) throw "Invalid x coordinate"
        if (!(y > -1 && y < 100)) throw "Invalid y coordinate"
        const index = parseInt("" + y + x)

        this.board[index].isShot = true
        if (this.board[index].ship) {
            this.board[index].ship.hit()
            if (this.board[index].ship.isSunk()) {
                this.board[index].ship.sunk = true
                this.numberOfShips--
            }
            return true
        }
        return false
    }

    areAllShipsSunk() {
        return this.numberOfShips === 0 ? true : false
    }

    // methods for testing
    sinkAll() {
        for (const ship of arguments) {
            ship.timesHit = ship.length
            ship.sunk = true
            this.numberOfShips--
        }
    }
}

export default Gameboard
