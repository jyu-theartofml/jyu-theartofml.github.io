function update(y) {

    updateYears(y);
    buildChords(y);

   // mainLabel.style("font-size",innerRadius *.05);

    dText = dGroup.selectAll("text")
        .data(d_labels, function (d) {
            return d.label;
        });

    uText = uGroup.selectAll("text")
        .data(u_labels, function (d) {
            return d.label;
        });

    dChords=dGroup.selectAll("path")
        .data(d_chords, function (d) {
            return d.label;
        });

    uChords=uGroup.selectAll("path")
        .data(u_chords, function (d) {
            return d.label;
        });

    var td=yearlyDeaths[y] //national death rate for that given year, NOT cumulative
    var fs=innerRadius *.2;
    td= formatNumber(td);

    gGroup.select("text")
        .transition()
        .delay(delay)
        .text(td)
        .attr("transform", "translate(" + (outerRadius - (1.6* fs/2)) + ","  + (outerRadius*1.28) +")")
        .style("font-size", fs*0.9+"px");

    dText.enter()
        .append("text")
        .attr("class","deathrate")
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + (innerRadius + 6) + ")"
                + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .text(function(d) { return  (d.index+1)  + ". " + d.label; })
        .on("mouseover", function (d) { node_onMouseOver(d); })
        .on("mouseout", function (d) {node_onMouseOut(d); })
        .attr("fill-opacity", 1e-6)
        .transition()
        .duration(delay-10)
        .attr("fill-opacity", 1e-6);

    dText.transition()
        .duration(delay-10)
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + (innerRadius + 6) + ")"
                + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .text(function(d) { return  (d.index+1)  + ". " + d.label; })
        .attr("fill-opacity", 1.0);

    dText.exit()
        .transition()
        .duration(delay / 2)
        .attr("fill-opacity", 1e-6)
        .attr("transform", "translate(0,0)scale(0.01)")
        .remove();

    dChords.enter()
        .append("path")
        .attr("class","chord")
        .style("stroke", function(d) { return d3.rgb(getDrateColor(d.source.index)).darker(); })
        .style("fill", function(d) { return getDrateColor(d.source.index); })
        .attr("d", d3.svg.arc_chord().radius(innerRadius))
        .on("mouseover", function (d) { node_onMouseOver(d); })
        .on("mouseout", function (d) {node_onMouseOut(d); })
        .style("fill-opacity", 1e-6)
        .style("stroke-opacity", 1e-6)
        .transition()
        .duration(delay)
        .style("stroke-opacity", function (d,i) { return Math.max(.85*(topStateCount-d.index)/topStateCount,.2);})
        .style("fill-opacity", function (d,i) { return .85*(topStateCount-d.index)/topStateCount});

    dChords.transition()
        .duration(delay)
        .attr("d", d3.svg.arc_chord().radius(innerRadius))
        .style("stroke", function(d) { return d3.rgb(getDrateColor(d.source.index)).darker(); })
        .style("fill", function(d) { return getDrateColor(d.source.index); })
        .style("stroke-opacity", function (d,i) { return Math.max(.85*(topStateCount-d.index)/topStateCount,.2);})
        .style("fill-opacity", function (d,i) { return .85*(topStateCount-d.index)/topStateCount});


    dChords.exit()
        .transition()
        .duration(delay/2)
        .attr("stroke-opacity", 1e-6)
        .attr("fill-opacity", 1e-6)
        .attr("transform", "scale(0.01)") //0.01
        .remove();

    uText.enter()
        .append("text")
        .attr("class","unemprate")
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + (innerRadius + 6) + ")"
                + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .text(function(d) { return  (d.index+1)  + ". " + d.label; })
        .on("mouseover", function (d) { node_onMouseOver(d); })
        .on("mouseout", function (d) {node_onMouseOut(d); })
        .attr("fill-opacity", 1e-6)
        .transition()
        .duration(delay-10)
        .attr("fill-opacity", 1.0);

    uText.transition()
        .duration(delay-10)
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + (innerRadius + 6) + ")"
                + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .text(function(d) { return  (d.index+1)  + ". " + d.label; })
        .attr("fill-opacity", 1.0);

    uText.exit()
        .transition()
        .duration(delay / 2)
        .attr("fill-opacity",1e-6)
        .attr("transform", "translate(0,0)scale(0.01)")
        .remove();

    uChords.enter()
        .append("path")
        .attr("class","chord")
        .style("stroke", function(d) { return d3.rgb(getUnempColor(d.source.index)).darker(); })
        .style("fill", function(d) { return getUnempColor(d.source.index); })
        .attr("d", d3.svg.arc_chord().radius(innerRadius))
        .on("mouseover", function (d) { node_onMouseOver(d); })
        .on("mouseout", function (d) {node_onMouseOut(d); })
        .style("stroke-opacity", 1e-6)
        .style("fill-opacity", 1e-6)
        .transition()
        .duration(delay-10)
        .style("stroke-opacity", function (d,i) { return Math.max(.85*(topStateCount-d.index)/topStateCount,.2);})
        .style("fill-opacity", function (d,i) { return .7*(topStateCount- d.index)/topStateCount});

    uChords.transition()
        .duration(delay-10)
        .attr("d", d3.svg.arc_chord().radius(innerRadius))
        .style("stroke", function(d) { return d3.rgb(getUnempColor(d.source.index)).darker(); })
        .style("fill", function(d) { return  getUnempColor(d.source.index); })
        .style("stroke-opacity", function (d,i) { return Math.max(.85*(topStateCount-d.index)/topStateCount,.2);})
        .style("fill-opacity", function (d,i) { return .7*(topStateCount- d.index)/topStateCount});

    uChords.exit()
        .transition()
        .duration(delay / 2)
        .attr("stroke-opacity", 1e-6)
        .attr("fill-opacity", 1e-6)
        .attr("transform", "scale(0.01)")
        .remove();
}

function updateYears(y) {

    var yearAxis=mGroup.selectAll("g.year")
        .data(years);

    yearEnter= yearAxis.enter()
        .append("g")
        .attr("class","year");

    yearEnter.append("line")
        .attr("x1",function (d,i) {
            return i*yearOffset;
        })
        .attr("x2",function (d,i) { return i*yearOffset; })
        .attr("y1",function (d,i) {
            var ratio=y-i; //y-1
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 0;
            else if (ratio==1)
                return 4;
            else if (ratio==2)
                return 8;
            else if (ratio==3)
                return 11;
            else if (ratio==4)
                return 14;
            else if (ratio==5)
                return 15;
            else if (ratio==6)
                return 15;
            else
                return 16;

        })
        .attr("y2",20)
        .attr("shape-rendering","crispEdges")
        .style("stroke-opacity", function (d,i) {
            var ratio=y-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 1;
            else if (ratio==1)
                return .9;
            else if (ratio==2)
                return .8;
            else if (ratio==3)
                return .7;
            else if (ratio==4)
                return .6;
            else if (ratio==5)
                return .5;
            else if (ratio==6)
                return .4;
            else
                return .3;

        })
        .style("stroke","#000");



    yearEnter.append("text")
        .attr("transform",function (d,i) { return "translate (" + String(i*yearOffset-10) + ",-2)"; })
        .text(function(d,i) { return yearsMap[i % 11]; }) //% 11 for up to 2017
        .style("fill-opacity",function (d,i) { return (i==0) ? 1:0;});

    yearEnter.append("text")
        .attr("transform",function (d,i) { return "translate (" + String(i*yearOffset-10) + ",33)"; })
        .text(function(d,i) {

                return String(baseYear + Math.floor(i/1)); // this puts the timeline year for clicking

        })
        .on("click",function (d) {
            year= Math.floor(d.index/1); //was 1
            //month=0;
            if (running==true) stopStart();
            update(year);
            //          console.log("y=" + y + " m=" + m);
        });

    yearUpdate=yearAxis.transition();

    yearUpdate.select("text")
        .delay(delay/1.2)
        .style("fill-opacity",function (d) {
            if (d.index==(y)) {
                return 1;
            }
            else
                return 0;
        });

    yearUpdate.select("line")
        .delay(delay/1.2)
        .attr("y1",function (d,i) {
            var ratio=(y)-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 0;
            else if (ratio==1)
                return 4;
            else if (ratio==2)
                return 8;
            else if (ratio==3)
                return 11;
            else if (ratio==4)
                return 14;
            else if (ratio==5)
                return 15;
            else if (ratio==6)
                return 15;
            else
                return 16;

        })
        .style("stroke-width",function (d,i) {
            var ratio=(y)-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 1.5;
            else
                return 1;
        })
        .style("stroke-opacity", function (d,i) {
            var ratio=(y)-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 1;
            else if (ratio==1)
                return .9;
            else if (ratio==2)
                return .8;
            else if (ratio==3)
                return .7;
            else if (ratio==4)
                return .6;
            else if (ratio==5)
                return .5;
            else if (ratio==6)
                return .4;
            else
                return .3;

        })
        .style("stroke","#000");

}


function getDrateColor(i) {    // was getExportColor
    var state=d_nameByIndex[i];
    if (d_colorByName[state]==undefined) {
        d_colorByName[state]=d_fill(i);
    }

    return d_colorByName[state];
}

function getUnempColor(i) {  // was getUnempColor
    var state=u_nameByIndex[i];
    if (u_colorByName[state]==undefined) {
        u_colorByName[state]=u_fill(i);
    }

    return u_colorByName[state];
}
