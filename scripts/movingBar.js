const TOTAL_NUMBER = 20;
var color = d3.scaleLinear()
    .domain([0, 100])
    .range([d3.rgb(165, 205, 230), d3.rgb(24, 44, 255)]);

var createChart = function (bars, numbers) {
    var selectedBars = bars
        .data(numbers, function (d) {
            return d.id;
        });

    selectedBars.enter()
        .append("div")
        .style("width", function (d) {
            return (d.value * 10) + "px";
        })
        .style("background-color", function (d, i) {
            return color(d.value);
        })
        .classed("bars", true)
        .text(function (d) {
            return d.value;
        });

    selectedBars.exit().remove();
};

var getRandomNumber = function () {
    return Math.ceil(Math.random() * 100);
};

var generateRandomNumbers = function (totalNumber) {
    var numbers = [];
    for (var counter = 0; counter < totalNumber; counter++) {
        var number = getRandomNumber();
        numbers.push({value: number, id: (new Date().getTime() + number.toString())});
    }
    return numbers;
};

window.onload = function () {
    var holder = d3.select("#container").append("div");
    var numbers = generateRandomNumbers(TOTAL_NUMBER);
    setInterval(function () {
        var bars = holder.selectAll(".bars");
        createChart(bars, numbers);
        numbers.shift();
        var number = getRandomNumber();
        numbers.push({value: number, id: (new Date().getTime() + number.toString())});
    }, 1000);
};