class Player{
    constructor(playerName, playerToken){
        this.playerName = playerName,
        this.playerToken = playerToken
    }
}

const playerX = new Player("Player X", "X")
const playerO = new Player("Player O", "O")


class GameBoard{
    constructor(){
        this.WIDTH = 3
        this.HEIGHT = 3
        this.gameboard = []
        }
    resetBoard = function(){
        for (let i = 0; i < this.WIDTH; i ++){
            this.gameboard[i] = []
            for (let j = 0; j < this.HEIGHT; j++){
                this.gameboard[i][j] = "";
            }
        }
    }
    getBoard = function(){
        return this.gameboard
    }
    modifyBoard = function(currentPlayer, width, height){
        if (this.checkCellIsEmpty(width, height) === true){
            this.gameboard[width][height] = currentPlayer.playerToken
        } else {
            alert("invalid move")
        }
    }
    checkWin = function(){
        let isWinner = false
        function checkForWin(cell1, cell2, cell3){
            if (cell1 != "" && cell1 === cell2 && cell2 === cell3 ){
                isWinner = true;
            }
        }
        // horizontals
        for (let i = 0; i < this.WIDTH; i++){
            checkForWin (this.gameboard[i][0], this.gameboard[i][1], this.gameboard[i][2])
        }
        // verticals
        for (let i = 0; i < this.HEIGHT; i++){
            checkForWin (this.gameboard[0][i], this.gameboard[1][i], this.gameboard[2][i])
        }
        // diagonals
        checkForWin (this.gameboard[0][0], this.gameboard[1][1], this.gameboard[2][2])
        checkForWin (this.gameboard[2][0], this.gameboard[1][1], this.gameboard[0][2])

        return isWinner
    }
    logBoard = function(){
        console.log(this.gameboard)
    }
    checkCellIsEmpty = function(width, height){
       if(this.gameboard[width][height] === ""){
        return true
       } else {
        return false
       }
    } 
}

const gameboard = new GameBoard;

class AI{
    constructor(){
        this.level = "low";
    }
    getMove = function(){
        if (this.level === "low"){
            const width = Math.floor(Math.random()*3)
            const height = Math.floor(Math.random()*3)
            return [width, height]
        }
    }
    getValidMove = function(){
        let move = this.getMove();
        let width = move[0];
        let height = move[1];
        if (gameboard.checkCellIsEmpty(width, height)){
            console.log("empty")
        } else {
            console.log("filled")
        }
        console.log(width, height)
    }
}



const ai = new AI;

let currentPlayer = ""
let gameInProgress = true;

function restartGame(){
    gameInProgress = true;
    resetCurrentPlayer();            
    gameboard.resetBoard();
    renderBoard();
}

function resetCurrentPlayer(){
    currentPlayer = playerX;
}

function toggleCurrentPlayer(){
    (currentPlayer === playerX) ? currentPlayer = playerO : currentPlayer = playerX;
}


function renderBoard(){
    clearBoard()
    const boardContainer = document.querySelector(".boardContainer")
    const board = gameboard.getBoard();
    for (let i = 0; i < gameboard.WIDTH; i++){
        const column = document.createElement('div');
        boardContainer.appendChild(column);
        for (let j = 0; j < gameboard.HEIGHT; j++){
            const cell = document.createElement('div');
            column.appendChild(cell);
            cell.innerText = board[i][j];
            cell.id = `cell${i}-${j}`;
            cell.addEventListener('click', playTurn);     
        }
    }
}

function clearBoard(){
    document.querySelector(".boardContainer").textContent = "";
}

function playTurn(e){
    if (gameInProgress === true){
        const cellID = e.target.id;
        const width = cellID[4];
        const height = cellID[6];
        gameboard.modifyBoard(currentPlayer, width, height);
        renderBoard();
        renderWinner();
        toggleCurrentPlayer();
    }
}    

function renderWinner(){
    if (gameboard.checkWin() === true){
        const winner = currentPlayer.playerName

        const winContainer = document.querySelector(".winContainer")

        const winnerText = document.createElement('p')
        const newGameBtn = document.createElement('button')

        winContainer.appendChild(winnerText)
        winContainer.appendChild(newGameBtn)

        winnerText.innerText = `${winner} is the winner!`
        newGameBtn.innerText = `play again`

        gameInProgress = false;
    }
}

restartGame();












