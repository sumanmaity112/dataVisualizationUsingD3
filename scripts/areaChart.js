const WIDTH = 600;
const HEIGHT = 600;
const MARGIN = 30;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;
var SVG;

var curves = [
    {name: "Linear Curve", value: d3.curveLinear},
    {name: "Closed Linear Curve", value: d3.curveLinearClosed},
    {name: "Step After Curve", value: d3.curveStepAfter},
    {name: "Basis Curve", value: d3.curveBasis},
    {name: "Cardinal Closed Curve", value: d3.curveCardinalClosed},
    {name: "Cardinal Curve", value: d3.curveCardinalOpen}
];


var valueGenerator = function (value) {
    return {x: value / 10, y: ((3 * Math.sin(value)) + 5) / 10}
};

var XScale = getLinearScale([0, 1.0], [0, INNER_WIDTH]);
var YScale = getLinearScale([0, 1.0], [INNER_HEIGHT, 0]);

var AREA = d3.area()
    .x(function (d) {
        return XScale(d.x);
    })
    .y0(INNER_HEIGHT)
    .y1(function (d) {
        return YScale(d.y);
    });
var LINE = getLine(XScale, YScale, "x", "y");

var drawArea = function () {
    var curve = getSelectedValue(d3.select("select"), curves);
    clearSVG();
    drawLine(SVG, AREA.curve(curve), VALUES, "area", translate(MARGIN, MARGIN));
    drawLine(SVG, LINE.curve(curve), VALUES, "line", translate(MARGIN, MARGIN));
    drawCircles(SVG, VALUES, 4.5);
};

var clearSVG = function () {
  d3.selectAll(".area").remove();
  d3.selectAll(".line").remove();
  d3.selectAll("circle").remove();
};

var generateChart = function () {
    appendOptions(d3.select("#container"), curves, drawArea);
    VALUES = generateValues(valueGenerator, 0, 10);
    SVG = d3.select("#container").append("svg")
        .attr("height", HEIGHT)
        .attr("width", WIDTH);
    drawAxis(SVG, d3.axisLeft(YScale), translate(MARGIN, MARGIN));
    drawAxis(SVG, d3.axisBottom(XScale), translate(MARGIN, HEIGHT - MARGIN));

};

window.onload = generateChart;
