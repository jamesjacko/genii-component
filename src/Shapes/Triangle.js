import React, { Component } from 'react';
import Path from '../Path';
import Gene from '../Gene';

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
    let amnt = (this.props.gene.object_rotation === Gene.object_rotation.RANDOM) ? (this.props.random.random() * 360 - 180) : 180 * this.props.value;
		let rot = (this.props.gene.object_rotation !== Gene.object_rotation.NONE)? "rotate(" + amnt + " " + this.props.x + " " + this.props.y + ")" : "";
    return(
			<g key={ this.props.key }>
			<path { ...this.elementAtts } transform={ rot } />
			{ Path.renderDebugInfo(this.pointA, this.pointB, this.debug) }</g>
    )
  }
}

export default Triangle;
