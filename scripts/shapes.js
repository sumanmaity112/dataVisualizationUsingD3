const DIMENSION = 100;
const PADDING = 50;

var getCircle = function () {
    var area = (22 / 7) * (DIMENSION / 2) * (DIMENSION / 2);
    return d3.symbol().type(d3.symbolCircle).size(area);
};

var getSquare = function () {
    var area = DIMENSION * DIMENSION;
    return d3.symbol().type(d3.symbolSquare).size(area);
};

var getTriangle = function () {
    var area = (DIMENSION * DIMENSION) / 2;
    return d3.symbol().type(d3.symbolTriangle).size(area);
};

var getLine = function () {
    return "M -" + 0 + " " + DIMENSION / 2 + " L100" + " -" + DIMENSION / 2;
};

var drawShape = function (svg, shape, numberOfShape) {
    var padding = PADDING * numberOfShape;
    var startingPoint = DIMENSION * (numberOfShape);
    svg.append("g")
        .attr("transform", "translate(" + (startingPoint + padding) + "," + DIMENSION + ")")
        .append("path")
        .classed("shape", true)
        .attr("d", shape);
};

var drawShapes = function () {
    var svg = d3.select("#container").append("svg")
        .attr("width", 1000)
        .attr("height", 700);

    var shapes = [getLine(), getCircle(), getSquare(), getTriangle()];

    shapes.forEach(function (shape, index) {
        drawShape(svg, shape, index);
    });

};

window.onload = drawShapes;