/* eslint-disable @typescript-eslint/camelcase */
import replace from 'rollup-plugin-replace'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

const mergeAll = objs => Object.assign({}, ...objs)

const cjs = {
  exports: 'named',
  format: 'cjs',
}

const esm = {
  format: 'es',
}

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}

const commonPlugins = [
  typescript({
    typescript: require('typescript'),
  }),
]

const configBase = {
  output: {
    exports: 'named',
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: commonPlugins,
}

const umdConfig = mergeAll([
  configBase,
  {
    input: 'src/index.ts',
    output: mergeAll([
      configBase.output,
      {
        file: `dist/msk-umd.js`,
        format: 'umd',
        name: 'MSK',
        globals,
      },
    ]),
    external: Object.keys(pkg.peerDependencies || {}),
  },
])

const devUmdConfig = mergeAll([
  umdConfig,
  {
    input: 'src/index.ts',
    plugins: umdConfig.plugins.concat(
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      })
    ),
  },
])

const webConfig = mergeAll([
  configBase,
  {
    input: 'src/index.ts',
    output: [
      mergeAll([configBase.output, { ...esm, file: pkg.module }]),
      mergeAll([configBase.output, { ...cjs, file: pkg.main }]),
    ],
    plugins: configBase.plugins.concat(),
  },
])

export default [devUmdConfig, webConfig]
