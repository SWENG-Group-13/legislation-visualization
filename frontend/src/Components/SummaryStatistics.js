import * as d3 from 'd3';
import React from 'react';

function Analytics(props) {

    const [val, setVal] = React.useState("No party");
    const [val2, setVal2] = React.useState(NaN);
    const [val3, setVal3] = React.useState(NaN);

    React.useEffect(() => {
		    const { data } = props;
        const { data2 } = props;
        const { data3 } = props;

        const dummy = [
            //{name:"sinn fein", value:10},
            //{name:"other", value:5}
        ]

        const dummy2 = [
            // passed and not passed
        ]

        const dummy01 = {
          // parties and member count
        }

        const dummy02 = {

        }

        for (let i = 0; i < data.nodes.length; i++)
        {
          if (data.nodes[i].name in data2)
          {
            if (data2[data.nodes[i].name] in dummy01)
              dummy01[data2[data.nodes[i].name]] += 1;
            else
              dummy01[data2[data.nodes[i].name]] = 0;
          }
        }

        for (let key in dummy01)
        {
          dummy.push({name:key,value:dummy01[key]})
        }

        for (let i = 0; i < data3.length; i++)
        {
          if (data3[i].stage in dummy02)
            dummy02[data3[i].stage] += 1;
          else
            dummy02[data3[i].stage] = 1;
        }

        for (let key in dummy02)
        {
          dummy2.push({name:key,value:dummy02[key]})
        }

		    const chart = PieChart(dummy, {
            name: d => d.name,
            value: d => d.value
        })

        const chart2 = PieChart(dummy2, {
            name: d => d.name,
            value: d => d.value
        })

        //dummy.sort((a,b) => b.value - a.value);
        //setVal(dummy[0].name);

        
        //setVal2(dummy2[10].value);
        //setVal3(dummy2.reduce((a,b) => a + (b.value || 0), 0))

        const target = document.querySelector("#sa1");
        while (target.firstChild) target.removeChild(target.firstChild);
        target.appendChild(chart);

        const target2 = document.querySelector("#sa2");
        while (target2.firstChild) target2.removeChild(target2.firstChild);
        target2.appendChild(chart2);
	}, [props]);

    return(
        <div className='Analytics'>
            <center>
            <h1><b>Summary Analytics.</b></h1>
            <p><i>{val}</i> sponsors the most bills.</p>
            <div id="sa1"></div>
            <p><i>{val2} of {val3}</i> laws pass.</p>
            <div id="sa2"></div>
            </center>
		</div>
    );
};

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/pie-chart
function PieChart(data, {
    name = ([x]) => x,  // given d in data, returns the (ordinal) label
    value = ([, y]) => y, // given d in data, returns the (quantitative) value
    title, // given d in data, returns the title text
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    innerRadius = 0, // inner radius of pie, in pixels (non-zero for donut)
    outerRadius = Math.min(width, height) / 2, // outer radius of pie, in pixels
    labelRadius = (innerRadius * 0.2 + outerRadius * 0.8), // center radius of labels
    format = ",", // a format specifier for values (in the label)
    names, // array of names (the domain of the color scale)
    colors, // array of colors for names
    stroke = innerRadius > 0 ? "none" : "white", // stroke separating widths
    strokeWidth = 1, // width of stroke separating wedges
    strokeLinejoin = "round", // line join of stroke separating wedges
    padAngle = stroke === "none" ? 1 / outerRadius : 0, // angular separation between wedges
  } = {}) {
    // Compute values.
    const N = d3.map(data, name);
    const V = d3.map(data, value);
    const I = d3.range(N.length).filter(i => !isNaN(V[i]));
  
    // Unique the names.
    if (names === undefined) names = N;
    names = new d3.InternSet(names);
  
    // Chose a default color scheme based on cardinality.
    if (colors === undefined) colors = d3.schemeSpectral[names.size];
    if (colors === undefined) colors = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), names.size);
  
    // Construct scales.
    const color = d3.scaleOrdinal(names, colors);
  
    // Compute titles.
    if (title === undefined) {
      const formatValue = d3.format(format);
      title = i => `${N[i]}\n${formatValue(V[i])}`;
    } else {
      const O = d3.map(data, d => d);
      const T = title;
      title = i => T(O[i], i, data);
    }
  
    // Construct arcs.
    const arcs = d3.pie().padAngle(padAngle).sort(null).value(i => V[i])(I);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
    
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linejoin", strokeLinejoin)
      .selectAll("path")
      .data(arcs)
      .join("path")
        .attr("fill", d => color(N[d.data]))
        .attr("d", arc)
      .append("title")
        .text(d => title(d.data));
  
    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .selectAll("tspan")
      .data(d => {
        const lines = `Stage ${title(d.data)}`.split(/\n/);
        return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 1);
      })
      .join("tspan")
        .attr("x", 0)
        .attr("y", (_, i) => `${i * 1.1}em`)
        .attr("font-weight", (_, i) => i ? null : "bold")
        .text(d => d);
  
    return Object.assign(svg.node(), {scales: {color}});
  }

  export default Analytics;