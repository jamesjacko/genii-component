import React, { Component } from 'react';
import Point from '../Point';
import Path from '../Path';

class Ellipse extends Component{
	constructor(props){
		super(props);

		let angle = Path.getAngle(props.pointA, props.pointB);
		let degrees = 180 * angle / Math.PI;
		this.angle = (360 + Math.round(degrees)) % 360;
		this.elementAtts = {
			cx: props.x,
			cy: props.y,
			ry: props.size / 2,
			rx: Point.distance(props.pointA, props.pointB) / 2,
			fill: props.fill,
			transform: "rotate(" + this.angle + " "  + props.x + " " + props.y +  ")"
		}
		this.pointA = props.pointA;
		this.pointB = props.pointB;
		this.debug = props.gene.debugging;
	}

	render(){
		return(
			<g>
			<ellipse {...this.elementAtts} />
			{ Path.renderDebugInfo(this.pointA, this.pointB, this.debug) }
			</g>
		);
	}
}

export default Ellipse;
