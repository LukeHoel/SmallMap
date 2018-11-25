var worldSections = 1000000;
var worldRegions = 200;

var worldRegionsArray;

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

    for (var j = 0; j < h; j += divisionHeight) {
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

function drawSection(x, y) {
    var regionUnit = getRegionUnit();

    var rand = new Random(masterSeed);

    var divs = 50+(rand.nextFloat()*50);

    var h1 = (x * y)%divs;
    var h2 = (y * x)%divs;
    var height1 = (h1 + h2) / 2;

    var rand = new Random(masterSeed + x * y);
    var divs = rand.nextFloat()*10;

    h1 = (x+rand.nextFloat()*divs) % (worldRegionsArray.length / divs);
    h2 = (y+rand.nextFloat()*divs) % (worldRegionsArray.length / divs);
    var height2 = (h1 + h2) / 2;//combine into one wavy grid

    var divs2 = 70 + (rand.nextFloat() * 50);
    h1 = rand.nextFloat() * x % divs2;
    h2 = rand.nextFloat() * y % divs2;
    var height3 = (h1 + h2) / 2;

    var height = (height1 + height2 + height3) / 3;//average terrain height

    context.fillStyle = "rgba(" + height + "," + height + "," + height + ",255)";
    context.fillRect(regionUnit[0] * x, regionUnit[1] * y, regionUnit[0], regionUnit[1]);
}

function drawSectionsWithinBounds(x, y, w, h) {

    w *= worldRegionsArray.length / worldRegions;
    h *= worldRegionsArray.length / worldRegions;

    for (var i = x; i < worldRegionsArray.length && i < x + w; i++) {
        for (var k = y; k < worldRegionsArray[i].length && k < y + h; k++) {
            if (worldRegionsArray[i][k] == 1) {
                drawSection(k, i);//swap x and y for drawing
            }
        }
    }
}