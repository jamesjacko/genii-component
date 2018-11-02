import Chroma from 'chroma-js';
import Gene from './Gene';

class Color{
	static getColor(val, type, random){
		const COLOR_BREWER = ['#edf8b1', '#7fcdbb', '#2c7fb8'];
		const MONOTONE = ['#dddddd', '#000000'];
		const BLACK = ['#000000', '#000000'];
		const WHITE = ['#FFFFFF', '#FFFFFF'];
		var color;
		switch (type) {
			case Gene.color.MONOTONE:
				color = MONOTONE;
				break;
			case Gene.color.RANDOM:
			case Gene.color.VALUE_DEPENDANT:
				color = COLOR_BREWER;
				break;
			case Gene.color.WHITE:
				color = WHITE;
				break;
			case Gene.color.BLACK:
			default:
				color = BLACK;
		}
		if(type === Gene.color.RANDOM)
			val = random.random();
		var chroma = Chroma.scale(color);
		return chroma(val).hex();
	}
}


export default Color;
