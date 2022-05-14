const viewscreen = document.getElementById('viewscreen');
let currentScene = sc_title;

document.addEventListener('keydown', getKey);


const TEXTDELAY = 100;
async function slowText(text, target, initialDelay = TEXTDELAY, startFresh = false){

    if(startFresh) target.innerText = '';
    await timer(initialDelay);
    for(let i = 0; i < text.length; i++){
        await pushText(target, text[i]);
    }
}
async function pushText(target, letter){
    await timer(TEXTDELAY);
    target.textContent += letter;
}
function timer(ms){ return new Promise(res => setTimeout(res, ms));}

function changeScene(scene){
    currentScene.main.classList.add('hidden');
    currentScene = scene;
    currentScene.main.classList.remove('hidden');
    if(currentScene.init != undefined)currentScene.init();
    else console.log('doesnt exist');
}

function getKey(e){
    currentScene.keyPress(e);
}
