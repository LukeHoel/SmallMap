//from https://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
//from https://stackoverflow.com/questions/667045/getpixel-from-html-canvas
function getPixel(imgData, index) {
    var i = index * 4, d = imgData.data;
    return [d[i], d[i + 1], d[i + 2], d[i + 3]] // returns array [R,G,B,A]
}
function getPixelXY(imgData, x, y) {
    return getPixel(imgData, y * imgData.width + x);
}