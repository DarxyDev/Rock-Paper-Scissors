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

function finishSlowText(){
    interruptSlowText = true;
}

function isLetter(char){
    let aCode = 'a'.charCodeAt(0);
    let zCode = 'z'.charCodeAt(0);
    let charCode = char.toLowerCase().charCodeAt(0);
    if(charCode <= zCode && charCode >= aCode ) return true;
    return false;
}

console.log('working on convertVariableToString in slowText');
let num = 7;
convertVariablesToString();
function convertVariablesToString(text){
    text = 'test${num}';
    let indexStart = text.indexOf('${');
    if(indexStart === -1) return text;
    let indexEnd = text.indexOf('}',indexStart);
    let variable = text.slice(indexStart + 2,indexEnd);
    console.log(eval(variable));
    

}
