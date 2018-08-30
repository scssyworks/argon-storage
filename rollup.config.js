import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

export default [
    {
        input: "src/commonstorage.js",
        output: {
            file: "dist/js/commonstorage.js",
            sourcemap: true,
            format: "umd",
            name: "commonstorage"
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            })
        ]
    },
    {
        input: "src/commonstorage.js",
        output: {
            file: "dist/js/commonstorage.min.js",
            format: "umd",
            name: "commonstorage"
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            }),
            uglify()
        ]
    }
]