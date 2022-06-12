let userName = '';

////////////////////////Scene: title
const SC_title = document.getElementById('sc_title');
const sc_title = {
    main: SC_title,
    keyPress: () => { changeScene(sc_helloThere); },
    click: () => { changeScene(sc_helloThere); },
}

let currentScene = sc_title;

function changeScene(scene){
    if(scene == undefined) return;
    currentScene.main.classList.add('hidden');
    document.removeEventListener('click', currentScene.click);///will this cause errors?
    currentScene = scene;
    currentScene.main.classList.remove('hidden');
    if(currentScene.init != undefined)currentScene.init();
    if(scene.click != undefined) document.addEventListener('click', scene.click);
}

//////////////////////// Scene: helloThere
const messages = [
    'Hello there!',
    'I can\'t seem to recall your name.',
    'Could you remind me?',
    () => { getUserName(sc_helloThere) },
    '${userName} is it?',
    'Now, what do you look like?',
    () => { changeScene(sc_characterSelect); },
    'Battle time.',
    () => { changeScene(sc_battle) }
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
const MIN_NAME_COUNT = 2;
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
        player.name = userName;
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
sc_characterSelect.selectButton.addEventListener('click', () => {
    changeScene(sc_helloThere);
    enemyIconChoices.splice(currentIcon, 1);
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
 async function addPopupText(text){
    if(typeof(text)!== typeof('')) return;
    popupTextBox.innerText = text;
    popupTextBox.classList.remove('invisible');
    popupTextBoxDisplayed = true;
    console.log('popUpText added');
    await timer(100);
    document.addEventListener('click', removePopupText);
} 
function removePopupText(){
    popupTextBox.classList.add('invisible');
    popupTextBoxDisplayed = false;
    console.log('popUpText removed');
    document.removeEventListener('click', removePopupText);
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
    setPlayerInfo();
    setEnemyInfo();
}
function setBattleIcon(target, icon = playerCharChoices[0]) {
    target.style.backgroundImage = `url(${icon.toString()})`;
}
function setPlayerInfo(){
    setBattleIcon(sc_battle.playerIcon, player.icon);
    document.getElementById('bPlayerName').textContent = player.name;
    document.getElementById('bPlayerLevel').textContent = player.level;
    document.getElementById('bPlayerHPText').textContent = `${player.health}/${player.health}`;
}
function setEnemyInfo(){
    setRandomEnemy();
    setBattleIcon(sc_battle.enemyIcon, enemy.icon);
    document.getElementById('bEnemyName').textContent = enemy.name;
    document.getElementById('bEnemyLevel').textContent = enemy.level;
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