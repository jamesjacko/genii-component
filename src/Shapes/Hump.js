import React, { Component } from 'react';
import Point from '../Point';
import Path from '../Path';
import Gene from '../Gene';

class Hump extends Component{


  constructor(props){
    super(props);
		this.debug = props.gene.debugging;
		this.pointA = props.pointA;
		this.pointB = props.pointB;

		this.elementAtts = {
			d: this.constructHumpPath(props),
			key: props.key,
			fill: props.fill
		}
    this.key = props.key;
    this.fill = props.fill;
  }

	constructHumpPath(props){
		let center = new Point(props.x, props.y);
		this.control1 = Path.orthogonalCenterPoint(props.pointA, center, props.size * 1.33);
		this.control2 = Path.orthogonalCenterPoint(center, props.pointB, props.size * 1.33);
		let p1 = "M" + props.pointA.x + " " + (props.pointA.y);
		let p2 = " " +props.pointB.x + " " + (props.pointB.y)+ "Z";
		let c1 = " C" + (this.control1.x) + " " + (this.control1.y);
		let c2 = " " + (this.control2.x) + " " + (this.control2.y);
		return p1 + c1 + c2 + p2;
	}

  render(){
    let amnt = (this.props.gene.object_rotation === Gene.object_rotation.RANDOM) ? (this.props.random.random() * 360 - 180) : 180 * this.props.value;
		let rot = (this.props.gene.object_rotation !== Gene.object_rotation.NONE)? "rotate(" + amnt + " " + this.props.x + " " + this.props.y + ")" : "";
    return(
			<g key={ this.props.key }>
      <path {...this.elementAtts } transform={ rot } />
			{ Path.renderDebugInfo(this.pointA, this.pointB, this.debug) }
			</g>

    )
  }

}

export default Hump;
