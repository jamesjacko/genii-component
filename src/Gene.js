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
		SPARKLINES: 10,
		BAR: 11
  }
  static color = {
    BLACK: 1,
    MONOTONE: 2,
    RANDOM: 3,
    VALUE_DEPENDANT: 4,
		WHITE: 5
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
		CUBE_SPIRAL: 6
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

  constructor(
    shape = Gene.shape.CIRCLE,
    color = Gene.color.BLACK,
		color_key = Gene.color_key.OFF,
		path_points = Gene.path_points.EVEN,
    path_mode = Gene.path_mode.INLINE,
    path_rotation = Gene.path_rotation.NONE,
		path_grouping = Gene.path_grouping.NONE,
    object_rotation = Gene.object_rotation.NONE,
		object_size = Gene.object_size.FULL,
    filter = Gene.filter.NONE,
		debugging = Gene.debugging.OFF
		)
    {
    this.shape = shape;
    this.color = color;
		this.color_key = color_key;
		this.path_points = path_points;
    this.path_mode = path_mode;
    this.path_rotation = path_rotation;
		this.path_grouping = path_grouping;
    this.object_rotaion = object_rotation;
		this.object_size = object_size;
    this.filter = filter;
		this.debugging = debugging;
  }
}


export default Gene;
