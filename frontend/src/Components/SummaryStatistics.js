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
 
    var canvas = d3.select("body")
               .append("svg")
               .attr("height", 500)
               .attr("width", 500)
               //.attr("fill", "red")
               .append("g");

    var someData = canvas.selectAll("rect")
                     .data(displayData)
                     .enter()
                        .append("g")
                        .append("rect")
                        .attr("height", height)
                        .attr("width", width)
                        //.attr("fill", "red")
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
export const Analytics = ({children}) => {
    return(
        <div className='Analytics'>
            <h1><b>Summary Analytics.</b></h1>
            <p><i>X%</i> of laws pass.</p>
            <p><i>X</i> party passes laws.</p>
            <p>There were a total of <i>X</i> debates.</p>
            <p>There were a total of <i>X</i> amendments.</p>
            <p><i>X</i> dail (1-32) passed most bills.</p>
            <p><i>X</i> party asked most questions.</p>			
		</div>
    );
};