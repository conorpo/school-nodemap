function draw(){
    map.ctx.setTransform(1, 0, 0, 1, 0, 0);
    map.ctx.clearRect(0,0,map.canvas.width,map.canvas.height);
    map.ctx.translate(map.currentOrigin.x,map.currentOrigin.y);
    map.ctx.scale(map.currentOrigin.scale,map.currentOrigin.scale);
    map.ctx.drawImage(map.img,0,0);
    for(i of menu.schedule){
        if(i.ref != -1){
            let node  =  nodemap.nodes[i.ref];
            map.ctx.beginPath();
            map.ctx.arc(node.x+660,node.y+453,10,0,Math.PI*2);
            map.ctx.closePath();
            map.ctx.fillStyle = i.color;
            map.ctx.fill();
        }
    }
    window.requestAnimationFrame(draw);
}
function getMousePos(evt, canv) {
    var rect = canv.getBoundingClientRect(), // abs. size of element
    scaleX = canv.width / rect.width,    // relationship bitmap vs. element for X
    scaleY = canv.height / rect.height;  // relationship bitmap vs. element for Y

    return {
    x: ((evt.clientX - rect.left) * scaleX - map.currentOrigin.x)/map.currentOrigin.scale,   // scale mouse coordinates after they have
    y: ((evt.clientY - rect.top) * scaleY - map.currentOrigin.y)/map.currentOrigin.scale,
    ax: (evt.clientX - rect.left) * scaleX,
    ay: (evt.clientY - rect.top) * scaleY  // been adjusted to be relative to element
    };
}
function zoom(evt,cords){
    cords = cords || getMousePos({clientX:map.w/2,clientY:map.h/2},map.canvas);
    let oldScale = map.currentOrigin.scale;
    if(evt.deltaY>0 && map.currentOrigin.scale/1.05 > 0.01){
        map.currentOrigin.scale/=1.05;
    }
    else if(evt.deltaY<0 && map.currentOrigin.scale * 1.05 < 10){
        map.currentOrigin.scale*=1.05;
    }
    let scaleChange = map.currentOrigin.scale - oldScale;
    map.currentOrigin.x-=(cords.x*scaleChange);
    map.currentOrigin.y-=(cords.y*scaleChange);
}

map.canvas.addEventListener('wheel',function(evt){
    zoom(evt,map.coors);
},false);
map.canvas.addEventListener('mousemove', function(evt){
    map.coors = getMousePos(evt,map.canvas);
    if(map.screenBeingDragged){
        map.currentOrigin.x = map.coors.ax - map.originOffset.x;
        map.currentOrigin.y = map.coors.ay - map.originOffset.y;
    }
},false);
map.canvas.addEventListener('mousedown', function(evt){
    console.log("test");
    map.originOffset = {x:map.coors.ax-map.currentOrigin.x,y:map.coors.ay-map.currentOrigin.y};
    map.screenBeingDragged = true;
},false);
map.canvas.addEventListener('mouseup', function(evt){
    map.screenBeingDragged=false;
},false);
window.requestAnimationFrame(draw);
