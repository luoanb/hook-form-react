// rollup.config.mjs
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { uglify } from 'rollup-plugin-uglify'
import dts from 'rollup-plugin-dts'

import pkg from './package.json' assert { type: 'json' }

const defineLib = ({ input, outputName }) => {
  return [
    {
      input,
      external: ['react'],
      output: [
        { file: `dist/${outputName}.cjs.js`, format: 'cjs' },
        { file: `dist/${outputName}.esm.js`, format: 'es' }
      ],
      plugins: [
        typescript(),
        commonjs(), // so Rollup can convert `ms` to an ES module
        ...(process.env.NODE_ENV === 'development' ? [] : [terser(), uglify()])
      ]
    },

    // 声明
    {
      input,
      external: ['react', '@nextui-org/react', 'antd'],
      output: [
        {
          file: `dist/${outputName}.d.ts`
        }
      ],
      plugins: [dts()]
    }
  ]
}
/** @type {import('rollup').RollupOptions} */
export default [
  {
    input: 'src/forUmd.ts',
    output: {
      name: 'hookFormReact',
      file: pkg.browser,
      format: 'umd'
    },
    external: ['react', '@nextui-org/react', 'antd'],
    plugins: [
      typescript(),
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      ...(process.env.NODE_ENV === 'development' ? [] : [terser(), uglify()])
    ]
  },
  ...defineLib({ input: 'src/Antd_5/index.tsx', outputName: 'Antd_5', name: 'hookFormReact' }),
  ...defineLib({ input: 'src/index.ts', outputName: 'index', name: 'hookFormReact' })
]
