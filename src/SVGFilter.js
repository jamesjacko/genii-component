import React, { Component } from 'react';

class SVGFilter extends Component{
	render(){
		return(
			<filter id="goo" colorInterpolationFilters="sRGB">
				<feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur"/>
				<feColorMatrix in="blur" mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="cm" />
			</filter>
		)
	}
}

export default SVGFilter;
