import React, { Component } from 'react';
import Path from '../Path';

class Triangle extends Component{


  constructor(props){
    super(props);
		this.elementAtts = {
			d: this.constructTrianglePath(props),
			key: props.key,
			fill: props.fill
		}

		this.pointA = props.pointA;
		this.pointB = props.pointB;
		this.debug = props.gene.debugging;
  }

	constructTrianglePath(props){
		var centerPoint = Path.orthogonalCenterPoint(props.pointA, props.pointB, props.size);
		let p1 = "M" + props.pointA.x + " " + (props.pointA.y);
    let p2 = "L" + props.pointB.x + " " + (props.pointB.y)+ "Z";
    let peak = " L" + (centerPoint.x) + " " + (centerPoint.y);
		return p1 + peak + p2;
	}

  render(){
    return(
			<g key={ this.props.key }>
			<path { ...this.elementAtts } />
			{ Path.renderDebugInfo(this.pointA, this.pointB, this.debug) }</g>
    )
  }
}

export default Triangle;
