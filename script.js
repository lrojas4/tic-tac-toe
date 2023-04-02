// TIC-TAC-TOE GAME

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
let message = document.querySelector("#message")

// Player 1 will start with X and player 2 will start with O
const player1 = 'X'
const player2 = 'O'

// Current player 
let currentPlayer = player1

// Tells us if the game is over or not
let gameOver = false

// Tells us if the game ends in a draw or not
let draw = false

// Will check current players turn
function currPlayer() {
    if (currentPlayer == "X") {
        currentPlayer = player2
     } else {
        currentPlayer = player1
     }
}

// Updates scoreboard
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

// If button is clicked it checks for current player, winner, and updates scoreboard
function buttonClicked() {
    for (let i  = 0; i < boardButtons.length; i++) {
        if (this.innerText === "" && !gameOver) {
            this.innerText = currentPlayer

            // Adds style to current player: X's and O's
            this.classList.add(currentPlayer.toLowerCase())

            // Checks for winner
            checkWinner()

            // Updates scoreboard 
            scoreboard()
        
            // Checks for player's turn
            currPlayer()

            // Gives a draw message if all buttons have been clicked
            if (gameOver === false){
                const playersTurnMessage = `It's player ${currentPlayer}'s turn`
                message.innerText = playersTurnMessage 
            }         
        }
    }
}

game()

// Checks for winner
function checkWinner() {
    // Winning message
    const winningMessage =  `Player ${currentPlayer} wins`
    // Checks for horizontal Win
    if (btn1.innerText == currentPlayer && btn2.innerText == currentPlayer && btn3.innerText == currentPlayer && !gameOver) {
        gameOver = true
        message.innerText = winningMessage
        
    } else if (btn4.innerText == currentPlayer && btn5.innerText == currentPlayer && btn6.innerText == currentPlayer && !gameOver) {
        gameOver = true
        message.innerText = winningMessage 
     
    } else if (btn7.innerText == currentPlayer && btn8.innerText == currentPlayer && btn9.innerText == currentPlayer && !gameOver) {
        gameOver = true
        message.innerText = winningMessage

    // Checks for a vertical win
    } else if (btn1.innerText == currentPlayer && btn4.innerText == currentPlayer && btn7.innerText == currentPlayer && !gameOver) {
        gameOver = true;
        message.innerText = winningMessage

    } else if (btn2.innerText == currentPlayer && btn5.innerText == currentPlayer && btn8.innerText == currentPlayer && !gameOver) {
        gameOver = true;
        message.innerText = winningMessage
    
    } else if (btn3.innerText == currentPlayer && btn6.innerText == currentPlayer && btn9.innerText == currentPlayer && !gameOver) {
        gameOver = true;
        message.innerText = winningMessage

    // Checks for a diagonal win
    } else if (btn1.innerText == currentPlayer && btn5.innerText == currentPlayer && btn9.innerText == currentPlayer && !gameOver) {
        gameOver = true;
        message.innerText = winningMessage
       
    } else if (btn3.innerText == currentPlayer && btn5.innerText == currentPlayer && btn7.innerText == currentPlayer && !gameOver) {
        gameOver = true;
        message.innerText = winningMessage
    
    // Checks if game ended in a draw
    } else if (btn1.innerText != "" && btn2.innerText != "" && btn3.innerText != "" && btn4.innerText != "" && btn5.innerText != "" && 
        btn6.innerText != "" && btn7.innerText != "" && btn8.innerText != "" && btn9.innerText != "" ) {
        gameOver = true;
        draw = true
        message.innerText = "Game ended in a draw"
    } else {
        gameOver = false;
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
    }
    currentPlayer = player1
    message.innerText = "Hello, Player X goes first..."
    gameOver = false
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
