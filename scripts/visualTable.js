var LOG = d3.scaleLog().domain([1, 10]);
var ROUNDED_LOG = d3.scaleLog().domain([1, 10]).rangeRound([0, 1]);
var FORMAT = d3.format(".4f");
var POW = d3.scalePow().exponent(2);
var getLog = function (value) {
    return FORMAT(LOG(value));
};

var generateSameValue = function (value) {
    return value;
};
var generators = [generateSameValue, generateSameValue, POW, getLog, ROUNDED_LOG];
var columnHeaders = ["Title", "n", "n^2", "log(n)", "rounded log(n)"];
var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var insertData = function (visualTable, data, generator) {
    visualTable.append("div")
        .classed("row", true)
        .selectAll(".cell")
        .data(data)
        .enter()
        .append("div")
        .classed("cell", true)
        .text(function (value) {
            return isNaN(value) ? value : generator(value);
        });
};

var main = function (data, generators, columnHeaders) {
    return function () {
        var visualTable = d3.select("#container").append("div").attr("id", "visualTable");
        generators.forEach(function (generator, index) {
            insertData(visualTable, new Array(columnHeaders[index]).concat(data), generator);
        });
    }
};

window.onload = main(data, generators, columnHeaders);