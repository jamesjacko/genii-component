import React, { Component } from 'react';
import Gene from '../Gene';
import Path from '../Path';

class Circle extends Component{
	constructor(props){
		super(props);
		this.elementAtts = {
			cx: props.x,
			cy: props.y,
			key: props.key,
			r: (props.gene.filter === Gene.filter.GOO)? props.size : props.size / 2,
			fill: props.fill
		}
		this.pointA = props.pointA;
		this.pointB = props.pointB;
		this.debugging = props.gene.debugging;
	}
	render(){
		return(
			<g key={ this.props.key }>
				<circle {...this.elementAtts} />
				{ Path.renderDebugInfo(this.pointA, this.pointB, this.debugging) }
			</g>
		);
	}
}

export default Circle;
