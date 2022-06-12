const TEXTDELAY = 80;
const INITIAL_TEXTDELAY = 300;
let slowTextRunning = false;
let interruptSlowText = false;
async function slowText(text, target,funct, startFresh = true){
    slowTextRunning = true;
    if(startFresh) target.innerText = '';
    if(interruptSlowText){
        target.innerText = text;
        interruptSlowText = false;
        slowTextRunning = false;
        return;
    }
    text = convertVariablesToString(text);
    await timer(INITIAL_TEXTDELAY);
    for(let i = 0; i < text.length; i++){
        if(interruptSlowText){
            target.innerText = text;
            interruptSlowText = false;
            slowTextRunning = false;
            return;
        }
        await pushText(target, text[i]);
        if(funct != undefined){
            if(isLetter(text[i])){
                funct();
            }
        }
    }
    slowTextRunning = false;
}

async function pushText(target, letter){
    await timer(TEXTDELAY);
    target.textContent += letter;
}
function timer(ms){ return new Promise(res => setTimeout(res, ms));}
let finishSlowTextBlocked = false;
function finishSlowText(){
    if(!finishSlowTextBlocked)interruptSlowText = true;
    else finishSlowTextBlocked = false;
}

function isLetter(char){
    let aCode = 'a'.charCodeAt(0);
    let zCode = 'z'.charCodeAt(0);
    let charCode = char.toLowerCase().charCodeAt(0);
    if(charCode <= zCode && charCode >= aCode ) return true;
    return false;
}

function convertVariablesToString(text = '', start = 0){
    if(text == '') return text;
    let indexStart = text.indexOf('${', start);
    if(indexStart === -1) return text;
    let indexEnd = text.indexOf('}',indexStart);
    if(indexEnd === -1) return convertVariablesToString(text, indexStart + 1);
    let varName = text.slice(indexStart + 2,indexEnd);
    if(varName !== '')varName = eval(varName);
    let varText = text.slice(0,indexStart) + varName + text.slice(indexEnd + 1, text.length);
    return convertVariablesToString(varText);
}
