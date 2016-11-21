const WIDTH = 600;
const HEIGHT = 600;
const MARGIN = 30;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var curves = [
    {name: "0", value: 0},
    {name: "20", value: 20},
    {name: "40", value: 40},
    {name: "60", value: 60},
    {name: "80", value: 80},
    {name: "100", value: 100}
];

var drawCurves = function (svg) {
    var values = generateValues(valueGenerator, 0, 9);
    return function (tensionInPercentage) {
        d3.select(".line").remove();
        tensionInPercentage = tensionInPercentage || getSelectedValue(d3.select('select'), curves);
        line = line.curve(d3.curveCardinal.tension(tensionScale(tensionInPercentage)));
        drawLine(svg, line, values, "line", translate(MARGIN, MARGIN));
        drawCircles(svg, values);
    }
};

var XScale = getLinearScale([0, 10], [0, INNER_WIDTH]);
var YScale = getLinearScale([0, 1], [INNER_HEIGHT, 0]);

var valueGenerator = function (value) {
    var y = (Math.sin(3 * value) + 1) / 2;
    return {x: value, y: y}
};

var line = getLine(XScale, YScale, "x", "y");

var tensionScale = d3.scaleLinear()
    .domain([0, 100])
    .range([-1, 1]);

var generateChart = function () {
    var selector = d3.select("#container");
    var svg = appendSvg(selector, HEIGHT, WIDTH);
    drawAxis(svg, d3.axisBottom(XScale), translate(MARGIN, HEIGHT - MARGIN));
    drawAxis(svg, d3.axisLeft(YScale), translate(MARGIN, MARGIN));
    appendOptions(selector, curves, drawCurves(svg));
    drawCurves(svg)(0);
};

window.onload = generateChart;
