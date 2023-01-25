import Player from "../player"
import Gameboard from "../gameboard"
import Ship from "../ship"

let p1
let p2
beforeEach(() => {
    p1 = new Player("Vi")
    p2 = new Player("Mii")
})
describe("create Player", () => {
    test("player name is Vi", () => {
        expect(p1.name).toBe("Vi")
    })

    test("each player has a gameboard", () => {
        expect(p1.gameboard).toBeInstanceOf(Gameboard)
        expect(p2.gameboard).toBeInstanceOf(Gameboard)
    })
})

describe("player can attack other player", () => {
    test("p1 fires at p2", () => {
        p1.fire(0, 0, p2)
        expect(p2.gameboard.board[0].isShot).toBeTruthy()
    })

    it("p1 fires and misses", () => {
        expect(p1.fire(0, 0, p2)).toBeFalsy()
    })

    it("p1 fires and hits", () => {
        p2.gameboard.placeShip(new Ship(2), 0)
        expect(p1.fire(0, 0, p2)).toBeTruthy()
    })
})
