import React, { Component } from 'react';
import Path from '../Path';

class Square extends Component{
	constructor(props){
		super(props);
		let angle = Path.getAngle(props.pointA, props.pointB);
		let degrees = 180 * angle / Math.PI;
		angle = (360 + Math.round(degrees)) % 360;
		this.elementAtts = {
			x: props.x - props.size / 2,
			y: props.y - props.size / 2,
			key: props.key,
			width: props.size,
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
