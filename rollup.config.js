import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

export default [
    {
        input: "src/lzstorage.js",
        output: {
            file: "dist/js/lzstorage.js",
            sourcemap: true,
            format: "umd",
            name: "lzstorage"
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
            name: "lzstorage"
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            }),
            uglify()
        ]
    }
]