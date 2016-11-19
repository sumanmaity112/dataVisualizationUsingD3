const WIDTH = 1000;
const HEIGHT = 600;
const MARGIN = 30;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var data = [1, 1, 2, 2, 1, 2, 1];
var arcs = d3.pie()(data);

var colorScale = d3.scaleOrdinal()
    .domain([0,data.length])
    .range(d3.schemeCategory20);

var generateChart = function () {
    var svg = d3.select("#container").append("svg")
        .attr("height", HEIGHT)
        .attr("width", WIDTH);

    var arc = d3.arc()
        .outerRadius(INNER_HEIGHT / 2)
        .innerRadius(0);
    var pieG = svg.selectAll("g")
        .data(data)
        .enter()
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

window.onload = generateChart;

