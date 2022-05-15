const viewscreen = document.getElementById('viewscreen');
let currentScene = sc_title;

document.addEventListener('keydown', getKey);

////////////////////////animation test
function shakeTarget(target){
    target.classList.remove('shake');
    target.offsetWidth;
    target.classList.add('shake');

}
////////////////////////scene changing
function changeScene(scene){
    if(scene == undefined) return;
    currentScene.main.classList.add('hidden');
    currentScene = scene;
    currentScene.main.classList.remove('hidden');
    if(currentScene.init != undefined)currentScene.init();
}

////////////////////////Universal
function getKey(e){
    currentScene.keyPress(e);
}
