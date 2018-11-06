import React, { Component } from 'react';
import Path from '../Path';
import Point from '../Point';
import Gene from '../Gene';

class Square extends Component{
	constructor(props){
		super(props);
		let angle = Path.getAngle(props.pointA, props.pointB);
		let degrees = 180 * angle / Math.PI;
		angle = (360 + Math.round(degrees)) % 360;
		let dist = Point.distance(props.pointA, props.pointB) * 0.6;
		console.log(props);
		this.elementAtts = {
			x: (props.gene.shape = Gene.shape.BAR) ? props.x - dist / 2 : props.x - props.size / 2,
			y: (props.gene.shape = Gene.shape.BAR) ? props.y - props.size:  props.y - props.size / 2,
			key: props.key,
			width: (props.gene.shape = Gene.shape.BAR) ? dist :  props.size,
			height: props.size,
			fill: props.fill,
			transform: "rotate(" + angle + " "  + props.x + " " + props.y +  ")"
		}
		this.pointA = props.pointA;
		this.pointB = props.pointB;
		this.debugging = props.gene.debugging;
	}

	render(){
		return(
			<g>
				<rect {...this.elementAtts} />
				{ Path.renderDebugInfo(this.pointA, this.pointB, this.debugging) }
			</g>
		);
	}
}

export default Square;
