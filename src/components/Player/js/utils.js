let swiper = (x) =>{
    document.onmousemove = (e) =>{
        console.log(e.pageX);
    }
    
}
function move(e){
    console.log('move');
}

function clearMove(){
    document.onmousemove = null;
}

function getStyle(element, attr) {
    let pattern = /([\-\+]?\d*\.\d*)|((\d*))/;
    if(element.currentStyle) {
            return parseFloat(element.currentStyle[attr].match(pattern)[0]);
    } else {
            return parseFloat(getComputedStyle(element, false)[attr].match(pattern)[0]);
    }
}


export {swiper,clearMove,getStyle};