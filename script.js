// Rule of thumb: if you only ever need ONE of something 
// (gameBoard, displayController), 
// use a module. If you need multiples of something (players!), 
// create them with factories.

const buttonX = document.querySelector(".buttonX")
const buttonO = document.querySelector(".buttonO")
const boardContainer = document.querySelector(".boardContainer")



const rows = 3;
const columns = 3;
let board = [];


for (i = 0; i < rows; i++){
    board[i] = []; //makes horizontal array that is "width" across, containing empty vertical array
    for (j = 0; j < columns; j++){
        board[i].push("") //puts "X" in each horizontal array column that is "height" high
    }
}


function placeToken(){
    //gets info on cell that was clicked
    let row = this.dataset.row;
    let column = this.dataset.column;
    //check to ensure cell is empty
    if (board[row][column] === ""){
        //updates board with new token
        board[row][column] = currentPlayer.token;
        toggleCurrentPlayer();
        printBoard();
        checkForWin();
    } else {
        alert("Invalid move");
    }
    console.log(board[0][0], board[0][1], board[0][2])
}

function printBoard(){
    console.table(board);
}

function toggleCurrentPlayer(){
    (currentPlayer === player1) ? currentPlayer = player2 : currentPlayer = player1
}
renderBoard()

function checkForWin(){
    function xWins(first, second, third){
        if (first === second === third === "X"){
            console.log("WINNER")
        } else {
        }
    }
    for (let i = 0; i < rows; i++){
        xWins(board[i][0], board[i][1], board[i][2])
    }
}


class Player {
    constructor(name, token) {
        this.name = name;
        this.token = token;
    }
}

let player1 = new Player("Player X", "X")
let player2 = new Player("Player O", "O")

let currentPlayer = player1;



/*

// gameBoard module
function gameBoard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for (i = 0; i < rows; i++){
        board[i] = []; //makes horizontal array that is "width" across, containing empty vertical array
        for (j = 0; j < columns; j++){
            board[i].push("XX") //puts "X" in each horizontal array column that is "height" high
        }
    }

    // a function that just grabs the board once it has been calculated
    function getBoard(){board};  

    function dropToken(player, row, column){
        if (board[row][column] === ""){
            board[row][column] = player
        } else{
            alert("invalid move")
        }
    }

    function renderBoard(){
        for (i = 0; i < rows; i++){
            let row = document.createElement('div');
            row.setAttribute("class", "row");
            boardContainer.appendChild(row);
            for (j = 0; j < columns; j++){
                let square = document.createElement("div");
                square.setAttribute("class", "square");
                row.appendChild(square);
                square.innerText=board[i][j]
            }
        }
    }
    return { getBoard, dropToken, renderBoard}
}

function playerInput(){
    
}

// a cell is one square on the tictactoe board
function Cell() {
    let value = 0;
  
    // Accept a player's token to change the value of the cell
    /*
    const addToken = (player) => {
      value = player;
    };
    
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
  
    return {
       addToken, 
      getValue
    };
  }









const xx = gameBoard();



function gameFlow(){

}


/*
    buttonX.addEventListener('click', getPlayerInput)
    buttonO.addEventListener('click', getPlayerInput)

    function getPlayerInput(){
        let token = this.innerText
        if (token === "X"){
            console.log("x")
            return "X"
        } else {
            console.log("o")
            return "O"
        }
    }
*/


function renderBoard(){
    for (i = 0; i < rows; i++){
        let row = document.createElement('div');
        row.setAttribute("class", "row");
        boardContainer.appendChild(row);
        for (j = 0; j < columns; j++){
            let square = document.createElement("div");
            square.setAttribute("class", "square");
            square.setAttribute('data-row', `${i}`)
            square.setAttribute('data-column', `${j}`)
            row.appendChild(square);
            square.innerText=board[i][j]
            square.addEventListener("click", placeToken)
        }
    }
}


function clearBoard(){
    boardContainer.textContent = "";
}



