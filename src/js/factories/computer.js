import Player from "./player"
import Ship from "./ship"

const cpu = new Player("cpu")

function createCpu() {
    return new Player("CPU")
}

// place all ships random
function placeShipRandom() {
    const carrier = new Ship(5)
    const battleship = new Ship(4)
    const cruiser = new Ship(3)
    const sub = new Ship(3)
    const destroyer = new Ship(2)
}

// fire random

// when hit, fire around

export default cpu
