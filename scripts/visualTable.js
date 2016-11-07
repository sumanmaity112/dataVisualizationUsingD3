var LOG = d3.scaleLog().domain([1, 10]);
var FORMAT = d3.format(".4f");
var POW = d3.scalePow().exponent(2);


var insertData = function (visualTable, data, generator) {
    visualTable.append("div")
        .classed("row", true)
        .selectAll("data")
        .data(data)
        .enter()
        .append("div")
        .classed("data", true)
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

function createTable(visualTable, data) {
    insertData(visualTable, ["Title"].concat(data), function (d) {
        return d;
    });
    insertData(visualTable, ["n"].concat(data), function (d) {
        return d;
    });
    insertData(visualTable, ["n^2"].concat(data), POW);
    insertData(visualTable, ["log(n)"].concat(data), getLog);
    insertData(visualTable, ["rounded log(n)"].concat(data), getRoundedLog);
}
var main = function () {
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var visualTable = d3.select("#container").append("div").attr("id", "visualTable");

    createTable(visualTable, data);
};

window.onload = main;