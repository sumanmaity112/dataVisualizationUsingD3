const WIDTH = 600;
const HEIGHT = 600;
const MARGIN = 30;
const DIVIDED_BY = 10;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;
const SHIFTED_BY = 5;

var DATA = [{x: 0, y: 5}, {x: 1, y: 9}, {x: 2, y: 7}, {x: 3, y: 5},
    {x: 4, y: 3}, {x: 6, y: 4}, {x: 7, y: 2}, {x: 8, y: 3}, {x: 9, y: 2}];
var SVG, VALUES;

var curves = [
    {name: "Linear Curve", value: d3.curveLinear},
    {name: "Closed Linear Curve", value: d3.curveLinearClosed},
    {name: "Step After Curve", value: d3.curveStepAfter},
    {name: "Basis Curve", value: d3.curveBasis},
    {name: "Bundle Curve", value: d3.curveBundle},
    {name: "Cardinal Closed Curve", value: d3.curveCardinalClosed},
    {name: "Cardinal Curve", value: d3.curveCardinal}
];

var XScale = getScale([0, 1.0], [0, INNER_WIDTH]);
var YScale = getScale([0, 1], [INNER_HEIGHT, 0]);

var YAxis = d3.axisLeft(YScale);
var XAxis = d3.axisBottom(XScale);
var line = getLine(XScale, YScale, "x", "y");

var generateValuePoints = function (data) {
    var convertedValues = [];
    var sineValues = [];
    for (var counter = 0; counter <= 9; counter++) {
        sineValues.push({x: counter / DIVIDED_BY, y: (Math.sin(counter) + SHIFTED_BY) / DIVIDED_BY});
    }

    data.forEach(function (value) {
        convertedValues.push({x: value.x / DIVIDED_BY, y: value.y / DIVIDED_BY});
    });
    return {converted: convertedValues, sine: sineValues};
};

var drawLines = function (line, shouldCreateCircle) {
    clearSVG();
    drawLine(SVG, line, VALUES.converted, "line convertedLine", translate(MARGIN, MARGIN));
    drawLine(SVG, line, VALUES.sine, "line convertedLine", translate(MARGIN, MARGIN));

    if (shouldCreateCircle)
        drawCircles(SVG, VALUES.sine.concat(VALUES.converted), 4.5);
    else
        d3.selectAll(".circle").remove();
};

var clearSVG = function () {
    SVG.selectAll('.line').remove();
};

var drawCurves = function () {
    clearSVG();
    var curve = getSelectedValue(d3.select('select'), curves);
    drawLines(line.curve(curve), true);
};

var generateChart = function () {
    appendOptions(d3.select("#container"), curves, drawCurves);
    VALUES = generateValuePoints(DATA);
    SVG = d3.select("#container").append("svg")
        .attr("height", HEIGHT)
        .attr("width", WIDTH);
    drawAxis(SVG, XAxis, translate(MARGIN, HEIGHT - MARGIN));
    drawAxis(SVG, YAxis, translate(MARGIN, MARGIN));
};

window.onload = generateChart;
