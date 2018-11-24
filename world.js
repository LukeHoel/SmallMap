var worldSections = 1000000;
var worldRegions = 200;

var worldPolygonArray = [];
var worldSectionsArray;

var viewPort = {
    start: { x: 0, y: 0 },
    end: { x: worldSections, y: worldSections }
}

var initRenderLevels = [{ function: "continents", scope:"world"}];

function initWorld() {

    //don't choose yet, just do them all
    for (var i = 0; i < initRenderLevels.length; i++) {
        if (isFunction(window[initRenderLevels[i].function])) {
            switch (initRenderLevels[i].scope) {
                case ("world"):
                    window[initRenderLevels[i].function]();//run the method
                    break;
                case ("region"):
                    //get renderable regions and pass into rendering method as array
                    var regions = [];
                    window[initRenderLevels[i].function](regions);//run the method
                    break;
            }
        } else {
            console.log(initRenderLevels[i]+" is not a valid render layer, skipping");
        }
    }

}

function getWorldUnit() {
    var unitX = windowWidth / worldSections;
    var unitY = windowHeight / worldSections;
    return [unitX, unitY];
}

function getRegionUnit() {
    var unitX = windowWidth / worldRegions;
    var unitY = windowHeight / worldRegions;
    return [Math.floor(unitX), Math.floor(unitY)];
}

function getWorldPosition(point) {

    var unit = getWorldUnit();

    return [
        point[0] * unit[0],
        point[1] * unit[1]
    ];
}

function scanBoundsToArray(x, y, w, h, divisionWidth, divisionHeight) {
    var ret = [];

    for (var j = 0; j < w; j += divisionWidth) {
        var imageData = context.getImageData(x, j, w, h);
        var arr = [];
        for (var i = 0; i < w; i += divisionWidth) {
            var pixelData = getPixel(imageData, i);
            var filled = 0;
            if (pixelData[0] < 250 || pixelData[1] < 250 || pixelData[2] < 250) {
                filled = 1;
            }
            arr.push(filled);
        }
        ret.push(arr);
    }
    return ret;
}

function drawSectionsWithinBounds(x, y, w, h) {
    for (var i = 0; i < worldSectionsArray.length; i++) {
        for (var k = 0; k < worldSectionsArray[i].length; k++) {
            if (worldSectionsArray[i][k] == 1) {
                if (i > y && i < y + h) {//is within x bounds
                    if (k > x && k < x + w) {
                        var regionUnit = getRegionUnit();
                        context.fillStyle = "green";
                        context.fillRect(regionUnit[0] * k, regionUnit[0] * i, regionUnit[0], regionUnit[0]);
                    }
                }
            }
        }
    }
}