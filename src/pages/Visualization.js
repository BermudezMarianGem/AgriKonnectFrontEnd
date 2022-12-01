

import React, {useState, useRef, useEffect } from 'react';
import axios from "axios";
import * as d3 from 'd3';
function BCHART(){

    let user = JSON.parse(localStorage.getItem('user-info'))
    localStorage.setItem('user', JSON.stringify(user))

    const id = user.id;

    const [data, setData] = useState([""]);
    const svgRef = useRef();

    var value = [];
    var x = [];
    value = data.map( (item, idx) => {
        return(
            <div key={idx}> 
                {x.push(item.order_qty)}
            </div>
        )
    });

    console.log(x)

    useEffect(() => {

        axios.get(`http://localhost:8000/api/data/${id}`).then((res) => {
            if (res.status === 200) {
              setData(res.data.data);
            }
          });

    }, [id])
    const w = 200
        const h = 200
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('background', '#d3d3d3')
            .style('margin-top', '50')
            .style('margin-left', '50')
            .style('overflow', 'visible');

        const xScale = d3.scaleLinear()
            .domain([0, x.length - 1])
            .range([0, w]);

        const yScale = d3.scaleLinear()
            .domain([0, h])
            .range([h, 0])
        const generateScaledLine = d3.line()
            .x((d,i) => xScale(i))
            .y(yScale)
            .curve(d3.curveCardinal);

        const xAxis = d3.axisBottom(xScale)
            .ticks(x.length)
            .tickFormat(i => i + 1);
        const yAxis = d3.axisLeft(yScale)
            .ticks(8);
        
        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${h})`)

        svg.append('g')
            .call(yAxis);
        

        svg.selectAll('.line')
            .data([x])
            .join('path')
            .attr('d', d => generateScaledLine(d))
            .attr('fill', 'none')
            .attr('stroke', 'black')


    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
}
export default BCHART;