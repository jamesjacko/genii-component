# MURV - Micro Unit-based React Visualisations

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe murv-component here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo


https://codeburst.io/extracting-a-react-js-component-and-publishing-it-on-npm-2a49096757f5

Go to ```/code/murv-component``` and hit ```yarn``` . After that, ```yarn link```

If everything worked as expected you should see a message like this on your terminal:

```/usr/local/lib/node_modules/murv-component -> /Users/your-name/code/murv-component```

Now go to your app and hit ```yarn link murv```

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
