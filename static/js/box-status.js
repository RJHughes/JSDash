var sampleSVG = d3.select("#viz")
    .append("svg")
    .attr("width", 100)
    .attr("height", 100);

sampleSVG.append("circle")
    .style("stroke", "gray")
    .style("fill", "white")
    .attr("r", 40)
    .attr("cx", 50)
    .attr("cy", 50);
  //  .on("mouseout", function(){d3.select(this).style("fill", "white");})
  //  .on("mouseover", animate);

function animate() {
d3.select(this).transition()
  .duration(1000)
  .style("fill", "green")
  .attr("r", 40);
};

// When "new-chart-data" message is recieved, update chart with data
socket.on('box-status-data', function (data) {
        console.log("Updating box status!");

        if (data==1)
        {
        sampleSVG.select("circle").transition()
        .duration(1000)
        .style("fill", "green");
        }
        else {
          sampleSVG.select("circle").transition()
          .duration(1000)
          .style("fill", "white");
        }


});
