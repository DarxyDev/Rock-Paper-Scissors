const viewscreen = document.getElementById('viewscreen');
let currentScene = sc_title;

document.addEventListener('keydown', getKey);

////////////////////////slowText
const TEXTDELAY = 75;
let slowTextRunning = false;
let interruptSlowText = false;
async function slowText(text, target, initialDelay = 500, startFresh = true){
    slowTextRunning = true;
    if(startFresh) target.innerText = '';
    if(interruptSlowText){
        target.innerText = text;
        interruptSlowText = false;
        slowTextRunning = false;
        return;
    }
    await timer(initialDelay);
    for(let i = 0; i < text.length; i++){
        if(interruptSlowText){
            target.innerText = text;
            interruptSlowText = false;
            slowTextRunning = false;
            return;
        }
        await pushText(target, text[i]);
    }
    slowTextRunning = false;
}
async function pushText(target, letter){
    await timer(TEXTDELAY);
    target.textContent += letter;
}
function timer(ms){ return new Promise(res => setTimeout(res, ms));}

function finishSlowText(){
    interruptSlowText = true;
}
////////////////////////animation test

////////////////////////scene changing
function changeScene(scene){
    currentScene.main.classList.add('hidden');
    currentScene = scene;
    currentScene.main.classList.remove('hidden');
    if(currentScene.init != undefined)currentScene.init();
    else console.log('doesnt exist');
}

////////////////////////Universal
function getKey(e){
    currentScene.keyPress(e);
}
