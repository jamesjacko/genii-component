class Gene{
  static shape = {
    CIRCLE: 1,
    SQUARE: 2,
    ELLIPSE: 3,
    TRIANGLE: 4,
    HUMP: 5,
		DONUT: 6,
		RADIAL: 7,
		STAR: 8,
		I_RADIAL: 9,
		SPARKLINE: 10,
		BAR: 11,
    RADIAL_BAR: 12
  }
  static color = {
    BLACK: 1,
    MONOTONE: 2,
    RANDOM: 3,
    VALUE_DEPENDANT: 4,
		WHITE: 5,
		FROM_DATA: 6,
  }
	static color_key = {
		OFF: 1,
		ON: 2
	}
	static path_points = {
		EVEN: 1,
		VALUE_DEPENDANT: 2
	}
  static path_mode = {
    INLINE: 1,
    RANDOM: 2,
    VALUE_DEPENDANT: 3,
    MEAN_DEVIATION: 4,
		RING: 5,
		CUBE_SPIRAL: 6,
    INLINE_HALF: 7
  }
  static path_rotation = {
    NONE: 1,
    MEAN_DEPENDANT: 2,
    RANDOM: 3
  }
	static path_grouping = {
		NONE: 1,
		DATA_GROUP: 2,
	}
  static object_rotation = {
    NONE: 1,
    VALUE_DEPENDANT: 2,
    RANDOM: 3
  }
	static object_size = {
		FULL: 1,
		VALUE_DEPENDANT: 2,
    WIN_LOSS: 3
	}
  static filter = {
    NONE: 1,
    GOO: 2
  }
	static debugging = {
		OFF: 1,
		ON: 2
	}

	// static DEF_BAR = {
	// 	shape: this.shape.BAR,
	// 	color: this.color.FROM_DATA,
	// 	color_key: this.color_key.OFF,
	// 	path_points: this.path_points.EVEN,
	// 	path_mode: this.path_mode.INLINE,
	// 	path_rotation: this.path_rotation.NONE,
	// 	path_grouping: this.path_grouping.NONE,
	// 	object_rotation: this.object_rotation.NONE,
	// 	object_size: this.object_size.FULL,
	// 	filter: this.filter.OFF,
	// 	debugging: this.debugging.OFF
	// };
	//
	// static DEF_DONUT = {
	// 	shape: this.shape.DONUT,
	// 	color: this.color.FROM_DATA,
	// 	color_key: this.color_key.OFF,
	// 	path_points: this.path_points.EVEN,
	// 	path_mode: this.path_mode.RING,
	// 	path_rotation: this.path_rotation.NONE,
	// 	path_grouping: this.path_grouping.NONE,
	// 	object_rotation: this.object_rotation.NONE,
	// 	object_size: this.object_size.FULL,
	// 	filter: this.filter.OFF,
	// 	debugging: this.debugging.OFF
	// };

  constructor(params){
    this.shape = params.shape || Gene.shape.CIRCLE;
    this.color = params.color || Gene.shape.BLACK;
		this.color_key = params.color_key || Gene.color_key.OFF;
		this.path_points = params.path_points || Gene.path_points.EVEN;
    this.path_mode = params.path_mode || Gene.path_mode.INLINE;
    this.path_rotation = params.path_rotation || Gene.path_rotation.NONE;
		this.path_grouping = params.path_grouping || Gene.path_grouping.NONE;
    this.object_rotaion = params.path_rotation || Gene.path_rotation.NONE;
		this.object_size = params.object_size || Gene.object_size.FULL;
    this.filter = params.filter || Gene.filter.OFF;
		this.debugging = params.debugging || Gene.debugging.OFF;
  }
}


export default Gene;
