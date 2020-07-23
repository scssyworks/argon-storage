import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";

const commonConfig = {
    input: "src/argon-storage.js",
    output: {
        sourcemap: true,
        name: "ArgonStorage",
        exports: 'named',
        globals: {
            window: 'window'
        }
    }
};

const umdConfig = Object.assign({}, commonConfig);
umdConfig.output = Object.assign({}, commonConfig.output, {
    file: 'dist/umd/index.js',
    format: 'umd'
});
umdConfig.plugins = [
    babel({
        exclude: "node_modules/**"
    }),
    cleanup({
        maxEmptyLines: 0
    })
];

const umdProdConfig = Object.assign({}, umdConfig);
umdProdConfig.output = Object.assign({}, umdConfig.output, {
    file: 'dist/umd/index.min.js',
    sourcemap: false
});
umdProdConfig.plugins = [
    ...umdConfig.plugins,
    terser()
];

const esmConfig = Object.assign({}, commonConfig);
esmConfig.output = Object.assign({}, commonConfig.output, {
    file: 'dist/esm/index.esm.js',
    format: 'esm'
});
esmConfig.plugins = [
    babel({
        exclude: "node_modules/**"
    }),
    cleanup({
        maxEmptyLines: 0
    })
];

const esmProdConfig = Object.assign({}, esmConfig);
esmProdConfig.output = Object.assign({}, esmConfig.output, {
    file: 'dist/esm/index.esm.min.js',
    sourcemap: false
});
esmProdConfig.plugins = [
    ...esmConfig.plugins,
    terser()
];

export default [
    umdConfig,
    umdProdConfig,
    esmConfig,
    esmProdConfig
]