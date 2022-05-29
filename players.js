const playerCharChoices = ['images/mersnow400x400.png','images/mreow_400x400.png','images/odin-mascot.svg'];

const player = {
    icon: playerCharChoices[0],
    health: 5
    
}

let enemyIconChoices = playerCharChoices; //need to remove player.icon from options when icon is chosen
function getRandomEnemy(){
    let enemyIndex = Math.floor(Math.random() * enemyIconChoices.length);
    return enemyIconChoices[enemyIndex];
}