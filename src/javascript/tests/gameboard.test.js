import Gameboard from "../gameboard"
import Ship from "../ship"

let board1
beforeEach(() => {
    board1 = new Gameboard()
})
describe("filled gameboard", () => {
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

    test("(9, 1) should be 19", () => {
        expect(board1.receiveAttack(9, 1)).toBe(19)
    })
})
