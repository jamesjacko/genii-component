import Gene from './Gene';

class ErrorHandler{
	static checkGene(gene)
	{
		var warn = [];
		var error = [];
		if(gene.filter === Gene.filter.GOO && gene.shape !== Gene.shape.CIRCLE){
			warn.push("\"Gene.filter.GOO\" filter should only be used in conjunction with \"Gene.shape.CIRCLE\"");
		}
		if(gene.object_rotaion !== Gene.object_rotation.NONE && gene.shape === Gene.shape.CIRCLE){
			warn.push("\"Gene.shape.CIRCLE\" should not have a \"Gene.object_rotation\" applied as it will have no visual effect ");
		}
		if((
			gene.shape === Gene.shape.DONUT ||
			gene.shape === Gene.shape.RADIAL ||
			gene.shape === Gene.shape.I_RADIAL ||
			gene.shape === Gene.shape.STAR)
			&&
			gene.path_mode !== Gene.path_mode.RING){
			error.push("\"Gene.shape.DONUT\", \"Gene.shape.RADIAL\", \"Gene.shape.I_RADIAL\" and \"Gene.shape.STAR\" must only be used in conjuntion with \"Gene.path_mode.RING\". Please either change the shape or the path mode.");
		}
		if(gene.path_mode === Gene.path_mode.RING &&
			 gene.path_grouping !== Gene.path_grouping.NONE){
				 error.push("\"Gene.path_grouping.DATA_GROUP\" must not be used in conjuntion with \"Gene.path_mode.RING\". Please either change the grouping or the path mode.");
		}
		if(gene.path_grouping === Gene.path_grouping.DATA_GROUP &&
			gene.path_mode !== Gene.path_mode.INLINE
		){
					 error.push("\"Gene.path_grouping.DATA_GROUP\" must be used in conjuntion with \"Gene.path_mode.INLINE\". Please either change the grouping or the path mode.");
		}
		for (var i = 0; i < warn.length; i++) {
			console.warn(warn[i]);
		}
		for (i = 0; i < error.length; i++) {
			 throw new Error(error[i]);
		}
	}
}

export default ErrorHandler;
