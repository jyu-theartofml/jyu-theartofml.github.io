var screenWidth=$(window).width();


var margin = {left: 10, top: 5, right: 10, bottom: 5},
	  width = Math.min(screenWidth, 700) - margin.left - margin.right,
	  height = Math.min(screenWidth, 700)*5/6 - margin.top - margin.bottom;

var outerRadius = Math.min(width, height) / 2  - 100,
  	innerRadius = outerRadius * 0.95;

//var formatPercent = d3.format(".1%");

var arc = d3.svg.arc()
.innerRadius(innerRadius)
.outerRadius(outerRadius);

var layout = d3.layout.chord()
.padding(.04)
.sortSubgroups(d3.descending)
.sortChords(d3.ascending);

var path = d3.svg.chord()
.radius(innerRadius);

var svg = d3.select("body").append("svg")
.attr("width", (width+margin.left+margin.right))
.attr("height", (height+margin.top+margin.bottom))
.append("g")
.attr("id", "circle")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("circle")
.attr("r", outerRadius);

d3.csv("neighborhoods.csv", function(cities) {
d3.json("pickup_matrix.json", function(matrix) {

// Compute the chord layout.
layout.matrix(matrix);

// Add a group per neighborhood.
var group = svg.selectAll(".group")
.data(layout.groups)
.enter().append("g")
.attr("class", "group");

// Add a mouseover title.
group.append("title").text(function(d, i) {
 return Math.round(d.value) + "people in " +  cities[i].name;});


//// Add the group arc.
var groupPath = group.append("path")
.attr("id", function(d, i) { return "group" + i; })
.attr("d", arc)
.style("fill", function(d, i) { return cities[i].color; });
///this gives just the arcs corresponding to each group






});
});
