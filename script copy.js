const render = (function(){
    const board = ()=>{
        const board = gameboard.getBoard();
        const boardContainer = document.querySelector('.boardContainer')
        for (let column of board){
            const y = document.createElement("div")
            boardContainer.appendChild(y)
        }
    }
    const invalidMove = ()=>{
        alert("Invalid Move")
    }
    return {invalidMove, board}
})();

const gameboard = (function(){
    let board = ['','','','X','','','','','']
    const lanes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    const getBoard = () =>{
        return [board[0,1,2],board[3,4,5],board[6,7,8]]
    }
    const modifyBoard = (cell, token)=>{
        if (checkBlank(cell) === true){
            board[cell] = token;
        } else {
            render.invalidMove();
        }
    }
    const checkBlank = (cell)=>{
        if (board[cell] === ""){
            return true
        } else {
            return false
        }
    }
    const getLanes = ()=>{
        return lanes
    }
    const checkWin = ()=>{
        for (let lane of lanes){
            if (board[lane[0]] != "" &&
                board[lane[0]] === board[lane[1]] &&
                board[lane[1]] === board[lane[2]]
                ){
                return [true, lane]
            } 
        }
    }
    return {getBoard, modifyBoard, checkBlank, getLanes, checkWin}
})();



const gameLoop = (function(){

})();
