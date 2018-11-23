var shouldRandomizeSeed = false;

var masterSeed = shouldRandomizeSeed ? Math.floor((Math.random() * 105027)) : 12345678; //just choose the same one for dev
var worldSections = window.worldSections;

console.log(masterSeed);

function continents() {

    var rand = new Random(masterSeed);

    var amount = Math.floor(rand.nextFloat() * 10);

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

        fillPolygon(points, "green");
    }
}