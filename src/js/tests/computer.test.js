import Player from "../player"
import cpu from "../computer"

it("name is cpu", () => {
    expect(cpu).toBeInstanceOf(Player)
})

it("has 5 ships", () => {
    expect(cpu.ships.length).toBe(5)
    expect(board1.numberOfShips).toBe(5)
})

it("cpu has fired 1 shot", () => {
    expect(cpu.shotsFired.length).toBe(1)
})
