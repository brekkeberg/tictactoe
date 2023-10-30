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
        function checkForWin(lane){
            if (lane[0] != "" && lane[0] === lane[1] && lane[1] === lane[2] ){
                isWinner = true;
            }
        }
        const lanes = this.getLanes();
        for (let i = 0; i < lanes.length; i++){
            checkForWin(lanes[i].lane)
        }
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
    getValidMoves = function(){
        const board = this.getBoard();
        const validMoves = []
        for (let i = 0; i < this.WIDTH; i++){
            for (let j = 0; j < this.HEIGHT; j++){
                if (board[i][j] === ""){
                    validMoves.push([i,j])
                }
            } 
        }
        return validMoves
    }
    checkCatsGame(){

    }
    getLanes(){
        class Lane{
            constructor(name, lane, cellIDs){
                this.name = name
                this.lane = lane
                this.cellIDs = cellIDs
                this.rank = 0
                this.openCells = this.getOpenCells(this.lane, "")
                this.xCount = this.countTokenFrequency("X", this.lane)
                this.oCount = this.countTokenFrequency("O", this.lane)
            }
            countTokenFrequency = function(ele, arr){
                let frequency = 0;
                for(let i = 0; i < arr.length; i++){
                    if(arr[i] === ele)
                    frequency++;
                }
                return frequency
            }
            getOpenCells = function(arr, val){
                var indexes = [], i;
                for(i = 0; i < arr.length; i++)
                    if (arr[i] === val)
                        indexes.push(i);
                return indexes;
            }
        }
        const b = this.gameboard
        const hTop = new Lane("hTop", [b[0][0], b[0][1], b[0][2]] , [[0,0],[0,1],[0,2]])
        const hMid = new Lane("hMid", [b[1][0], b[1][1], b[1][2]] , [[1,0],[1,1],[1,2]])
        const hBtm = new Lane("hBtm", [b[2][0], b[2][1], b[2][2]] , [[2,0],[2,1],[2,2]])

        const vLft = new Lane("vLft", [b[0][0], b[1][0], b[2][0]] , [[0,0],[1,0],[2,0]])
        const vMid = new Lane("vMid", [b[0][1], b[1][1], b[2][1]] , [[0,1],[1,1],[2,1]])
        const vRgt = new Lane("vRgt", [b[0][2], b[1][2], b[2][2]] , [[0,2],[1,2],[2,2]])

        const dLft = new Lane("dLft", [b[0][0], b[1][1], b[2][2]] , [[0,0],[1,1],[2,2]])
        const dRgt = new Lane("dRgt", [b[0][2], b[1][1], b[2][0]] , [[0,2],[1,1],[2,0]])

        return [hTop, hMid, hBtm, vLft, vMid, vRgt, dLft, dRgt]
    }
}

const gameboard = new GameBoard;

class AI{
    constructor(){
        this.level = "low";
    }
    getMoveLow = function(){
        const validMoves = gameboard.getValidMoves()
        const index = Math.floor(Math.random()*validMoves.length)
        const move = validMoves[index]
        return move
    }
    getMoveMedium = function(){
        const lane = this.evaluateLanes();
        const rand = Math.floor(Math.random()*lane.openCells.length);
        const moveID = lane.openCells[rand];
        const move = lane.cellIDs[moveID];
        return move
    }
    evaluateLanes = function(){
        const lanes = gameboard.getLanes();
        let maxValue = 0;
        let bestLane = ""
        // rank lanes based on combinations of tokens that they contain
        for (let laneObj of lanes) {
            if (laneObj.oCount === 2 && laneObj.xCount === 0){
                laneObj.rank = 5 
            } else if (laneObj.oCount === 0 && laneObj.xCount ===2){
                laneObj.rank = 4 
            } else if (laneObj.oCount === 1 && laneObj.xCount === 0){
                laneObj.rank = 3 
            } else if (laneObj.oCount === 0 && laneObj.xCount === 1){
                laneObj.rank = 2
            } else if (laneObj.oCount === 0 && laneObj.xCount === 0){
                laneObj.rank = 1 
            } else if (laneObj.oCount === 1 && laneObj.xCount === 1){
                laneObj.rank = 0 
            } 
        }
        // return the top ranked lane
        for (let laneObj of lanes){
            if (laneObj.rank > maxValue){
                maxValue = laneObj.rank;
                bestLane = laneObj;
            }
        }
        return bestLane
    }
}

const ai = new AI;

let currentPlayer = ""
let gameInProgress = true;

function restartGame(){
    gameInProgress = true;
    clearWinContainer();
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
            cell.addEventListener('click', playPlayerTurn);     
        }
    }
}

function clearBoard(){
    document.querySelector(".boardContainer").textContent = "";
}
function clearWinContainer(){
    document.querySelector(".winContainer").textContent = "";
}

function playPlayerTurn(e){
    if (gameInProgress){
        const cellID = e.target.id;
        const width = cellID[4];
        const height = cellID[6];
        gameboard.modifyBoard(currentPlayer, width, height);
        renderBoard();
        renderWinner();
        toggleCurrentPlayer();
        playAIturn();
    }
} 

function playAIturn(){
    if (gameInProgress){
        const aiMove = ai.getMoveMedium();
        const aiwidth = aiMove[0]
        const aiheight = aiMove[1]
        gameboard.modifyBoard(currentPlayer, aiwidth, aiheight);
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

        newGameBtn.addEventListener('click', ()=>{
            restartGame();
        })

        gameInProgress = false;
    }
}

restartGame();