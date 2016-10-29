var data = [
    {name: 'ramesh', subject: 'maths', score: 87},
    {name: 'suresh', subject: 'maths', score: 45},
    {name: 'pokemon', subject: 'english', score: 65},
    {name: 'mary', subject: 'kannada', score: 44},
    {name: 'riya', subject: 'science', score: 72},
    {name: 'katie', subject: 'social studies', score: 82},
    {name: 'katie', subject: 'maths', score: 98},
    {name: 'ramesh', subject: 'bengali', score: 25},
    {name: 'suresh', subject: 'science', score: 55},
    {name: 'riya', subject: 'tamil', score: 75},
    {name: 'pokemon', subject: 'sports', score: 95},
    {name: 'pokemon', subject: 'social studies', score: 32}
];

var uniqueSubjects = [];

var color = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(uniqueSubjects);

var widthScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 600]);

var createChart = function (container, data) {
    container.selectAll(".bars").data(data).enter()
        .append("div")
        .classed("bars", true)
        .classed("radial-corner", true)
        .text(function (d) {
            return d.name + " " + d.score;
        })
        .style("width", function (d) {
            return widthScale(d.score) + "px";
        })
        .style("background-color", function (d) {
            return color(d.subject)
        });
};

var sortBy = function (fieldName) {
    var bars = d3.selectAll(".bars");
    bars.sort(function (recent, previous) {
        if (recent[fieldName] < previous[fieldName])
            return -1;
        return recent[fieldName] > previous[fieldName] ? 1 : recent.score - previous.score;
    });
};


var getUniqueSubjects = function (data) {
    var subjects = {};
    data.forEach(function (d) {
        subjects[d.subject] = true;
    });
    uniqueSubjects = Object.keys(subjects);
    return uniqueSubjects;
};

var createLegend = function (data) {
    var subjects = getUniqueSubjects(data);
    var innerHtml = "";
    subjects.forEach(function (subject) {
        innerHtml += "<div style='background-color: " + color(subject) + "' class='legend floating-block'>" + subject + "</div>";
    });
    document.getElementById("subject-legend").innerHTML += innerHtml;
};

window.onload = function () {
    createLegend(data);
    createChart(d3.select("#container"), data);
};