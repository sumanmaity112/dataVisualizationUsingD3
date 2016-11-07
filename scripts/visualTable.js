var LOG = d3.scaleLog().domain([1, 10]);
var FORMAT = d3.format(".4f");
var POW = d3.scalePow().exponent(2);

var insertData = function (visualTable, data, generator) {
    visualTable.append("div")
        .classed("row", true)
        .selectAll("cell")
        .data(data)
        .enter()
        .append("div")
        .classed("cell", true)
        .text(function (value) {
            return isNaN(value) ? value : generator(value);
        });
};

var getLog = function (value) {
    return FORMAT(LOG(value));
};

var getRoundedLog = function (value) {
    return Math.round(LOG(value));
};

var createTable = function (visualTable, data, generators, columnHeaders) {
    generators.forEach(function (generator, index) {
        insertData(visualTable, new Array(columnHeaders[index]).concat(data), generator);
    });
};

var main = function () {
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var visualTable = d3.select("#container").append("div").attr("id", "visualTable");

    var generateSameValue = function (value) {
        return value;
    };
    var generators = [generateSameValue, generateSameValue, POW, getLog, getRoundedLog];
    var columnHeaders = ["Title", "n", "n^2", "log(n)", "rounded log(n)"];
    createTable(visualTable, data, generators, columnHeaders);
};

window.onload = main;