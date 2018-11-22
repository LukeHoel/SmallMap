var w = window.innerWidth;
var h = window.innerHeight;
var canvas = document.createElement("canvas");
canvas.style.width = w+'px';
canvas.style.height = h+'px';
var context;

function init() {
    //do canvas stuff
    this.canvas.width = w;
    this.canvas.height = h;
    context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    //run initial world draw
    drawWorld();
}

function fillPolygon(points, color) {

    //open path and move to starting point
    context.beginPath();
    context.moveTo(points[0][0], points[0][1]);
    //start going through points
    for (var i = 1; i < points.length; i++) {
        context.lineTo(points[i][0],points[i][1]);
    }
    //close path and draw
    context.closePath();
    context.fillStyle = color;
    context.fill();
}