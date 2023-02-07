import "../styles/singleplayer-style.css"

const flipButton = document.getElementById("flip-button")
const shipsContainer = document.querySelector(".ships")
const boardsContainer = document.querySelector(".boards.container")

console.log("from single-index.js")

flipButton.addEventListener("click", flip)
document.addEventListener("keypress", (e) => {
    if (e.key === "x") {
        flip()
    }
})

createBoard("player1", "pink")
createBoard("player2")

// ship rotation
let angle = 0
function flip() {
    const ships = Array.from(shipsContainer.children)

    angle = angle === 0 ? 90 : 0
    ships.forEach((ship) => {
        ship.style.transform = `rotate(${angle}deg)`
    })
}

// create boards
function createBoard(user, color = "blue", width = 10) {
    const board = document.createElement("div")
    board.classList.add("board")
    board.id = user
    board.style.backgroundColor = color

    for (let i = 0; i < width * width; i++) {
        const cell = document.createElement("div")
        cell.classList.add("cell")
        cell.setAttribute("id", i)
        board.append(cell)
    }

    boardsContainer.append(board)
}
