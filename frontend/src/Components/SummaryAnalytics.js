import * as d3 from 'd3';
import React from 'react';

function Analytics(props){

    React.useEffect(() => {
        const { data } = props;

        const chart = AnalyticsSummary(data, {
            x: d => d.date,
            y: d => d.stage,
            z: d => d.title
        });

        const target = document.querySelector("#an");
        while(target.firstChild)
            target.removeChild(target.firstChild);
        target.appendChild(chart);
    })

    return ( 
    <div className="Analytics" id="an"></div>
    )

    function AnalyticsSummary(data, {
            x = ([x]) => x, 
		    y = ([, y]) => y,
            z = ([, , z]) => z,
            width = 100,
            height = 100
    } = {}) {

    // Compute here data we want to display

    var dummyData = "Summary Analytics of data";
    
    var canvas = d3.select("body")
               .append("svg")
               .attr("height", 500)
               .attr("width", 500)
               //.attr("fill", "red")
               .append("g");

    var someData = canvas.selectAll("rect")
                     .data(dummyData)
                     .enter()
                        .append("g")
                        .append("rect")
                        .attr("height", height)
                        .attr("width", width)
                        .attr("fill", "red")
                        .attr("transform",
                              function(d)
                              { 
                                  return "translate(" + height * d + ",0)";
                            });
    canvas.selectAll("g")
        .append("text")
        .attr("transform",
        function(d)
        { 
            return "translate(" + height * d + ",30)";
        })
        .attr("font-size", "2em")
        .attr("color", "black")
        .text(function(d)
        { 
            return d;
        });
    }

}
