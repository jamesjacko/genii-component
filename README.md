# Genii Component
[![DOI](https://zenodo.org/badge/155877027.svg)](https://zenodo.org/doi/10.5281/zenodo.12571855)
![Node LTS (16.20)](https://img.shields.io/badge/node-v16.20.x-blue)


Genii Component is a generative library for creating visualisations using a path model and gene-like grammar.

https://codeburst.io/extracting-a-react-js-component-and-publishing-it-on-npm-2a49096757f5

Clone the repo on your computer

Go to ```/genii-component``` and hit ```npm``` . After that, ```npm link```

If everything worked as expected you should see a message like this on your terminal:

```/usr/local/lib/node_modules/genii-component -> /Users/your-name/code/genii-component```

Now go to your app and hit ```npm link genii-component```

## Possible Gene Configurations

```javascript
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
    GRADIENT: 7
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
    MEAN_DEVIATION: 3,
    RING: 4,
    CUBE_SPIRAL: 5,
    INLINE_HALF: 6
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
    RANDOM: 3,
    RADIAL: 4
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
}
```
