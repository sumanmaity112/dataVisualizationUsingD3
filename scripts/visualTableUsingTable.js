var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var appendData = function (row, scale) {
    row.selectAll("td")
        .data(data)
        .enter()
        .append("td")
        .classed("cell", true)
        .text(function (text) {
            return scale(text);
        })
};
var appendRow = function (scale, title, table) {
    var row = table.append("tr").classed("row", true);
    row.append("th").classed("cell", true).text(title);
    appendData(row, scale);
};

var main = function () {
    var visualTable = d3.select("#container").append("table");
    appendRow(d3.scaleLinear().domain([1, 10]).range([1, 10]), 'Title', visualTable);
    appendRow(d3.scaleLinear().domain([1, 10]).range([1, 10]), 'N', visualTable);
    appendRow(d3.scalePow().exponent(2), 'N^2', visualTable);
    appendRow(d3.scaleLog().domain([1, 10]), 'log(N)', visualTable);
    appendRow(d3.scaleLog().domain([1, 10]).rangeRound([0, 1]), 'rounded log(N)', visualTable);
};

window.onload = main;