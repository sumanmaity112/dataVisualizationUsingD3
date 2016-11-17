const WIDTH = 600;
const HEIGHT = 600;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var XScale = d3.scaleLinear()
    .domain([0, 1.0])
    .range([0, INNER_WIDTH]);

var YScale = d3.scaleLinear()
    .domain([0, 1.0])
    .range([INNER_HEIGHT, 0]);

var YAxis = d3.axisLeft(YScale);
var XAxis = d3.axisBottom(XScale);

var translate = function (x, y) {
    return "translate(" + x + "," + y + ")";
};

var drawAxis = function (svg, axis, translator) {
    svg.append("g")
        .call(axis)
        .attr('transform', translator)
        .classed("axis", true);
};

var drawLine = function (svg, line, data) {
    svg.append("g").append("path")
        .datum(data)
        .attr("d", line)
        .attr('transform', translate(MARGIN, MARGIN))
        .classed("line", true);
};

var generateChart = function () {
    var svg = d3.select("#container").append("svg")
        .attr("height", HEIGHT)
        .attr("width", WIDTH);

    var data = [{x: 0, y: 5}, {x: 1, y: 9}, {x: 2, y: 7}, {x: 3, y: 5},
        {x: 4, y: 3}, {x: 6, y: 4}, {x: 7, y: 2}, {x: 8, y: 3}, {x: 9, y: 2}];

    var line = d3.line()
        .x(function (d) {
            return XScale(d.x / 10);
        })
        .y(function (d) {
            return YScale(d.y / 10);
        });

    var sineLine = d3.line()
        .x(function (d) {
            return XScale(d.x / 10);
        })
        .y(function (d) {
            return YScale((Math.sin(d.x) + 5) / 10);
        });

    drawAxis(svg, XAxis, translate(MARGIN, HEIGHT - MARGIN));
    drawAxis(svg, YAxis, translate(MARGIN, MARGIN));
    drawLine(svg, line, data);
    drawLine(svg, sineLine, data);
};

window.onload = generateChart;
