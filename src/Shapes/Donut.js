import React, { Component } from 'react';
import Path from '../Path';
import Gene from '../Gene';
import Point from '../Point';

class Donut extends Component{
	constructor(props){
		super(props);
		let diff1 = {
			x: props.pointA.x - props.fullSize / 2,
			y: props.pointA.y - props.fullSize / 2
		}
		let diff2 = {
			x: props.pointB.x - props.fullSize / 2,
			y: props.pointB.y - props.fullSize / 2
		}
		let startAngle = Math.atan2(diff1.y, diff1.x);
		let endAngle = Math.atan2(diff2.y, diff2.x);
		let radius = (props.fullSize - props.padding * 4) / 2;
		let arc, fill = "none", stroke = props.fill, strokeWidth = radius * props.value;
		let centerP = props.fullSize / 2;
		switch (props.gene.shape) {
			case Gene.shape.STAR:
				let start = this.polarToCartesian(
					centerP,
					centerP,
					props.value * radius,
					startAngle);
		    let end = this.polarToCartesian(
					centerP,
					centerP,
					props.value * radius,
					endAngle);
				arc = "M" + centerP + " " + centerP +
							"L" + start.x + " " + start.y +
							"L" + end.x + " " + end.y + "Z";
				fill = props.fill;
				stroke = "none";
				break;
			case Gene.shape.RADIAL:
				arc = this.describeArc(
					centerP,
					centerP,
					(props.value * radius) / 2,
					startAngle,
					endAngle );
				strokeWidth = props.value * radius;
				break;
			case Gene.shape.DONUT:
				arc = this.describeArc(
					centerP,
					centerP,
					radius,
					startAngle,
					endAngle );
				strokeWidth = props.fullSize / 10;
				break;
			case Gene.shape.RADIAL_BAR:
				startAngle = 0;
				endAngle = (360 * Math.PI / 180) * props.value;
				let centerPoint = new Point(
					props.pointA.x + props.pointB.x - props.pointA.x,
					props.pointA.y + props.pointB.y - props.pointA.y
				);
				arc = this.describeArc(
					centerP,
				 	centerP,
					Point.distance(new Point(centerP, centerP), centerPoint),
					0,
					Math.PI * 2 * props.value);
				strokeWidth = Point.distance(props.pointA, props.pointB) * 0.90;
				break;
			case Gene.shape.I_RADIAL:
			default:
				arc = this.describeArc(
					centerP,
					centerP,
					radius - strokeWidth / 2,
					startAngle,
					endAngle );
				break;


		}


		this.elementAtts = {
			fill: fill,
			stroke: stroke,
			strokeWidth: strokeWidth,
			d: arc,
			key: props.key
		}

		this.pointA = props.pointA;
		this.pointB = props.pointB;
		this.debugging = props.gene.debugging;
	}


	polarToCartesian(centerX, centerY, radius, angle) {
	  return {
	    x: centerX + (radius * Math.cos(angle)),
	    y: centerY + (radius * Math.sin(angle))
	  };
	}

	describeArc(x, y, radius, startAngle, endAngle){

    var start = this.polarToCartesian(x, y, radius, endAngle);
    var end = this.polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
	}

	render(){
		let amnt = (this.props.gene.object_rotation === Gene.object_rotation.RANDOM) ? (this.props.random.random() * 360 - 180) : 180 * this.props.value;
		let rot = (this.props.gene.object_rotation !== Gene.object_rotation.NONE)? "rotate(" + amnt + " " + this.props.x + " " + this.props.y + ")" : "";
		return(
			<g key={ this.props.key }>
				<path { ...this.elementAtts } transform={ rot }/>
				{ Path.renderDebugInfo(this.pointA, this.pointB, this.debugging) }
			</g>
		);
	}
}

export default Donut;
