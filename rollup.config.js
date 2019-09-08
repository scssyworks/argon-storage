import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default [
    {
        input: "src/lzstorage.js",
        output: {
            file: "dist/js/lzstorage.js",
            sourcemap: true,
            format: "umd",
            name: "lzs"
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            })
        ]
    },
    {
        input: "src/lzstorage.js",
        output: {
            file: "dist/js/lzstorage.min.js",
            format: "umd",
            name: "lzs"
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            }),
            terser()
        ]
    }
]