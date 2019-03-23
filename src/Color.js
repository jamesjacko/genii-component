import Chroma from 'chroma-js';
import Gene from './Gene';

class Color{
	static getColor(params){
		if(params.type === Gene.color.FROM_DATA && typeof params.itemColor !== "undefined"){
			return params.itemColor;
		} else {
			const COLOR_BREWER = ['#edf8b1', '#7fcdbb', '#2c7fb8'];
			const RANDOM = [
			  "#009688",
			  "#E91E63",
			  "#9C27B0",
			  "#FFC107",
			  "#3F51B5",
			  "#4CAF50",
			  "#FFEB3B",
			  "#673AB7",
			  "#CDDC39",
			  "#FF5722",
			  "#00BCD4",
			  "#f44336",
			  "#FF9800",
			  "#2196F3"
			];
			const MONOTONE = ['#dddddd', '#000000'];
			const BLACK = ['#000000', '#000000'];
			const WHITE = ['#FFFFFF', '#FFFFFF'];
			var color;
			switch (params.type) {
				case Gene.color.MONOTONE:
					color = MONOTONE;
					break;
				case Gene.color.RANDOM:
					color = RANDOM;
					break;
				case Gene.color.VALUE_DEPENDANT:
				case Gene.color.FROM_DATA:
					color = COLOR_BREWER;
					break;
				case Gene.color.WHITE:
					color = WHITE;
					break;
				case Gene.color.BLACK:
				default:
					color = BLACK;
			}
			if(params.type === Gene.color.RANDOM){
				let rand = Math.floor(params.random.random() * (color.length - 1));
				return color[rand];
			} else {
				var chroma = Chroma.scale(color);
				return chroma(params.val).hex();
			}
		}
	}
}


export default Color;

export const GradientColor = (colors, value) => {
	let chroma = Chroma.scale(colors);
	return chroma(value).hex();
}
