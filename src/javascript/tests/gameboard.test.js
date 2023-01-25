import Gameboard from "../gameboard"
import Ship from "../ship"

let board1
beforeEach(() => {
    board1 = new Gameboard()
})
describe("fill gameboard", () => {
    test("gameboard 100 cells", () => {
        expect(board1.board.length).toEqual(100)
    })

    test("board cells contains ship : null and isShot : false", () => {
        board1.board.forEach((cell) => {
            expect(cell).toHaveProperty("ship", null)
            expect(cell).toHaveProperty("isShot", false)
        })
    })
})

describe("throw errors", () => {
    test("throw for invalid ship", () => {
        expect(() => {
            board1.placeShip()
        }).toThrow(new Error("Not a ship"))
    })

    test("throw an error for no start position", () => {
        const destroyer = new Ship(2)
        expect(() => {
            board1.placeShip(destroyer)
        }).toThrow()
    })

    test("position 100 is invalid", () => {
        const destroyer = new Ship(2)
        expect(() => {
            board1.placeShip(destroyer, 100)
        }).toThrow("Invalid start position")
    })
})

describe("place a destroyer", () => {
    const destroyer = new Ship(2)

    test("destroyer placed in 0,0 horizontal", () => {
        board1.placeShip(destroyer, 0)
        expect(board1.board[0].ship).toBeInstanceOf(Ship)
        expect(board1.board[1].ship).toBeInstanceOf(Ship)
    })

    test("destroyer placed in 1,0 vetical", () => {
        board1.placeShip(destroyer, 1, true)
        expect(board1.board[1].ship).toBeInstanceOf(Ship)
        expect(board1.board[11].ship).toBeInstanceOf(Ship)
    })
})

describe("place a carrier", () => {
    const carrier = new Ship(5)

    test("carrier placed in 0,0 horizontal", () => {
        board1.placeShip(carrier, 0)
        for (let i = 0; i < 5; i++) {
            expect(board1.board[i].ship).toBeInstanceOf(Ship)
        }
    })

    test("carrier placed in 2,0 vetical", () => {
        board1.placeShip(carrier, 2, true)
        for (let i = 0; i < 5; i++) {
            expect(board1.board[i * 10 + 2].ship).toBeInstanceOf(Ship)
        }
    })
})

describe("receiveAttack()", () => {
    test("throw error invalid x coordinate", () => {
        expect(() => {
            board1.receiveAttack(-1, 0)
        }).toThrow()
    })

    test("throw error invalid y coordinate", () => {
        expect(() => {
            board1.receiveAttack(1, 100)
        }).toThrow()
    })

    test("(9,9) is attacked", () => {
        board1.receiveAttack(9, 9)
        expect(board1.board[99].isShot).toBeTruthy()
    })

    test("ship at (0,0) is hit", () => {
        const sub = new Ship(3)
        board1.placeShip(sub, 0)
        board1.receiveAttack(0, 0)
        expect(board1.board[0].ship.timesHit).toBe(1)
        expect(board1.board[1].ship.timesHit).toBe(1)
        expect(board1.board[2].ship.timesHit).toBe(1)
        expect(board1.board[3].ship).toBeNull()
    })

    test("sub sunk when hit 3 times", () => {
        const sub = new Ship(3)
        board1.placeShip(sub, 0)
        board1.receiveAttack(0, 0)
        board1.receiveAttack(1, 0)
        board1.receiveAttack(2, 0)
        expect(board1.board[0].ship.sunk).toBeTruthy()
        expect(board1.board[1].ship.sunk).toBeTruthy()
        expect(board1.board[2].ship.sunk).toBeTruthy()
        expect(board1.board[10].ship).toBeNull()
    })
})

describe("areAllShipsSunk()", () => {
    const destroyer = new Ship(2)
    const sub = new Ship(3)

    beforeEach(() => {
        board1.placeShip(destroyer, 0)
        board1.placeShip(sub, 10, true)
    })

    test("not all ships sunk", () => {
        expect(board1.areAllShipsSunk()).toBeFalsy()
    })

    test("all ships sunk", () => {
        expect(board1.numberOfShips).toBe(2)
        board1.receiveAttack(0, 0)
        board1.receiveAttack(1, 0)
        board1.receiveAttack(0, 1)
        board1.receiveAttack(0, 2)
        board1.receiveAttack(0, 3)
        expect(board1.areAllShipsSunk()).toBeTruthy()
        expect(board1.numberOfShips).toBe(0)
    })
})
