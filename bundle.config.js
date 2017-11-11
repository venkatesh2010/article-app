module.exports = {
    bundle: {
      main: {
        scripts: [
          './src/js/app.js'
        ],
        styles: './src/css/**/*.css'
      },
      vendor: {
        scripts: './node_modules/material-design-lite/material.min.js',
          styles: './node_modules/material-design-lite/material.min.css'
      }
    },
    copy: './content/**/*.{png,svg}'
  };