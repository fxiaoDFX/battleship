import Gameboard from "../gameboard"
import Ship from "../ship"

let board1
describe("filled gameboard", () => {
    beforeEach(() => {
        board1 = new Gameboard()
    })

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
})

describe("placing ships", () => {
    beforeEach(() => {
        const destroyer = new Ship(2)
        board1.placeShip(destroyer, 0)
    })

    test("destroyer placed in 0,0", () => {
        expect(board1.board[0].ship).toBeInstanceOf(Ship)
    })
})
