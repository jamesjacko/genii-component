module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'murv',
      externals: {
        react: 'React'
      }
    }
  }
}
