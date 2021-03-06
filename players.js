const playerCharChoices = ['images/mersnow400x400.png','images/mreow_400x400.png','images/odin-mascot.svg'];
let enemyIconChoices = playerCharChoices;
let enemyNameChoices = ['CatPig','Mreow','Odin'];

const player = {
    name: 'Player',
    icon: playerCharChoices[0],
    health: 5,
    level: 1
}
const enemy = {
    name:'Enemy',
    icon: enemyIconChoices[0],
    health: 5,
    level: 1
}

function setRandomEnemy(){
    let enemyIndex = Math.floor(Math.random() * enemyIconChoices.length);
    enemy.icon = enemyIconChoices[enemyIndex];
    enemy.name = enemyNameChoices[enemyIndex];
}