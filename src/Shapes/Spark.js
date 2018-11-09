import React, { Component } from 'react';
import Path from '../Path';
import Color from '../Color';
import Gene from '../Gene';
import Square from './Square';

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
    this.padding = props.padding;
  }

  render(){
    let shapeComponents = "";
		let maxPV = 0, minPV = 1.1, maxP, minP;
    let points = "";
    let total = 0;
    for (var i = 0; i < this.shapes.length; i++) {
      total += this.shapes[i].value;
    }
    if(this.gene.object_size !== Gene.object_size.WIN_LOSS){
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
    } else {
      shapeComponents = this.shapes.map((item, i) => {

        const center = Path.centerPoint(this.path[i].a, this.path[i].b);
        if(i < 2){
          console.log(this.path[i].a, this.path[i].b, center);
        }
        const minimum = 0;
        let max = this.path[i].dist;

        return(
          <g>
          <Square
            x={ center.x }
            y={ (item.value >= total / this.shapes.length)? center.y : center.y + max }
            pointA={ this.path[i].a }
            pointB={ this.path[i].b }
            fullSize={ this.size }
            padding={ this.padding }
            size={ max }
            key={ i }
            fill = { (item.value >= total / this.shapes.length)? "chartreuse" : "red" }
            gene = { this.gene }
            value = { item.value }
          />

          </g>
        );
      });
    }
    return shapeComponents;
  }
}

export default Spark;
