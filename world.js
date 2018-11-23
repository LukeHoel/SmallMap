var worldObjects = [];//pixels

var worldSections = 1000000;

var viewPort = {
    start: { x: 0, y: 0 },
    end: { x: worldSections, y: worldSections }
}

var renderLevels = ["continents"];

function drawWorld() {

    //don't choose yet, just do them all
    for (var i = 0; i < renderLevels.length; i++) {
        if (isFunction(window[renderLevels[i]])){
            window[renderLevels[i]]();//run the method
        } else {
            console.log(renderLevels[i]+" is not a valid render layer, skipping");
        }
    }

}

function getWorldPosition(point) {

    var unitX = windowWidth / worldSections;
    var unitY = windowHeight / worldSections;

    return [
        point[0] * unitX,
        point[1] * unitY
    ];
}