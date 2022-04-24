const ROCK = "rock";
const PAPER = "paper";
const SCISSOR = "scissors";

const WIN = "win";
const LOSE = "lose";
const TIE = "tie";

main();

function main(){
    let keepPlaying = true;
    while(keepPlaying){
        let playerMove = getPlayerTurn();
        let NPCMove = getNPCTurn();
        let winner = decideWinner(playerMove, NPCMove)
        printWinner(winner, playerMove, NPCMove);
        keepPlaying = getContinue();
    }
}

function getNPCTurn(){
    randomResult = Math.floor(Math.random() * 3);
    if(randomResult == 0) return ROCK;
    if(randomResult == 1) return PAPER;
    if(randomResult == 2) return SCISSOR;
    console.log("Error, randomResult out of bounds.");
    return false;
}

function getPlayerTurn(){
    let input = prompt("Your turn! Rock, Paper, or Scissors?", "rock");
    input = input.toLowerCase();
    let firstChar = input[0];
    if(firstChar == "r") return ROCK;
    if(firstChar == "p") return PAPER;
    if(firstChar == "s") return SCISSOR;
    console.log(`${input} is not valid, please try again!`);
    alert(`${input} is not valid. Please try again!`);
    return getPlayerTurn();    
}

function checkValidMove(move){
    if (move == ROCK) return true;
    if(move == PAPER) return true;
    if(move == SCISSOR) return true;
    return false;
}

function decideWinner(player, computer){
    if(!checkValidMove(player) || !checkValidMove(computer)){
        console.log("Error, move was not valid.");
        return false;
    }
    if(player == ROCK){
        if(computer == PAPER) return LOSE;
        if(computer == SCISSOR) return WIN; 
    }
    if(player == PAPER){
        if(computer == ROCK) return WIN;
        if(computer == SCISSOR) return LOSE;
    }
    if(player == SCISSOR){
        if(computer == ROCK) return LOSE;
        if(computer == PAPER) return WIN;
    }
    return TIE;
}

function printWinner(winState, playerMove, NPCMove){

    let message = `You chose ${playerMove} and the computer chose ${NPCMove}. `;
    if(winState == WIN) message += "Congrats you won!";
    if(winState == LOSE) message += "The computer won!";
    if(winState == TIE) message += "Nice try, it's a tie!";
    alert(message);
    return;
}

function getContinue(){
    let input = prompt("Continue playing? y/n", "y");
    input = input.toLowerCase();
    if(input[0] == "y") return true;
    if(input[0] == "n") return false;
    alert("Invalid input. Try again.")
    return getContinue();
}