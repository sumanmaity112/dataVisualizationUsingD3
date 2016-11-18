const WIDTH = 600;
const HEIGHT = 600;
const MARGIN = 30;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var XScale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, INNER_WIDTH]);

var YScale = d3.scaleLinear()
    .domain([0, 1])
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

var drawCircles = function (svg, data) {
    var g = svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN));

    g.selectAll('circle').data(data)
        .enter().append('circle')
        .classed("circle", true)
        .attr('r', 4.5);

    var circles = g.selectAll('circle');

    circles.attr('cx', function (d) {
            return XScale(d.x)
        })
        .attr('cy', function (d) {
            return YScale(d.y)
        });

    g.selectAll('circle').exit().remove();
};

var drawLine = function (svg, line, data, className) {
    svg.append("g").append("path")
        .datum(data)
        .attr("d", line)
        .attr('transform', translate(MARGIN, MARGIN))
        .classed(className, true);

    drawCircles(svg, data);
};

var generateValuePoints = function () {
    var sineValues = [];
    for (var counter = 0; counter <= 9; counter++) {
        var y = (Math.sin(3 * counter) + 1) / 2;
        sineValues.push({x: counter, y: y});
    }
    return sineValues
};

var generateChart = function () {
    var line = d3.line()
        .x(function (d) {
            return XScale(d.x);
        })
        .y(function (d) {
            return YScale(d.y);
        });

    var values = generateValuePoints();
    var svg = d3.select("#container").append("svg")
        .attr("height", HEIGHT)
        .attr("width", WIDTH);
    drawAxis(svg, XAxis, translate(MARGIN, HEIGHT - MARGIN));
    drawAxis(svg, YAxis, translate(MARGIN, MARGIN));
    drawLine(svg, line, values, "line", true);
};

window.onload = generateChart;
