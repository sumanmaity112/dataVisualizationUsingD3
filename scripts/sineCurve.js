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
    var values = generateValuePoints();
    return function (tensionInPercentage) {
        d3.select(".line").remove();
        tensionInPercentage = tensionInPercentage || getTension();
        line = line.curve(d3.curveCardinal.tension(tensionScale(tensionInPercentage)));
        drawLine(svg, line, values, "line", true);
    }

};

var appendOptions = function (svg) {
    var optionContainer = d3.select("#container").append("div").classed("optionContainer", true);
    optionContainer.text('Tension').append("select").on("change", drawCurves(svg))
        .selectAll("option")
        .data(curves)
        .enter()
        .append("option")
        .text(function (curve) {
            return curve.name;
        });
};

var getTension = function () {
    var select = d3.select('select');
    var selectedIndex = select.property('selectedIndex');
    return curves[selectedIndex].value;
};

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
var line = d3.line()
    .x(function (d) {
        return XScale(d.x);
    })
    .y(function (d) {
        return YScale(d.y);
    });


var tensionScale = d3.scaleLinear()
    .domain([0, 100])
    .range([-1, 1]);

var generateChart = function () {
    var svg = d3.select("#container").append("svg")
        .attr("height", HEIGHT)
        .attr("width", WIDTH);
    drawAxis(svg, XAxis, translate(MARGIN, HEIGHT - MARGIN));
    drawAxis(svg, YAxis, translate(MARGIN, MARGIN));
    appendOptions(svg);
    drawCurves(svg)(0);
};

window.onload = generateChart;
