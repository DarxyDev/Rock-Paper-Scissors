////////////////////////Scene: title
const SC_title = document.getElementById('sc_title');
const sc_title = {
    main:SC_title,
    keyPress: ()=>{changeScene(sc_helloThere);},
    click: ()=>{changeScene(sc_helloThere);},
    init:curveText(SC_title.querySelector('.titleText'))
}


function curveText(target){
    let str = target.textContent;
    //target.textContent = '';
    
    let divArray = [];
    for(let i = 0; i < str.length; i++){
        divArray.push(document.createElement('div'));
        divArray[i].textContent = str[i];
    }


}


//////////////////////// Scene: helloThere
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
    slowText(target.messages[target.currentMessage], target.textBox, ()=>{shakeTarget(target.odin)});

}
function continueText(target){
    if(slowTextRunning){
        finishSlowText();
        return;
    }
    if(target.currentMessage + 1 < target.messages.length){
        target.currentMessage++;
        slowText(target.messages[target.currentMessage], target.textBox,()=>{shakeTarget(target.odin)});
    }    
}


////////////////////////universal functions
function log(e){
//    console.log(e);
}