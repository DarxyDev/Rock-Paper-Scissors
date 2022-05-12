//node/element references
//const gbBackground = document.getElementById('gbBackground');


//NOTES::: add image through js then add gbBackground as class. onload run main
const mainScreen = document.getElementById('mainScreen');
const mainContainer = document.getElementById('mainContainer');
const vs = document.getElementById('viewScreen');


window.onresize = setWidthToHeight;

function setWidthToHeight(){
    mainScreen.style.width = `${mainScreen.offsetHeight}px`;
    // console.log(`Height: ${mainScreen.offsetHeight}\nWidth: ${mainScreen.offsetWidth}`);
}




//initialization of variables
// const gbImage = new Image();
//     gbImage.src = gbBackground.src;
// const gbInitialWidth = 1920;
// const fullVSWidth = 615;

// resizeViewScreenWidth();

// window.onresize = resizeViewScreenWidth;

// function resizeViewScreenWidth(){
//      vs.style.width = `${fullVSWidth * getGbWidthScale()}px`;
// }

// function getGbWidthScale(){
//     return gbBackground.offsetWidth / gbInitialWidth;
// }
