var shouldRandomizeSeed = true;

//good seeds list
var niceSeeds = [97332];

var masterSeed = shouldRandomizeSeed ? Math.floor((Math.random() * 105027)) : 12345678; //just choose the same one for dev
var worldSections = window.worldSections;

console.log(masterSeed);

function continents() {

    var rand = new Random(masterSeed);

    var amount = Math.floor(rand.nextFloat() * 10);
    context.fillStyle = "white";
    context.fillRect(0, 0, windowWidth, windowHeight);

    for (var j = 0; j < amount+1; j++) {

        var pointCount = 5 + Math.floor(rand.nextFloat() * 10);
        var size = 100000 + (rand.nextFloat() * 100000);
        var offsetX = (rand.nextFloat() * worldSections);
        var offsetY = (rand.nextFloat() * worldSections);
        var deviation = 100000;

        var points = [];

        //make a certain-number-of-points-agon
        for (var i = 0; i < pointCount; i++) {
            points.push([
                Math.sin(((360 / pointCount) * i) * (Math.PI / 180)) * size,
                Math.cos(((360 / pointCount) * i) * (Math.PI / 180)) * size,
            ]);
        }
        //offset it and move it around randomly
        for (var i = 0; i < pointCount; i++) {
            points[i][0] += offsetX + (rand.nextFloat() * deviation) - deviation/2;
            points[i][1] += offsetY + (rand.nextFloat() * deviation) - deviation/2;
        }

        fillPolygon(points, "black");
        worldPolygonArray.push(points);//save for later if we need it
    }
    var regionUnit = getRegionUnit()
    worldSectionsArray = scanBoundsToArray(0, 0, windowWidth, windowHeight, Math.floor(regionUnit[0]));//save sections to make it easy to draw later
    //clearCanvas();
}

function test() {


    var cutoff = .5;

    for (var i = 0; i < 100; i++) {
        var rand = new Random((masterSeed * (i*12324)));
        var num = rand.nextFloat();
        if (num > cutoff) {
            fillPolygon([[i * 10000, 10000], [(i * 10000) + 10000, 10000], [[(i * 10000) + 10000, 20000]], [i * 10000, 20000]], "blue");
        }
    }

}