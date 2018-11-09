import React, { Component } from 'react';
import Shape from './Shapes/';
import Spark from './Shapes/Spark';
import Color from './Color';
import Path from './Path';
import Random from './Random';
import _Gene from './Gene';
import ErrorHandler from './ErrorHandler';
import SVGFilter from './SVGFilter';

class MURV extends Component{

  constructor(props){
    super(props);

		this.gene = props.config.gene;
		ErrorHandler.checkGene(this.gene);
    this.data = props.config.data.dataset.object.values;
    this.size = props.config.data.dataset.object.size;
    this.random = new Random(props.config.data.dataset.object.name);
    this.padding = this.size / 10;
		this.maxPV = 0;
		this.minPV = 1.1;
		this.maxP = {};
		this.minP = {}
		this.path = new Path(
			this.data.length,
			this.size,{
				random:this.random,
				padding:this.padding,
				data:this.data,
				gene:this.gene
			}

		);
  }
  renderShapes(path, shapes, size, placement, goo){
		let shapeComponents;

		if(this.gene.shape === Gene.shape.SPARKLINES){

			return(
				<Spark
          path = { path }
          shapes = { shapes }
          size = { size }
          placement = { placement }
          goo = { goo }
          gene = { this.gene }
					 />
			)
		} else {
	    shapeComponents = shapes.map((item, i) => {
				const center = Path.centerPoint(path[i].a, path[i].b);
        const minimum = 0;
				let max = path[i].dist;
				if(this.gene.path_grouping === _Gene.path_grouping.DATA_GROUP){
					this.groups = this.data.reduce(function (acc, curr) {
					  if (typeof acc[curr.group] == 'undefined') {
					    acc[curr.group] = 1;
					  } else {
					    acc[curr.group] += 1;
					  }
					  return acc;
					}, {});
					let m = Object.values(this.groups).length;
					max = Math.min((this.size - this.padding * m) / m, max);

				}
        return(
          <Shape
            x={ center.x }
            y={ center.y }
            pointA={ path[i].a }
            pointB={ path[i].b }
						fullSize={ size }
						padding={ this.padding }
            size={ (max - minimum) * (item.value) + minimum }
            key={ i }
						fill = { Color.getColor(item.value, this.gene.color, this.random) }
						gene = { this.gene }
						value = { item.value }
          />
        );
    	});
		}
    return <g filter={
			(this.gene.filter === _Gene.filter.GOO)? "url(#goo)": "" }
			>

				{ shapeComponents }
				</g>

  }
	renderColorKey(num){
		if(this.gene.color === _Gene.color.VALUE_DEPENDANT &&
			 this.gene.color_key === _Gene.color_key.ON){
			let width, height = this.size / 40, elems = [];
			width = this.size / num;
			this.size -= height;
			this.padding += height / 2;
			for (var i = 0; i < num; i++) {
				elems.push(<rect
					x={ width * i }
					y={ this.size - height }
					width={ width }
					height={ height }
					fill={ Color.getColor((i + 1) / num, this.gene.color, this.random) }
					key={ i }
				/>);
			}

			return elems;
		}
	}
  render(){
    return(
      <svg className="icon" width={ this.size } height={ this.size }>
        <SVGFilter />
					{ this.renderColorKey(1000) }
          { this.renderShapes(this.path.path, this.data, this.size, 1, true) }



      </svg>
    )
  }
}

export default MURV;
export const Gene = _Gene;
