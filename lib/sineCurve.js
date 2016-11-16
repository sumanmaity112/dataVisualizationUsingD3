var INNER_WIDTH = 800;
var INNER_HEIGHT = 600;
var WIDTH = 1000;
var HEIGHT = 700;

var XScale = d3.scaleLinear()
    .domain([0, 1.0])
    .range([100, INNER_WIDTH]);

var YScale = d3.scaleLinear()
    .domain([0, 1.0])
    .range([INNER_HEIGHT, 0]);

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
    svg.append("path")
        .datum(data)
        .attr("d", line)
        .classed("line", true);
};

window.onload = generateChart;
