import React, { Component } from 'react';
import Path from '../Path';
import Point, { getAngle } from '../Point';
import Gene from '../Gene';
import { GradientColor } from '../Color';

class Square extends Component{
	constructor(props){
		super(props);
		let angle = Path.getAngle(props.pointA, props.pointB);
		let degrees = 180 * angle / Math.PI;
		angle = (360 + Math.round(degrees)) % 360;
		this.angle = angle;
		let dist = Point.distance(props.pointA, props.pointB) * (typeof props.value === "array" ? 0.6 : 0.9);
		let x, y, height;
		let fullSize = props.fullSize - props.padding * 2;

		if(props.gene.shape === Gene.shape.BAR || props.gene.object_size === Gene.object_size.WIN_LOSS ){
			x = props.x - dist / 2.0;
		} else {
			x = props.x - props.size / 2;
		}
		let hMult = (typeof(props.value === "array")? fullSize : fullSize / 2);

		if (props.gene.shape === Gene.shape.BAR && props.gene.object_size !== Gene.object_size.WIN_LOSS){
			height = typeof props.value === "array"  ? (props.value[1] - props.value[0]) / (props.range.max - props.range.min) : props.value * hMult;
		} else {
			height = props.size;
		}



		if(props.gene.object_size === Gene.object_size.WIN_LOSS){
			y = props.y - height;
		}
		if(props.gene.shape === Gene.shape.BAR){
			if(typeof props.range.min !== "undefined"){
				 y = ((props.range.max - props.value[1])/ (props.range.max - props.range.min)) * fullSize + props.padding
			} else {
				y = (props.y - height) + fullSize / 2;
			}
		} else {
			y = props.y - height / 2;
		}
		if(props.gene.path_mode === Gene.path_mode.RING){
			x = props.pointB.x + (props.pointB.x - props.pointA.x) / 2 - dist / 2
			y = props.pointB.y + (props.pointB.y - props.pointA.y) / 2
		}

		this.center = new Point(props.pointB.x + (props.pointB.x - props.pointA.x) / 2, props.pointB.y + (props.pointB.y - props.pointA.y) / 2);

		if(props.gene.path_mode === Gene.path_mode.RING && props.gene.object_rotation === Gene.object_rotation.RADIAL){
			x = (((props.pointB.x + (props.pointB.x - props.pointA.x) / 2) + (props.fullSize / 2)) / 2)  - dist / 2
			y = ((props.pointB.y + (props.pointB.y - props.pointA.y) / 2) + (props.fullSize / 2)) / 2
			this.center.x = x + dist / 2;
			this.center.y = y;
			let midDist = Point.distance(this.center, {x:props.fullSize / 2, y:props.fullSize / 2});
			let availDist = (props.fullSize / 2) - midDist;
			console.log((props.value[0] - props.range.min) / (props.range.max - props.range.min), availDist, props.fullSize, midDist);
			y += ((props.value[0] - props.range.min) / (props.range.max - props.range.min)) * availDist;
			height = ((props.value[1] - props.value[0]) / (props.range.max - props.range.min)) * availDist;

		}





		if(typeof props.avg === "object"){
			if(props.gene.object_rotation === Gene.object_rotation.RADIAL){
				console.log("here");
				let midDist = Point.distance(this.center, {x:props.fullSize / 2, y:props.fullSize / 2});
				let availDist = (props.fullSize / 2) - midDist;
				this.avgAtts = {
					x: (((props.pointB.x + (props.pointB.x - props.pointA.x) / 2) + (props.fullSize / 2)) / 2)  - (Point.distance(props.pointA, props.pointB) * 0.9) / 2,
					y: ((props.pointB.y + (props.pointB.y - props.pointA.y) / 2) + (props.fullSize / 2)) / 2,
					width: Point.distance(props.pointA, props.pointB) * 0.9,
					height: ((props.avg[1] - props.avg[0]) / (props.range.max - props.range.min)) * availDist
				}
				this.avgAtts.y += ((props.avg[0] - props.range.min) / (props.range.max - props.range.min)) * availDist;
			} else {
				this.avgAtts = {
					x: props.x - (Point.distance(props.pointA, props.pointB) * 0.9) / 2,
					y: (props.range.max - props.avg[1]) + props.padding,
					width: Point.distance(props.pointA, props.pointB) * 0.9,
					height: ((props.avg[1] - props.avg[0]) / (props.range.max - props.range.min)) * fullSize
				}
			}
			this.avgAtts.fill = "rgba(255,255,255,0.3)";
			this.avgAtts.stroke = "rgba(50,50,50,0.5)";
			this.avgAtts.strokeWidth = "1";
		}

		this.elementAtts = {
			x: x,
			y: y,
			width: (props.gene.shape == Gene.shape.BAR) ? dist :  props.size,
			height: height,
			fill: (props.gene.color === Gene.color.GRADIENT)? "url(#gradient" + props.index  + "" + this.props.gene.object_rotation + ")" : props.fill
		}

		this.maxCol = (props.value[0] - props.range.min)  / (props.range.max - props.range.min);
		this.minCol = (props.value[1] - props.range.min) / (props.range.max - props.range.min);
		this.midCol = this.minCol + (this.maxCol - this.minCol) / 2 ;

		this.pointA = props.pointA;
		this.pointB = props.pointB;
		this.debugging = props.gene.debugging;

		this.colors = [
			"rgba(0,179,255,1)",
			"rgba(255,249,144,1)",
			"rgba(255,145,31,1)"
		];

	}

	render(){
		let amnt = (this.props.gene.object_rotation === Gene.object_rotation.RANDOM) ? (this.props.random.random() * 360 - 180) : 180 * this.props.value;
		if(this.props.gene.object_rotation === Gene.object_rotation.RADIAL){
			amnt = getAngle(new Point(this.center.x, this.center.y), new Point(this.props.fullSize / 2, this.props.fullSize / 2)) % 360;
		}

		let rot = (this.props.gene.object_rotation !== Gene.object_rotation.NONE)? "rotate(" + (amnt) + " " + this.center.x + " " + this.center.y + ")" : "";
		let rnd = (typeof this.props.avg === "object")? "5px" : "0px";
		return(
			<g key={ this.props.key }>
				{
					(this.props.gene.color === Gene.color.GRADIENT)?
							<linearGradient id={ "gradient" + this.props.index + "" + this.props.gene.object_rotation } x1="0" x2="0" y1="0" y2="1">
								<stop offset={ "0" } stopColor={ GradientColor(this.colors, this.props.gene.path_mode === Gene.path_mode.RING? this.maxCol : this.minCol) } />
								<stop offset="0.5" stopColor={ GradientColor(this.colors, this.midCol) } />
								<stop offset={ "1" } stopColor={ GradientColor(this.colors, this.props.gene.path_mode === Gene.path_mode.RING? this.minCol :this.maxCol) } />
							</linearGradient>
					: ""
				}

				<rect {...this.elementAtts} transform={ rot } rx={ rnd } ry={ rnd } />
				{
					(typeof this.avgAtts !== "undefined") ?
						<rect {...this.avgAtts} transform={ rot } className={ this.props.gene.color === Gene.color.GRADIENT? "gradient1" : "" } rx={ rnd } ry={ rnd } />
					: ""
				}
				{ Path.renderDebugInfo(this.pointA, this.pointB, this.debugging) }
			</g>
		);
	}
}

export default Square;
