const WIDTH = 1000;
const HEIGHT = 600;
const MARGIN = 30;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;
var SVG;

var data = [1, 1, 2, 2, 1, 2, 1];
var domain = generateValues(function (index) {
    return index;
}, 0, data.length);
var colorScale = d3.scaleOrdinal()
    .domain(domain)
    .range(d3.schemeCategory20);

var options = [
    {name: "Pie Chart", value: {innerRadius: 0, endAngle: 360}},
    {name: "Half Pie Chart", value: {innerRadius: 0, endAngle: Math.PI}},
    {name: "Donut Chart", value: {innerRadius: INNER_HEIGHT / 4, endAngle: 360}},
    {name: "Half Donut Chart", value: {innerRadius: INNER_HEIGHT / 4, endAngle: Math.PI}}
];

var drawChart = function () {
    d3.select("#chart").remove();
    var selectedValues = getSelectedValue(d3.selectAll("select"), options);
    var arcs = d3.pie().sort(null)
        .endAngle(selectedValues.endAngle)(data);
    var arc = d3.arc()
        .outerRadius(INNER_HEIGHT / 2)
        .innerRadius(selectedValues.innerRadius);
    var pieG = SVG.append("g").attr("id", "chart")
        .append("g")
        .attr("transform", "translate(" + [INNER_WIDTH / 2, INNER_HEIGHT / 2] + ")");

    pieG.selectAll(".arc").data(arcs)
        .enter().append("g").classed("arc", true)
        .append("path")
        .attr("d", arc)
        .attr("fill", function (d) {
            return colorScale(d.index)
        })
};
var generateChart = function () {
    var selector = d3.select("#container");
    appendOptions(selector, options, drawChart);
    SVG = appendSvg(selector, HEIGHT, WIDTH);
};

window.onload = generateChart;

