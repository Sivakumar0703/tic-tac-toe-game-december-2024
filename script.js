
// create elements
function createNewElement(elementName){
    return document.createElement(elementName)
} 

const body = document.getElementsByTagName("body")[0];
const gameContainer = createNewElement("div");
const gameName = createNewElement("h1");
const gameArea = createNewElement("div");
const playerTurn = createNewElement("p");
const restartGameButton = createNewElement("button");
const winningPossiblities = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
let gameRecorder = new Array(9).fill(null); // to store players move
let player1 = "x";


gameArea.classList.add("game-area");
gameContainer.classList.add("game-container");

// adding content
restartGameButton.innerText = "restart";
restartGameButton.addEventListener("click" , restartGame);
playerTurn.innerText = "x's turn";
gameName.innerText = "Tic-Tac-Toe Game";

// appending elements to dom
for(let i=0; i<9; i++){
    const box = createNewElement("div");
    box.setAttribute("data-cell-number" , i)
    box.classList.add("cell");
    gameArea.append(box);
}

gameContainer.append(gameName,gameArea,playerTurn,restartGameButton);
body.append(gameContainer);
gameContainer.addEventListener("click" , userMadeChoice);

// game logics

function userMadeChoice(e){
    let cell = e.target.dataset.cellNumber;
    // check if the particular cell is already filled.To aviod clicking on same cell
    if(gameRecorder[cell] !== null){
        return
    }

    gameRecorder[cell] = player1;
    e.target.innerText = player1; // updating cell content
    checkForWinning()

}

// checking for winner
function checkForWinning(){
    let isWinnerFound = false;

    for(let i=0; i<winningPossiblities.length ; i++){
        let possiblities =  winningPossiblities[i];
        let cell1 = gameRecorder[possiblities[0]];
        let cell2 = gameRecorder[possiblities[1]];
        let cell3 = gameRecorder[possiblities[2]];

        if(cell1 && cell2 && cell3){

            if(cell1 == cell2 && cell2 == cell3){
                isWinnerFound = true;
                break;
            }

        }

        
    }

    if(isWinnerFound){
        playerTurn.innerText = player1 + ' ' + "won";
        gameContainer.removeEventListener("click" , userMadeChoice)
    } else if(!gameRecorder.includes(null)){ // if all boxes are filled
        playerTurn.innerText = "Game Draw";
    } else { // switch player
        player1 = player1 == "x" ? "o" : "x"; 
        playerTurn.innerText = `${player1}'s turn`;
    }
}

// restart a new game
function restartGame(){
    gameRecorder = new Array(9).fill(null);
    player1 = "x";
    playerTurn.innerText = "x's turn";
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => cell.innerText = null);
    gameContainer.addEventListener("click" , userMadeChoice)
}