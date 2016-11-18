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

var drawLine = function (svg, line, data, className, shouldCreateCircle) {
    svg.append("g").append("path")
        .datum(data)
        .attr("d", line)
        .attr('transform', translate(MARGIN, MARGIN))
        .classed(className, true);

    shouldCreateCircle ? drawCircles(svg, data) : d3.selectAll(".circle").remove();
};

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

var drawLines = function (shouldCreateCircle) {
    clearSVG();
    var line = d3.line()
        .x(function (d) {
            return XScale(d.x);
        })
        .y(function (d) {
            return YScale(d.y);
        });

    drawLine(SVG, line, VALUES.converted, "line convertedLine", shouldCreateCircle);
    drawLine(SVG, line, VALUES.sine, "line sineLine", shouldCreateCircle);
};

var drawCurve = function (svg, data, curve, className) {
    svg.append("g").append("path")
        .datum(data)
        .attr("d", d3.line()
            .curve(curve)
            .x(function (d) {
                return XScale(d.x);
            })
            .y(function (d) {
                return YScale(d.y);
            })
        )
        .attr('transform', translate(MARGIN, MARGIN))
        .classed(className, true);
};

var clearSVG = function () {
    SVG.selectAll('.line').remove();
};

var drawCurves = function (curve) {
    clearSVG();
    curve = d3[curve];
    drawCurve(SVG, VALUES.converted, curve, "line convertedLine");
    drawCurve(SVG, VALUES.sine, curve, "line sineLine");
    drawCircles(SVG, VALUES.converted);
    drawCircles(SVG, VALUES.sine);
};

var generateChart = function () {
    VALUES = generateValuePoints(DATA);
    SVG = d3.select("#container").append("svg")
        .attr("height", HEIGHT)
        .attr("width", WIDTH);
    drawAxis(SVG, XAxis, translate(MARGIN, HEIGHT - MARGIN));
    drawAxis(SVG, YAxis, translate(MARGIN, MARGIN));
};

window.onload = generateChart;