import Ship from "../ship"

let destroyer = null
beforeEach(() => {
    destroyer = new Ship(2)
})

test("ship length is 2", () => {
    expect(destroyer.length).toEqual(2)
})

test("is hit once", () => {
    destroyer.hit()
    expect(destroyer.timesHit).toEqual(1)
})

test("is not sunk", () => {
    expect(destroyer.isSunk()).toBe(false)
})

test("is sunk", () => {
    destroyer.hit()
    destroyer.hit()
    expect(destroyer.isSunk()).toBe(true)
})
