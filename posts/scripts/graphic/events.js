playPause.on("click",stopStart);

function stopStart() {
    if (running==true) {
        running=false;
        clearInterval(refreshIntervalId);
        playPause.attr("src","images/play_bw.png");
        dChords.interrupt();
        uChords.interrupt();
        uText.interrupt();
        dText.interrupt();

    }
    else {
        running=true;
        playPause.attr("src","images/pause_bw.png");
        update(year);
        refreshIntervalId=setInterval(run,delay);
    }
}

function node_onMouseOver(d) {
    var t;
    if (typeof d.unemployment_rates == "undefined") {
       t="Death rate: " + Number(d.deathrates) + " per 100,000 population";
       //t= null;

    }
    else {
        t="Unemployment rate: " + formatPercent(Number(d.unemployment_rates));

}

    toolTip.transition()
        .duration(250)
        .style("opacity", ".85");
    header.text((d.index+1) + ". " + d.label);
    header1.text((baseYear+year));
    header2.text(t);
    toolTip.style("left", (d3.event.pageX+15) + "px")
        .style("top", (d3.event.pageY-75) + "px");

}

function node_onMouseOut(d) {

    toolTip.transition()									// declare the transition properties to fade-out the div
        .duration(500)									// it shall take 500ms
        .style("opacity", "0");							// and go all the way to an opacity of nil

}
/** Returns an event handler for fading a given chord group. */
function fade(opacity) {

    //return; //this caused warning
    return function(g, i) {
        svg.selectAll("path.chord")
            .filter(function(d) {
                //  return true;
                return d.source.index != i && d.target.index != i;
            })
            .transition()
            .style("opacity", opacity);
    };
}
