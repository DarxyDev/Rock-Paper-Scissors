changeScene(sc_title);

const viewscreen = document.getElementById('viewscreen');

document.addEventListener('keydown', getKey);

////////////////////////animation test
function shakeTarget(target){
    target.classList.remove('shake');
    target.offsetWidth;
    target.classList.add('shake');

}
function playerAttack(target){
    target.classList.remove('playerAttack');
    target.offsetWidth;
    target.classList.add('playerAttack');
}
function enemyAttack(target){
    target.classList.remove('enemyAttack');
    target.offsetWidth;
    target.classList.add('enemyAttack');
}
////////////////////////Universal
function getKey(e){
    currentScene.keyPress(e);
}