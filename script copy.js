class Player{
    constructor(playerName, playerToken){
        this.playerName = playerName,
        this.playerToken = playerToken
    }
}

const playerX = new Player("X", "x")
const playerO = new Player("O", "o")

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
    checkWin = function(board){
        const lanes = this.getLanes(board);
        for (let laneObj of lanes){
            let isWinner = laneObj.checkLaneForWin(laneObj.lane)
            if (isWinner === true){
                return true
            }
        }
    }
    getWinner = function(board){
        const lanes = this.getLanes(board);
        for (let laneObj of lanes){
            let isWinner = laneObj.checkLaneForWin(laneObj.lane)
            if (isWinner === true){
                return laneObj.lane[0]
            }
        }
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
    checkCatsGame(board){
        if(!board[0].includes("") && !board[1].includes("") && !board[2].includes("")){
            return true
        } else {
            return false
        }
    }
    getLanes(board){
        const b = board
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

class Lane{
    constructor(name, lane, cellIDs){
        this.name = name
        this.lane = lane
        this.cellIDs = cellIDs
        this.rank = 0
        this.openCells = this.getOpenCells(this.lane, "")
        this.xCount = this.countTokenFrequency(playerX.playerToken, this.lane)
        this.oCount = this.countTokenFrequency(playerO.playerToken, this.lane)
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
    checkLaneForWin = function(lane){
        if (lane[0] != "" && lane[0] === lane[1] && lane[1] === lane[2] ){
            return true
        }
    }

}

class AI{
    constructor(){
        this.level = "easy";
    }
    getMove = function(){
        let move = ""
        if (this.level === "easy"){
            move = this.getMoveEasy();
        } else if (this.level === "medium"){
            move = this.getMoveMedium();
        } else if (this.level === "hard"){
            move = this.getMoveHard();
        }
        return move
    }
    getMoveEasy = function(){
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
    getMoveHard = function(){
        return this.findBestMove(gameboard.getBoard())
    }
    evalutate2 = function(board){
        if (gameboard.getWinner(board) === playerO.playerToken){
            return +10;
        } else if (gameboard.getWinner(board) === playerX.playerToken){
            return -10;
        } else {
            return 0;
        }
    }
    evaluate = function(b){
            // Checking for Rows for X or O victory.
            for(let row = 0; row < 3; row++) 
        { 
            if (b[row][0] == b[row][1] && 
                b[row][1] == b[row][2]) 
            { 
                if (b[row][0] == playerO.playerToken) 
                    return +10; 
                    
                else if (b[row][0] == playerX.playerToken) 
                    return -10; 
            } 
        } 
    
        // Checking for Columns for X or O victory. 
        for(let col = 0; col < 3; col++) 
        { 
            if (b[0][col] == b[1][col] && 
                b[1][col] == b[2][col]) 
            { 
                if (b[0][col] == playerO.playerToken) 
                    return +10; 
    
                else if (b[0][col] == playerX.playerToken) 
                    return -10; 
            } 
        } 
    
        // Checking for Diagonals for X or O victory. 
        if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) 
        { 
            if (b[0][0] == playerO.playerToken) 
                return +10; 
                
            else if (b[0][0] == playerX.playerToken) 
                return -10; 
        } 
    
        if (b[0][2] == b[1][1] &&  
            b[1][1] == b[2][0]) 
        { 
            if (b[0][2] == playerO.playerToken) 
                return +10; 
                
            else if (b[0][2] == playerX.playerToken) 
                return -10; 
        } 
    
        // Else if none of them have 
        // won then return 0 
        return 0; 
    }
    isMovesLeft = function(board){ 
        for(let i = 0; i < 3; i++) 
        for(let j = 0; j < 3; j++) 
            if (board[i][j] == '') 
                return true; 
                  
        return false; 
    } 
    minimax = function(board, depth, isMax){
        let score = this.evaluate2(board); 
   
    // If Maximizer has won the game 
    // return his/her evaluated score 
    if (score == 10) 
        return score; 
   
    // If Minimizer has won the game 
    // return his/her evaluated score 
    if (score == -10) 
        return score; 
   
    // If there are no more moves and 
    // no winner then it is a tie 
    if (gameboard.checkCatsGame(board) == true) 
        return 0; 
   
    // If this maximizer's move 
    if (isMax) 
    { 
        let best = -1000; 
   
        // Traverse all cells 
        for(let i = 0; i < 3; i++) 
        { 
            for(let j = 0; j < 3; j++) 
            { 
                  
                // Check if cell is empty 
                if (board[i][j]=='') 
                { 
                      
                    // Make the move 
                    board[i][j] = playerO.playerToken; 
   
                    // Call minimax recursively  
                    // and choose the maximum value 
                    best = Math.max(best, this.minimax(board, 
                                    depth + 1, !isMax)); 
   
                    // Undo the move 
                    board[i][j] = ''; 
                } 
            } 
        } 
        return best; 
    } 
   
    // If this minimizer's move 
    else
    { 
        let best = 1000; 
   
        // Traverse all cells 
        for(let i = 0; i < 3; i++) 
        { 
            for(let j = 0; j < 3; j++) 
            { 
                  
                // Check if cell is empty 
                if (board[i][j] == '') 
                { 
                      
                    // Make the move 
                    board[i][j] = playerX.playerToken; 
   
                    // Call minimax recursively and  
                    // choose the minimum value 
                    best = Math.min(best, this.minimax(board, 
                                    depth + 1, !isMax)); 
   
                    // Undo the move 
                    board[i][j] = ''; 
                } 
            } 
        } 
        return best; 
    } 
    }
    findBestMove = function(board){
        let bestVal = -1000; 
        let bestMove = []
   
    // Traverse all cells, evaluate  
    // minimax function for all empty  
    // cells. And return the cell 
    // with optimal value. 
    for(let i = 0; i < 3; i++) 
    { 
        for(let j = 0; j < 3; j++) 
        { 
              
            // Check if cell is empty 
            if (board[i][j] == '') 
            { 
                  
                // Make the move 
                board[i][j] = playerO.playerToken; 
   
                // compute evaluation function  
                // for this move. 
                let moveVal = this.minimax(board, 0, false); 
   
                // Undo the move 
                board[i][j] = ''; 
   
                // If the value of the current move  
                // is more than the best value, then  
                // update best 
                if (moveVal > bestVal) 
                { 
                    bestMove[0] = i
                    bestMove[1] = j
                    bestVal = moveVal; 
                } 
            } 
        } 
    } 
   
    return bestMove; 
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

class ScreenOutput{
    constructor(){}
    renderBoard = ()=>{
        this.clearBoard()
        const boardContainer = document.querySelector(".boardContainer")
        const board = gameboard.getBoard();
        for (let i = 0; i < gameboard.WIDTH; i++){
            const column = document.createElement('div');
            boardContainer.appendChild(column);
            for (let j = 0; j < gameboard.HEIGHT; j++){
                const cell = document.createElement('div');
                column.appendChild(cell);
                cell.classList = 'cell'
                cell.innerText = board[i][j];
                cell.id = `cell${i}-${j}`;
                cell.addEventListener('click', gameLoop.playPlayerTurn);     
            }
        }
    }
    clearBoard = ()=>{
        document.querySelector(".boardContainer").textContent = "";
    }
    clearStatusContainer = ()=>{
        document.querySelector(".winContainer").textContent = "";
    }
    renderGameStatus = ()=>{
        const winContainer = document.querySelector(".winContainer");
        const outcomeText = document.createElement('p');
        const currentPlayer = gameLoop.getCurrentPlayer().playerName;
        winContainer.appendChild(outcomeText);
        if (gameboard.checkWin(gameboard.getBoard()) === true){
            outcomeText.innerText = `${currentPlayer} is the winner!`;
            this.renderButton();
        } else if (gameboard.checkCatsGame(gameboard.getBoard()) === true){
                outcomeText.innerText = `Cat's Game!`;
                this.renderButton();
        } 
    }
    renderButton = () =>{
        const winContainer = document.querySelector(".winContainer");
        const newGameBtn = document.createElement('button');
        winContainer.appendChild(newGameBtn);
        newGameBtn.innerText = `play again`;
        newGameBtn.addEventListener('click', ()=>{
            gameLoop.restartGame();
        })
        gameInProgress = false;
    }
}
const screenOutput = new ScreenOutput;




const gameLoop = (function(){
    let currentPlayer = ""
    // make AI toggle button
    const aiBtn = document.querySelector(".aiBtn");
    aiBtn.innerText = ai.level;
    aiBtn.addEventListener("click", toggleAILevel);

    function getCurrentPlayer(){
        return currentPlayer
    }
    function restartGame(){
        gameInProgress = true;
        screenOutput.clearStatusContainer();
        resetCurrentPlayer();            
        gameboard.resetBoard();
        screenOutput.renderBoard();
    }

    function playPlayerTurn(e){
        if (gameInProgress){
            const cellID = e.target.id;
            const width = cellID[4];
            const height = cellID[6];
            gameboard.modifyBoard(currentPlayer, width, height);
            screenOutput.renderBoard();
            screenOutput.clearStatusContainer();
            screenOutput.renderGameStatus();
            toggleCurrentPlayer();
            playAIturn();
        }
    } 

    function playAIturn(){
        if (gameInProgress){
            const move = ai.getMove();
            gameboard.modifyBoard(currentPlayer, move[0], move[1]);
            screenOutput.renderBoard();
            screenOutput.clearStatusContainer();
            screenOutput.renderGameStatus();
            toggleCurrentPlayer();

        }
    }

    function resetCurrentPlayer(){
        currentPlayer = playerX;
    }

    function toggleCurrentPlayer(){
        (currentPlayer === playerX) ? currentPlayer = playerO : currentPlayer = playerX;
    }

    function toggleAILevel(){
        if (ai.level === "easy"){
            ai.level = "medium"
        } else if (ai.level === "medium"){
            ai.level = "hard"
        } else if (ai.level === "hard"){
            ai.level = "easy"
        }
        aiBtn.innerText = ai.level;
    }
    return {restartGame, playPlayerTurn, toggleCurrentPlayer, getCurrentPlayer}
})();

// starts game for the first time
let gameInProgress = true;
gameLoop.restartGame();
