import React, { Component } from 'react';
import Point from '../Point';
import Path from '../Path';
import Gene from '../Gene';

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
		let amnt = (this.props.gene.object_rotation === Gene.object_rotation.RANDOM) ? (this.props.random.random() * 360 - 180) : 180 * this.props.value;
		let rot = (this.props.gene.object_rotation !== Gene.object_rotation.NONE)? "rotate(" + amnt + " " + this.props.x + " " + this.props.y + ")" : "";
		return(
			<g key={ this.props.key } transform={ rot }>
			<ellipse {...this.elementAtts} />
			{ Path.renderDebugInfo(this.pointA, this.pointB, this.debug) }
			</g>
		);
	}
}

export default Ellipse;
