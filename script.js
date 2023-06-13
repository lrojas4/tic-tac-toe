// TIC-TAC TOE GAME

// Board buttons
const btn1 = document.querySelector("#btn1")
const btn2 = document.querySelector("#btn2")
const btn3 = document.querySelector("#btn3")
const btn4 = document.querySelector("#btn4")
const btn5 = document.querySelector("#btn5")
const btn6 = document.querySelector("#btn6")
const btn7 = document.querySelector("#btn7")
const btn8 = document.querySelector("#btn8")
const btn9 = document.querySelector("#btn9")

// Array of board buttons
const boardButtons = [...document.querySelectorAll(".board-rows > td")]

// Scoreboard values
let player1Score = document.querySelector("#player1Score")
let player2Score = document.querySelector("#player2Score")

// Stores messages to Players
let message = document.querySelector("p")

// Player 1 will start with X and player 2 will start with O
const player1 = 'X'
const player2 = 'O'

// Current player 
let currentPlayer = player1

// Tells us if the game is over or not
let gameOver = false

// Tells us if there is a winner
let winner = false

// Tells us if the game ends in a draw or not
let draw = false

// Tells us the number of buttons taken
let btnsTaken = 0

// Will check current players turn
function currPlayer() {
    if (currentPlayer == "X") {
        currentPlayer = player2
     } else {
        currentPlayer = player1
     }
}

// Scoreboard
function scoreboard () {
    if(gameOver === true && draw === false) {
        if (currentPlayer === player1) {
            player1Score.innerText = parseInt(player1Score.innerText) + 1
        } else if (currentPlayer === player2) {
            player2Score.innerText = parseInt(player2Score.innerText) + 1
        } else {
            return
        }
    }
}

// Adds event listener to each button in the board 
const game = () => {
    boardButtons.forEach(button => button.addEventListener('click', buttonClicked))
}

// If button is clicked it checks for current player, winner, draw, and updates scoreboard
function buttonClicked() {
    for (let i  = 0; i < boardButtons.length; i++) {
        if (this.innerText === "" && !gameOver) {
            this.innerText = currentPlayer

            // Adds style to current player: X's and O's
            this.classList.add(currentPlayer.toLowerCase())

            // Checks for winner
            checkWinner()
            
            // Checks for a draw
            isDraw()

            // Updates scoreboard 
            scoreboard()
        
            // Checks for players turn
            currPlayer()

            // Adds event listener to each button in the board and styles players turn messages
            if (gameOver === false) {
                const playersTurnMessage = `It's player ${currentPlayer}'s turn`
                message.innerText = playersTurnMessage
                if (currentPlayer === player1) {
                    message.classList.remove("player2")
                    message.classList.add("player1")
                } else if(currentPlayer === player2) {
                    message.classList.remove("player1")
                    message.classList.add("player2")
                } 
            }      
        }
    }
}

game()

// Winning possibilities
const winningPos = [
    // Horizontal win id's
    [btn1, btn2, btn3], [btn4, btn5, btn6], [btn7, btn8,btn9],
    // Vertical win id's
    [btn1, btn4, btn7], [btn2, btn5, btn8], [btn3, btn6, btn9],
    // Diagonal win id's
    [btn1, btn5, btn9], [btn3, btn5, btn7]
]

// Checks for winner
function checkWinner() {
    const winningMessage =  `Player ${currentPlayer} wins`
    for (let i = 0; i < winningPos.length; i++) {
        // Checks for horizontal, vertical and diagonal wins
        if(winningPos[i][0].innerText == currentPlayer && 
            winningPos[i][1].innerText == currentPlayer && 
            winningPos[i][2].innerText == currentPlayer && !gameOver) {
            winningPos[i][0].classList.add("win")
            winningPos[i][1].classList.add("win")
            winningPos[i][2].classList.add("win") 
            gameOver = true
            winner = true
            message.innerText = winningMessage
        }
    }
}

// Checks for a draw in the game
function isDraw() {
    btnsTaken = 0
    for (let i = 0; i < boardButtons.length; i++) {
        if(boardButtons[i].innerText != "") {
            btnsTaken += 1
        } 
    }
    if (btnsTaken == 9 && !winner) {
        gameOver = true
        draw = true
        message.classList.remove("player1")
        message.innerText = "It's a tie!"
    }
}

// Reset board button
const resetBoardBtn = document.querySelector('#reset-board')

// Resets Board
function resetBoard() {
    for (let i = 0; i < boardButtons.length; i++) {
        boardButtons[i].innerText = ""
        boardButtons[i].classList.remove("x")
        boardButtons[i].classList.remove("o")
        boardButtons[i].classList.remove("win")
    }
    currentPlayer = player1
    message.classList.remove("player1")
    message.classList.remove("player2")
    message.innerText = "Hello, Player X goes first..."
    gameOver = false
    winner = false
    draw =false
    btnsPushed = []
    btnsTaken = 0
}

// Adds event listener when the Reset Board button is clicked
resetBoardBtn.addEventListener('click', resetBoard)

// Reset scoreboard button
const resetScoreboardBtn = document.querySelector('#reset-scoreboard')

// Resets scoreboard values
function resetScoreboard() {
   player1Score.innerText = 0
   player2Score.innerText = 0
}

// Adds event listener when the Reset Scoreboard button is clicked
resetScoreboardBtn.addEventListener("click", resetScoreboard)