//constants
const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSOR = 'Scissor';
const RUN = 'Run';

const WIN = 'won';
const LOSE = 'lost';
const TIE = 'tied';

//references
playerElements = {
    hpBar: document.getElementById('bPlayerHPFill'),
    hpText: document.getElementById('bPlayerHPText'),
}
enemyElements = {
    hpBar: document.getElementById('bEnemyHPFill'),
    hpText: document.getElementById(''),
    hiddenHP: '5/5'
}
//functions
function useMove(move = 'Run'){
    let enemyMove = getEnemyTurn();
    let turnResult = turnWin(move, enemyMove);
    addPopupText(setBattlePopupText(move, enemyMove, turnResult));
    switch (turnResult){
        case WIN:
            damageEnemy();
            break;
        case LOSE:
            damagePlayer();
            break;
        case TIE:
            break;
    }
}
function setBattlePopupText(playerMove, enemyMove, battleResult){
    return(`You used ${playerMove.toLowerCase()} and your opponent used ${enemyMove.toLowerCase()}.\n\n You ${battleResult} the turn!`)
}
function turnWin(playerMove, enemyMove){
    if(playerMove == RUN) return RUN;
    if(playerMove == ROCK){
        if(enemyMove == PAPER) return LOSE;
        if(enemyMove == SCISSOR) return WIN; 
    }
    if(playerMove == PAPER){
        if(enemyMove == ROCK) return WIN;
        if(enemyMove == SCISSOR) return LOSE;
    }
    if(playerMove == SCISSOR){
        if(enemyMove == ROCK) return LOSE;
        if(enemyMove == PAPER) return WIN;
    }
    return TIE;
}
function getEnemyTurn(){
    randomResult = Math.floor(Math.random() * 3);
    if(randomResult == 0) return ROCK;
    if(randomResult == 1) return PAPER;
    if(randomResult == 2) return SCISSOR;
    console.log("Error, randomResult out of bounds.");
    return false;
}

function fracToPercent(fraction){
    let numerator = getNumerator(fraction);
    let denominator = getDenominator(fraction);
    percentResult = numerator/denominator * 100;
    return percentResult.toString()+'%';
}
function getNumerator(fraction = '5/5'){
    let slashIndex = fraction.indexOf('/');
    return parseInt(fraction.slice(0,slashIndex));
}
function getDenominator(fraction){
    let slashIndex = fraction.indexOf('/');
    if(slashIndex + 1 >= fraction.Length){
        console.log('Error: denominator missing.');
        return -1;
    }
    return parseInt(fraction.slice(slashIndex + 1, fraction.length));
}
function damagePlayer(){
    let hpFraction = playerElements.hpText.textContent;
    let currentHP = getNumerator(hpFraction) - 1;
    let maxHP = getDenominator(hpFraction);
    hpFraction = `${currentHP}/${maxHP}`;
    playerElements.hpText.textContent = hpFraction;
    playerElements.hpBar.style.width = fracToPercent(hpFraction);
    if(currentHP <= 0) return endBattle(LOSE);
}
function damageEnemy(){
    let hpFraction = enemyElements.hiddenHP;
    let currentHP = getNumerator(hpFraction)-1;
    let maxHP = getDenominator(hpFraction);
    hpFraction = `${currentHP}/${maxHP}`;
    enemyElements.hiddenHP = hpFraction;
    enemyElements.hpBar.style.width = fracToPercent(hpFraction);
    if(currentHP <= 0) {
        return endBattle(WIN);
    }
}
function endBattle(state){
    console.log('battle ended');
    console.log(`You ${state}!`);
}
console.log('todo: add battle animations. add popup text box. add battle end scene');

//need to use slowtext on popupbox and remove it with click once finished.
