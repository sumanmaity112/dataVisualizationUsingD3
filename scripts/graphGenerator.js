var createChart = function (bars, numbers) {
    var selectedBars = bars
        .data(numbers, function (d) {
            return d.id;
        });

    selectedBars
        .enter()
        .append("div")
        .style("width", function (d) {
            return (d.value * 10) + "px";
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
        numbers.push({value: number, id: (new Date().getTime() + number.toString())})
    }
    return numbers;
};

window.onload = function () {
    var holder = d3.select("#container").append("div");
    var numbers = generateRandomNumbers(10);
    setInterval(function () {
        var bars = holder.selectAll(".bars");
        createChart(bars, numbers);
        numbers.shift();
        var number = getRandomNumber();
        numbers.push({value: number, id: (new Date().getTime() + number.toString())});
    }, 1000);
};