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

var colorScale = getOrdinalScale(["line", "circle", "triangle", "square"], ["gray", "red", "green", "steelblue"]);
var xScale = getLinearScale([0, 3], [0, 450]);

var getLine = function () {
    return " M" + DIMENSION + " -" + DIMENSION / 2 + " L" + 0 + " " + DIMENSION / 2;
};

var drawShape = function (svg, shapeInformation, numberOfShape) {
    svg.append("g")
        .attr("transform", "translate(" + (xScale(numberOfShape) + shapeInformation.padding) + "," + DIMENSION + ")")
        .append("path")
        .classed("shape", true)
        .attr("d", shapeInformation.shape)
        .style("stroke", function () {
            return colorScale(shapeInformation.name);
        });
};

var drawShapes = function () {
    var svg = appendSvg(d3.select("#container"), 1000, 700);
    var shapes = [{shape: getLine(), padding: 0, name: "line"}, {shape: getCircle(), padding: PADDING, name: "circle"},
        {shape: getSquare(), padding: PADDING, name: "square"}, {
            shape: getTriangle(),
            padding: PADDING,
            name: "triangle"
        }];

    shapes.forEach(function (shape, index) {
        drawShape(svg, shape, index);
    });

};

window.onload = drawShapes;