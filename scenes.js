let userName = '';

//NOTES: messages is using original value of userName instead of updating it. Must add message by hand.

////////////////////////Scene: title
const SC_title = document.getElementById('sc_title');
const sc_title = {
    main: SC_title,
    keyPress: () => { changeScene(sc_helloThere); },
    click: () => { changeScene(sc_helloThere); },
    //init:curveText(SC_title.querySelector('.titleText'))  //unfinished and unused
}
/*                                                          //unfinished and unused
function curveText(target){
    let str = target.textContent;
    target.textContent = '';
    target.style.display = 'flex';
    target.style.justifyContent = 'center';

    let divArray = [];
    for(let i = 0; i < str.length; i++){
        divArray.push(document.createElement('div'));
        divArray[i].textContent = str[i];
        divArray[i].style.whiteSpace = 'pre';
        target.appendChild(divArray[i]);
    }
}
const curveMaxHeight = '20';
const curvHeightUnit = '%';
const curveMaxRotate = '20';
const curveRotateUnit = 'deg';
function getTransformMultiplier(pos, max){ //starts at 1
    let isEven = (max % 2 == 0);
}
*/

//////////////////////// Scene: helloThere
const messages = [
    'Hello, there!',
    'I can\'t seem to recall your name.',
    'Could you remind me?',
    () => { getUserName(sc_helloThere) },
    '${userName} is it?',
    'Now, what do you look like?',
    () => { changeScene(sc_characterSelect); },
    
]

const SC_helloThere = document.getElementById('sc_helloThere');
const sc_helloThere = {
    main: SC_helloThere,
    odin: SC_helloThere.querySelector('.odin'),
    textBox: SC_helloThere.querySelector('.bottomTextBox'),
    messages: messages,
    currentMessage: -1,
    nextScene: null,
    keyPress: () => { continueText(sc_helloThere) },
    click: log,
    init: () => { initialText(sc_helloThere); }
}

function initialText(target) {
    target.currentMessage++;
    slowText(target.messages[target.currentMessage], target.textBox, () => { shakeTarget(target.odin) });
    console.log(sc_helloThere.currentMessage);
}
function continueText(target) {
    if (slowTextRunning) {
        finishSlowText();
        return;
    }
    if (target.currentMessage + 1 < target.messages.length) {
        target.currentMessage++;
        let currentMessage = target.messages[target.currentMessage];
        if (typeof (currentMessage) === typeof (continueText)) {
            currentMessage();
        } else slowText(currentMessage, target.textBox, () => { shakeTarget(target.odin) });
    }
}
function getUserName(target) {
    target.keyPress = keyPressUserName;
    slowText('What is your name?', target.textBox, () => { shakeTarget(target.odin) });
}
const MIN_NAME_COUNT = 3;
const MAX_NAME_COUNT = 8;
let kPUN_firstRun = true;
function keyPressUserName(e) {
    if (slowTextRunning) { finishSlowText(); return; }
    if (kPUN_firstRun) {
        kPUN_firstRun = false;
        sc_helloThere.textBox.textContent += '\r\n';
    }
    let key = e.key;
    if (key == 'Enter' && userName.length >= MIN_NAME_COUNT) {
        sc_helloThere.keyPress = () => { continueText(sc_helloThere) };
        continueText(sc_helloThere);
    }
    if (key == 'Backspace' && userName.length > 0) {
        userName = userName.slice(0, -1);
        sc_helloThere.textBox.textContent = sc_helloThere.textBox.textContent.slice(0, -1);
    }
    if (isLetter(key) && key.length == 1) {
        if (userName.length >= MAX_NAME_COUNT) {
            userName = userName.slice(0, -1);
            sc_helloThere.textBox.textContent = sc_helloThere.textBox.textContent.slice(0, -1);
        }
        userName += key;
        sc_helloThere.textBox.textContent += e.key;
    }
}
//////////////////////// Scene: Character Select
const SC_characterSelect = document.getElementById('sc_characterSelect');
const sc_characterSelect = {
    main: SC_characterSelect,
    arrowLeft: SC_characterSelect.querySelector(".left"),
    arrowRight: SC_characterSelect.querySelector(".right"),
    selectButton: document.getElementById('imageSelect'),
    characterImage: document.getElementById('characterImage'),
    keyPress: log,
    click: log,
    init: log
}

sc_characterSelect.arrowLeft.addEventListener('click', () => { cycleCharacterIcon(false) });
sc_characterSelect.arrowRight.addEventListener('click', cycleCharacterIcon);
sc_characterSelect.selectButton.addEventListener('click', () => {changeScene(sc_helloThere);  });

let currentIcon = 0;
function cycleCharacterIcon(next = true) {
    if (next) {
        currentIcon = (currentIcon + 1) % playerCharChoices.length;
    }
    else {
        currentIcon -= 1;
        if (currentIcon < 0) currentIcon = playerCharChoices.length - 1;
    }
    sc_characterSelect.characterImage.style.backgroundImage = 'url(' + playerCharChoices[currentIcon] + ')';
    player.icon = playerCharChoices[currentIcon];
}

////////////////////////universal functions
function log(e = '') {
    //    console.log(e);
}