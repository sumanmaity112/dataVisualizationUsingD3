var getLinearScale = function (domain, range) {
    return d3.scaleLinear()
        .domain(domain)
        .range(range);
};

var translate = function (x, y) {
    return "translate(" + x + "," + y + ")";
};

var drawAxis = function (svg, axis, translator) {
    svg.append("g")
        .call(axis)
        .attr('transform', translator)
        .classed("axis", true);
};

var drawCircles = function (svg, data, radius) {
    radius = radius || 3;
    var g = svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN));

    g.selectAll('circle').data(data)
        .enter().append('circle')
        .classed("circle", true)
        .attr('r', radius);

    var circles = g.selectAll('circle');

    circles.attr('cx', function (d) {
            return XScale(d.x)
        })
        .attr('cy', function (d) {
            return YScale(d.y)
        });

    g.selectAll('circle').exit().remove();
};

var drawLine = function (svg, line, data, className, translator) {
    svg.append("g").append("path")
        .datum(data)
        .attr("d", line)
        .attr('transform', translator)
        .classed(className, true);
};

var appendOptions = function (selector, data, callBack) {
    var optionContainer = selector.append("div").classed("optionContainer", true);
    optionContainer.append("select").on("change", callBack)
        .selectAll("option")
        .data(data)
        .enter()
        .append("option")
        .text(function (curve) {
            return curve.name;
        });
};

var generateValues = function (generator, lowerLimit, upperLimit) {
    var values = [];
    for (var counter = lowerLimit; counter <= upperLimit; counter++) {
        values.push(generator(counter));
    }
    return values
};

var getSelectedValue = function (selector, contents) {
    var selectedIndex = selector.property('selectedIndex');
    return contents[selectedIndex].value;
};

var getLine = function (XScale, YScale, xField, yField) {
    return d3.line()
        .x(function (d) {
            return XScale(d[xField]);
        })
        .y(function (d) {
            return YScale(d[yField]);
        });
};