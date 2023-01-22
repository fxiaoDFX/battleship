import createShip from "../ship"

test("null ship", () => {
    expect(createShip()).toBeNull()
})

describe("properties of ship object", () => {
    const ship = createShip(3)

    test("ship length is 3", () => {
        expect(ship.length).toBe(3)
    })

    test("ship hit is 0", () => {
        expect(ship.timesHit).toBe(0)
    })

    test("ship hit is 1", () => {
        ship.hit()
        expect(ship.timesHit).toBe(1)
    })

    test("is sunk false", () => {
        expect(ship.sunk).toBeFalsy()
    })

    test("is sunk true", () => {
        ship.hit(5)
        expect(ship.isSunk()).toBeTruthy()
    })

    test("number of hits is 6", () => {
        expect(ship.getHits()).toBe(6)
    })
})
