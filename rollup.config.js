const rollup = require('rollup')
const uglify = require('rollup-plugin-uglify')
const babel = require('rollup-plugin-babel')
const filesize = require('rollup-plugin-filesize')
const commonjs = require('rollup-plugin-commonjs')
const conditional = require('rollup-plugin-conditional')

let promise = Promise.resolve()
;['cjs', 'umd'].forEach(format => {
  promise = promise.then(() =>
    rollup
      .rollup({
        entry: 'src/index.js',
        context: 'window',
        plugins: [
          babel({
            exclude: ['node_modules/**'],
          }),
          conditional(format === 'umd', [uglify()]),
          filesize(),
        ],
      })
      .then(bundle =>
        bundle.write({
          dest: `dist/react-trae.${format}${format === 'umd' ? '.min' : ''}.js`,
          moduleName: format === 'umd' ? 'react-trae' : undefined,
          format,
        })
      )
  )
})

promise.catch(err => console.error(err.stack))
