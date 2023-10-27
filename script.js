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
        this.gameboard[width][height] = currentPlayer.playerToken
    }
    checkWinner = function(){

        return isWinner
    }
    logBoard = function(){
        console.log(this.gameboard)
    } 
}

const gameboard = new GameBoard;

function gameloop(){
    resetCurrentPlayer();            
    gameboard.resetBoard();
    gameboard.logBoard();
    gameboard.logBoard();
    const xxx = renderBoard();
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
    let cellID = ""
    for (let i = 0; i < gameboard.WIDTH; i++){
        const column = document.createElement('div');
        boardContainer.appendChild(column);
        for (let j = 0; j < gameboard.HEIGHT; j++){
            const cell = document.createElement('div');
            column.appendChild(cell);
            cell.innerText = board[i][j];
            cell.id = `cell${i}-${j}`;
            cell.addEventListener('click', passTurn)         
        }
    }
    return cellID
}

function passTurn(e){
    const cellID = e.target.id
    const width = cellID[4]
    const height = cellID[6]
    gameboard.modifyBoard(currentPlayer, width, height)
    renderBoard();
    toggleCurrentPlayer();
}

function clearBoard(){
    const boardContainer = document.querySelector(".boardContainer")
    boardContainer.textContent = "";
}

gameloop();





class AI{
    constructor(){
    }
    do = function(){

    }
}

const ai = new AI;




