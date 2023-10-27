// Rule of thumb: if you only ever need ONE of something 
// (gameBoard, displayController), 
// use a module. If you need multiples of something (players!), 
// create them with factories.

const boardContainer = document.querySelector(".boardContainer")
const newGameButton = document.querySelector('.newGameButton')
const winnerContainer = document.querySelector('.winnerStatusContainer')

class Player {
    constructor(name, token) {
        this.name = name;
        this.token = token;
    }
}
let player1 = new Player("Player X", "x")
let player2 = new Player("Player O", "o")





function runGame(){
    
    const rows = 3;
    const columns = 3;
    let allowUserInput = true;
    let board = makeEmptyBoardArray();
    let currentPlayer = player1;
    newGameButton.style.visibility = "hidden";
    winnerContainer.innerText="";

    clearBoard();
    renderBoard();

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

    function placeToken(){
        if (allowUserInput === true){
            //gets info on cell that was clicked
            let row = this.dataset.row;
            let column = this.dataset.column;
            //check to ensure cell is empty
            if (board[row][column] === ""){
                //updates board with new token
                board[row][column] = currentPlayer.token;
                toggleCurrentPlayer();
                clearBoard();
                renderBoard();
                gameStatus();
            } else {
                alert(`Invalid move, square already played by  ${board[row][column]}`);
            }
        } else {
            alert('click reset to start new game')
        }
    }

    function clearBoard(){
        boardContainer.textContent = "";
    }

    function toggleCurrentPlayer(){
        (currentPlayer === player1) ? currentPlayer = player2 : currentPlayer = player1
    }

    function gameStatus(){
        let haveWinner
        let winner
        function checkForWin(first, second, third){
            if (first != "" &&
                first === second &&
                second === third ){
                haveWinner = true
                winner = first
            }
        }
        // check for horizontal win
        for (let i = 0; i < rows; i++){
            checkForWin (board[i][0], board[i][1], board[i][2])
        }
        // check for vertical win
        for (let i = 0; i < columns; i++){
            checkForWin (board[0][i], board[1][i], board[2][i])
        }
        // check for diagonal win
        checkForWin (board[0][0], board[1][1], board[2][2])
        checkForWin (board[2][0], board[1][1], board[0][2])
    
        function renderWinnerStatus(){
            if (haveWinner === true){
                allowUserInput = false;
                
                winnerContainer.innerText=`${winner} is the winner!`
                newGameButton.style.visibility = "visible"
                newGameButton.addEventListener('click', runGame)
            }
        }
        renderWinnerStatus();
    }

    function makeEmptyBoardArray(){
        let board = [];
        for (i = 0; i < rows; i++){
            board[i] = []; 
            for (j = 0; j < columns; j++){
                board[i][j] = ""
            }
        }
        return board;
    }

}
runGame()



