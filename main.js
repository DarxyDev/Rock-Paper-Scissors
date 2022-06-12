changeScene(sc_battle);

const viewscreen = document.getElementById('viewscreen');

document.addEventListener('keydown', getKey);

////////////////////////animation test
function shakeTarget(target){
    target.classList.remove('shake');
    target.offsetWidth;
    target.classList.add('shake');

}
////////////////////////Universal
function getKey(e){
    currentScene.keyPress(e);
}