var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var canvas = document.createElement("canvas");
canvas.style.width = windowWidth+'px';
canvas.style.height = windowHeight+'px';
var context;

function init() {
    //do canvas stuff
    this.canvas.width = windowWidth;
    this.canvas.height = windowHeight;
    context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    //run initial world draw
    drawWorld();
}

function fillPolygon(points, color) {

    //open path and move to starting point
    context.beginPath();

    var point = getWorldPosition(points[0]);

    context.moveTo(point[0], point[1]);
    //start going through points
    for (var i = 1; i < points.length; i++) {
        point = getWorldPosition(points[i]);

        context.lineTo(point[0],point[1]);
    }
    //close path and draw
    context.closePath();
    context.fillStyle = color;
    context.fill();
}