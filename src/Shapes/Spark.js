import React, { Component } from 'react';
import Path from '../Path';
import Color from '../Color';

class Spark extends Component{
  constructor(props){
    super(props);
    this.path = props.path;
    this.shapes = props.shapes;
    this.size = props.size;
    this.placement = props.placement;
    this.goo = props.goo;
    this.color = props.color;
    this.gene = props.gene;
  }

  render(){
		let maxPV = 0, minPV = 1.1, maxP, minP;
    let points = "";
    let total = 0;
    this.shapes.map((item, i) => {

      let p = Path.orthogonalCenterPoint(this.path[i].a, this.path[i].b, this.path[i].dist * item.value);
      if(item.value < minPV){
        minP = p;
        minPV = item.value
      } else if (item.value >= maxPV) {
        maxP = p;
        maxPV = item.value;
      }
      let s = (i==0)? "M" : "L";
      points += s + p.x + " " + p.y;
      total += item.value;
    });
    return(
      <g>
      <path d = { points } strokeWidth="2" fill="none"
        stroke = {
          Color.getColor(total / this.shapes.length, this.gene.color)
         } />
         <circle cx={ maxP.x } cy={ maxP.y} fill="chartreuse" r="3" key="max" />
         <circle cx={ minP.x } cy={ minP.y} fill="red" r="3" key="min" />
      </g>
    )
  }
}

export default Spark;
