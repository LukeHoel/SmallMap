var world = [];//pixels

var renderLevels = ["continents"];

function drawWorld() {

    //don't choose yet, just do them all
    for (var i = 0; i < renderLevels.length; i++) {
        if (isFunction(window[renderLevels[i]])){
            window[renderLevels[i]]();//run the method
        } else {
            console.log(renderLevels[i]+" is not a valid function, skipping");
        }
    }

}