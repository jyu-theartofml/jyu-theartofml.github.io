var svg2 = d3.select("#svg2"),
margin2 = {top:20, right: 20, bottom: 50, left: 60},
width2 = +svg2.attr("width") - margin2.left - margin2.right,
//width2=width
//height2=height
height2 = +svg2.attr("height") - margin2.top - margin2.bottom,
g2 = svg2.append("g").attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

var tip = d3.tip()
       .attr("class",'d3-tip')
        .offset([-2,0])
        .html(function(d) {return formatPercent( d.value); });
svg2.call(tip);

var formatPercent = d3.format(".2%")
var x0 = d3.scaleBand()
    .rangeRound([0, width2])
    .paddingInner(0.1);

// The scale for spacing each group's bar:
var x1 = d3.scaleBand()
    .padding(0.05);

var y = d3.scaleLinear()
    .rangeRound([height2, 0]);

var z = d3.scaleOrdinal()
        .range(["#958db6",  "#cbb3bf", "#dbc7be", "#ef959c"]);

    //var divTooltip = d3.select("div.tooltip");

    d3.csv("divorce_rate/edu_age_div.csv", function(d, i, columns) {
        for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
        return d;
    }).then(function(data) {
        console.log(data);

        var keys = data.columns.slice(1);

        console.log('keys');
        console.log(keys);
        x0.domain(data.map(function(d) { return d.Age; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);

        y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

        g2.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("class","bar")
            .attr("transform", function(d) { return "translate(" + x0(d.Age) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
            .enter().append("rect")
            .attr("x", function(d) { return x1(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height2 - y(d.value); })
            .attr("fill", function(d) { return z(d.key); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);


        g2.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height2 + ")")
            .call(d3.axisBottom(x0));

        g2.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y).ticks(5, "%")) // no background gird line, display as % not string
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start");


        var legend = g2.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 15 + ")"; });

        legend.append("rect")
            .attr("x", width2 - 17)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", z)
            .attr("stroke", z)
            .attr("stroke-width",2);


        legend.append("text")
            .attr("x", width2 - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });



        ////
        //// Update and transition on click:
        ////


    });
