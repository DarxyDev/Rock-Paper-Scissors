const SC_title = document.getElementById('sc_title');
const sc_title = {
    main:SC_title,
    keyPress: ()=>{changeScene(sc_helloThere);},
    click: ()=>{changeScene(sc_helloThere);}
}

const SC_helloThere = document.getElementById('sc_helloThere');
const sc_helloThere = {
    main: SC_helloThere,
    odin: SC_helloThere.querySelector('.odin'),
    textBox: SC_helloThere.querySelector('.bottomTextBox'),
    messages:['Hello, there!', 'This is a second message!'],
    currentMessage:0,
    keyPress: ()=>{continueText(sc_helloThere)},
    click: log,
    init: ()=>{initialText(sc_helloThere);}
}

function initialText(target){
    slowText(target.messages[target.currentMessage], target.textBox, 1000, true);

}
function continueText(target){
    if(target.currentMessage + 1 < target.messages.length){
        target.currentMessage++;
        slowText(target.messages[target.currentMessage], target.textBox, 1000, true);
    }    
}

function log(e){
//    console.log(e);
}