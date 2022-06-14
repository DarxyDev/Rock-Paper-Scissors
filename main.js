changeScene(sc_battle);
const viewscreen = document.getElementById('viewscreen');

document.addEventListener('keydown', getKey);

////////////////////////animation functions
function shakeTarget(target){
    target.classList.remove('shake');
    target.offsetWidth;
    target.classList.add('shake');

}
function playerAttack(target, cancel = false){
    target.classList.remove('playerAttack');
    target.offsetWidth;
    if(!cancel)target.classList.add('playerAttack');
}
function enemyAttack(target, cancel = false){
    target.classList.remove('enemyAttack');
    target.offsetWidth;
    if(!cancel)target.classList.add('enemyAttack');
}
function playerRun(target, cancel = false){
    target.classList.remove('playerRun');
    target.offsetWidth;
    if(!cancel)target.classList.add('playerRun');
}
////////////////////////Universal
function getKey(e){
    currentScene.keyPress(e);
}