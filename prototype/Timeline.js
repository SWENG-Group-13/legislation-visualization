import * as d3 from "d3";
import { useEffect } from 'react';

function Timeline(props) {
    useEffect(() => {
        const {data} = props;
        
        function calcStartX(d){
          return Math.abs(width * (d.start - areaStartYear)/areaPeriod) + 5;
        }
        
        function calcEndX(d){
          return Math.abs(width * (d.end - areaStartYear)/areaPeriod) - 10;
        }
        
        function getMinimumStartYear(data){
          return Math.min.apply(null, data.map(function(row){ return row.start })) - 10;
        }
        
        function getMaximumEndYear(data){
          return Math.max.apply(null, data.map(function(row){ return row.end })) + 10;
        }
        
        function getEventList(data){
          var list = data.map(function(row, i){
            return row.events.map(function(event){
              return {
                title: row.title,
                content: event.content,
                top: row.top,
                start: event.start,
                baseIndex: i
              }
            });
          })
          return Array.prototype.concat.apply([], list);
        }
        var width = 700;
        var height = 700;
        const svg = d3
          .select("#area")
          .append("svg")
          .attr("class", "svg")
          .attr("width", width)
          .attr("height", height)
        var eventData = getEventList(data);
        var areaStartYear = getMinimumStartYear(data);
        var areaEndYear = getMaximumEndYear(data);
        var areaPeriod = areaEndYear - areaStartYear;
        var scale = areaPeriod / width
        svg.selectAll("line")
          .data(data)
          .enter()
          .append("line")
          .attr("x1", function(d){ return calcStartX(d); })
          .attr("y1", function(d, i){ return (i+1)*60; })
          .attr("x2", function(d){ console.log(calcStartX(d)); return calcStartX(d); })
          .attr("y2", function(d, i){ return (i+1)*60; })
          .transition()
          .duration(1000)
          .attr("x1", function(d){ return calcStartX(d); })
          .attr("y1", function(d, i){ return (i+1)*60; })
          .attr("x2", function(d){ return calcEndX(d); })
          .attr("y2", function(d, i){ return (i+1)*60; })
          .attr("stroke-width", 3)
          .attr("stroke", function(d){ return "black"; })
        svg.selectAll("startYear")
          .data(data)
          .enter()
          .append("circle")
          .attr("r", 0)
          .attr("cx", function(d){ return calcStartX(d); })
          .attr("cy", function(d, i){ return (i+1)*60; })
          .transition()
          .duration(1500)
          .attr("r", 5)
          .attr("fill", function(d){ return "black"; })
          .attr("cx", function(d){ return calcStartX(d); })
          .attr("cy", function(d, i){ return (i+1)*60; });
        svg.selectAll("endYear")
          .data(data)
          .enter()
          .append("circle")
          .attr("r", 0)
          .attr("cx", function(d){ return calcEndX(d); })
          .attr("cy", function(d, i){ return (i+1)*60; })
          .transition()
          .duration(1500)
          .attr("r", 5)
          .attr("fill", function(d){ return "black"; })
          .attr("cx", function(d){ return calcEndX(d); })
          .attr("cy", function(d, i){ return (i+1)*60; });
        svg.selectAll("eventPoint")
          .data(eventData)
          .enter()
          .append("circle")
          .attr("class", "eventPoint")
          .attr("r", 0)
          .attr("cx", function(d){ return calcStartX(d); })
          .attr("cy", function(d, i){ return (d.baseIndex+1)*60; })
          .transition()
          .duration(2500)
          .attr("r", 5)
          .attr("fill", function(d){ return "red"; })
          .attr("cx", function(d){ return calcStartX(d); })
          .attr("cy", function(d, i){ return (d.baseIndex+1)*60; });
  
        svg.selectAll("text")
          .data(data)
          .enter()
          .append("text")
          .attr("x", function(d){ return calcStartX(d) - 30; })
          .attr("y", function(d, i){ return (i+1)*60 - 12; })
          .transition()
          .duration(1500)
          .text(function(d){ return d.title + " (" + d.start + " ~ " + d.end + ")"; })
          .attr("fill","black")
          .attr("x", function(d){ return calcStartX(d); })
          .attr("y", function(d, i){ return (i+1)*60 - 12; })
          .attr("font-size", 12);
      }, []);
  return (
    <div className="Timeline">
      <svg id="area" height={700} width={700}></svg>
    </div>
  );
}

export default Timeline;
