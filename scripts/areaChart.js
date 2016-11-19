const WIDTH = 600;
const HEIGHT = 600;
const MARGIN = 30;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var valueGenerator = function (value) {
    return {x: value / 10, y: ((3 * Math.sin(value)) + 5) / 10}
};

var XScale = getScale([0, 1.0], [0, INNER_WIDTH]);
var YScale = getScale([0, 1.0], [INNER_HEIGHT, 0]);

var area = d3.area()
    .x(function (d) {
        return XScale(d.x);
    })
    .y0(INNER_HEIGHT)
    .y1(function (d) {
        return YScale(d.y);
    });


var generateChart = function () {
    var values = generateValues(valueGenerator, 0, 10);
    var svg = d3.select("#container").append("svg")
        .attr("height", HEIGHT)
        .attr("width", WIDTH);
    var line = getLine(XScale, YScale, "x", "y");
    drawAxis(svg, d3.axisLeft(YScale), translate(MARGIN, MARGIN));
    drawAxis(svg, d3.axisBottom(XScale), translate(MARGIN, HEIGHT - MARGIN));

    drawLine(svg, line, values, "line", translate(MARGIN, MARGIN));
    drawLine(svg, area, values, "area", translate(MARGIN + 1, MARGIN));
    drawCircles(svg, values, 4.5);

};

window.onload = generateChart;
