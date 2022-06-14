let userName = '';
let totalGames = 0;
let totalWins = 0;

////////////////////////Scene: title
const SC_title = document.getElementById('sc_title');
const sc_title = {
    main: SC_title,
    keyPress: () => { changeScene(sc_helloThere); },
    click: () => { changeScene(sc_helloThere); },
}

let currentScene = sc_title;

function changeScene(scene) {
    if (scene == undefined) return;
    currentScene.main.classList.add('hidden');
    document.removeEventListener('click', currentScene.click);
    currentScene = scene;
    currentScene.main.classList.remove('hidden');
    if (currentScene.init != undefined) currentScene.init();
    if (scene.click != undefined) document.addEventListener('click', scene.click);
}

//////////////////////// Scene: helloThere
const typeHereDiv = document.getElementById('typeHere');
const getUserNameText = 'What is your name?';
async function addTypeHere(){
    await timer(TEXTDELAY * getUserNameText.length + 1000);
    typeHereDiv.classList.remove('invisible');
    typeHereDiv.classList.add('flashing');
}
const messages = [
    'Hello there!',
    'I can\'t seem to recall your name.',
    'Could you remind me?',
    () => { 
        getUserName(sc_helloThere);
        addTypeHere();
    },
    '${userName} is it?',
    'Now, what do you look like?',
    () => { changeScene(sc_characterSelect); },
    'It\'s a dangerous world out there, let\'s practice fighting!',
    () => { changeScene(sc_battle) }
]
let getUserNameRunning = false;
const SC_helloThere = document.getElementById('sc_helloThere');
const sc_helloThere = {
    main: SC_helloThere,
    odin: SC_helloThere.querySelector('.odin'),
    textBox: SC_helloThere.querySelector('.bottomTextBox'),
    messages: messages,
    currentMessage: -1,
    nextScene: null,
    keyPress: () => { continueText(sc_helloThere) },
    click: () => { if(!getUserNameRunning || slowTextRunning)continueText(sc_helloThere) },
    init: () => { initialText(sc_helloThere); }
}

function initialText(target) {
    target.currentMessage++;
    slowText(target.messages[target.currentMessage], target.textBox, () => { shakeTarget(target.odin) });
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
    getUserNameRunning = true; 
    target.keyPress = keyPressUserName;
    slowText(getUserNameText, target.textBox, () => { shakeTarget(target.odin) });}
const MIN_NAME_COUNT = 2;
const MAX_NAME_COUNT = 8;
let kPUN_firstRun = true;
function keyPressUserName(e) {
    if (slowTextRunning) { finishSlowText(); return; }
    if (kPUN_firstRun) {
        kPUN_finished = false;
        kPUN_firstRun = false;
        sc_helloThere.textBox.textContent += '\r\n';
        typeHereDiv.remove();
    }
    let key = e.key;
    if (key == 'Enter' && userName.length >= MIN_NAME_COUNT) { //kPUN finish
        player.name = userName;
        sc_helloThere.keyPress = () => { continueText(sc_helloThere) };
        getUserNameRunning = false; 
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
    init: ()=>{finishSlowTextBlocked = true;}
}

sc_characterSelect.arrowLeft.addEventListener('click', () => { cycleCharacterIcon(false) });
sc_characterSelect.arrowRight.addEventListener('click', cycleCharacterIcon);
sc_characterSelect.selectButton.addEventListener('click', () => { //endscene
    changeScene(sc_helloThere);
    enemyIconChoices.splice(currentIcon, 1);
    enemyNameChoices.splice(currentIcon, 1);
});

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

//////////////////////// Scene: Battle
let battleButtons = [];
let battleArrows = [];
for (let i = 0; i < 4; i++) {
    battleButtons.push(document.getElementById('button' + (i)));
    battleButtons[i].addEventListener('mouseover', setMenuSelected);
    battleButtons[i].addEventListener('click', useMenuSelected);
    battleArrows.push(document.getElementById('buttonArrow' + (i)));
}
let popupTextBox = document.getElementById('popupTextBox');
let popupTextBoxDisplayed = false;
async function addPopupText(text) {
    if (typeof (text) !== typeof ('')) return;
    popupTextBox.innerText = text;
    popupTextBox.classList.remove('invisible');
    popupTextBoxDisplayed = true;
    await timer(100); //prevents previous clicks from triggering instantly
    document.addEventListener('click', removePopupText);
}
function removePopupText() {
    popupTextBox.classList.add('invisible');
    popupTextBoxDisplayed = false;
    document.removeEventListener('click', removePopupText);
    if(gameFinished !== false) endBattle(gameFinished);
}
SC_battle = document.getElementById('sc_battle');
sc_battle = {
    main: SC_battle,
    buttons: battleButtons,
    arrows: battleArrows,
    playerIcon: document.getElementById('bPlayerIcon'),
    playerInfo: document.getElementById('bPlayerInfo'),
    enemyIcon: document.getElementById('bEnemyIcon'),
    enemyInfo: document.getElementById('bEnemyInfo'),
    keyPress: log,
    click: log,
    init: initBattle
}
function initBattle() {
    totalGames++;
    setPlayerInfo();
    setEnemyInfo();
}
function setBattleIcon(target, icon = playerCharChoices[0]) {
    target.style.backgroundImage = `url(${icon.toString()})`;
}
function setPlayerInfo() {
    setBattleIcon(sc_battle.playerIcon, player.icon);
    document.getElementById('bPlayerName').textContent = player.name;
   // document.getElementById('bPlayerLevel').textContent = player.level;
    document.getElementById('bPlayerHPText').textContent = `${player.health}/${player.health}`;
}
function setEnemyInfo() {
    setRandomEnemy();
    setBattleIcon(sc_battle.enemyIcon, enemy.icon);
    document.getElementById('bEnemyName').textContent = enemy.name;
   // document.getElementById('bEnemyLevel').textContent = enemy.level;
}

let currentMenu = 0;
function setMenuSelected(e = null) {
    if (e === null) return;
    let key = e.target.getAttribute('data-key');
    sc_battle.arrows[currentMenu].classList.add('invisible');
    currentMenu = key;
    sc_battle.arrows[key].classList.remove('invisible');
}
function useMenuSelected() {
    let selected = sc_battle.buttons[currentMenu];
    useMove(selected.textContent);
}
////////////////////////universal functions
function log(e = '') {
    // console.log(e);
}