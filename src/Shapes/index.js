import Circle from './Circle';
import Square from './Square';
import Triangle from './Triangle';
import Ellipse from './Ellipse';
import Hump from './Hump';
import Donut from './Donut';
import React, { Component } from 'react';
import Gene from '../Gene';

class Shape extends Component{
	constructor(props){
		const components = {
			circle: Circle,
			square: Square,
			triangle: Triangle,
			ellipse: Ellipse,
			hump: Hump,
			donut: Donut
		}
		super(props);
		this.props = props;
		switch (props.gene.shape) {
			case Gene.shape.CIRCLE:
				this.component = components.circle;
				break;
			case Gene.shape.SQUARE:
			case Gene.shape.BAR:
				this.component = components.square;
				break;
			case Gene.shape.TRIANGLE:
				this.component = components.triangle;
				break;
			case Gene.shape.ELLIPSE:
				this.component = components.ellipse;
				break;
			case Gene.shape.HUMP:
				this.component = components.hump;
				break;
			case Gene.shape.DONUT:
			case Gene.shape.RADIAL:
			case Gene.shape.I_RADIAL:
			case Gene.shape.STAR:
				this.component = components.donut;
				break;
			default:
				this.component = components.circle;
		}
	}
	render(){
		return(
			<this.component { ...this.props } />
		)
	}
}

export default Shape;
