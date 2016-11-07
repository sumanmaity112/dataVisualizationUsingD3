var fontScale = d3.scaleLinear()
    .domain([0, 10])
    .range(["italic bold 12px/30px Georgia, serif", "italic bold 120px/180px Georgia, serif"]);

var addStyleToNumbers = function () {
    var container = d3.select("#container");
    var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    container.selectAll(".block")
        .data(data)
        .enter()
        .append("div")
        .classed("block", true)
        .style("font", function (value) {
            return fontScale(value) + "px";
        })
        .text(function (value) {
            return value;
        })
};

window.onload = addStyleToNumbers;