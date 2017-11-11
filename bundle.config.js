module.exports = {
    bundle: {
      main: {
        scripts: [
          './src/js/app.js'
        ],
        styles: './src/css/**/*.css'
      },
      vendor: {
        scripts: './node_modules/material-design-lite/material.min.js'
      }
    },
    copy: './content/**/*.{png,svg}'
  };