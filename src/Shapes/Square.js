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
		let dist = Point.distance(props.pointA, props.pointB) * 0.9;
		let x, y, height;

		let fullSize = props.fullSize - props.padding * 2;
		console.log(fullSize);

		if(props.gene.shape === Gene.shape.BAR || props.gene.object_size === Gene.object_size.WIN_LOSS){
			x = props.x - dist / 2;
		} else {
			x = props.x - props.size / 2;
		}

		if (props.gene.shape === Gene.shape.BAR){
			height = props.value * fullSize;
		} else {
			height = props.size;
		}
		if(props.gene.object_size === Gene.object_size.WIN_LOSS){
			y = props.y - height;
		} else if(props.gene.shape === Gene.shape.BAR){
			y = fullSize - height + props.padding;
		} else {
			y = props.y - height / 2;
		}



		this.elementAtts = {
			x: x,
			y: y,
			width: (props.gene.shape = Gene.shape.BAR) ? dist :  props.size,
			height: height,
			fill: props.fill
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
