import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

export default [
    {
        input: "src/cstorage.js",
        output: {
            file: "dist/js/cstorage.js",
            sourcemap: true,
            format: "umd",
            name: "cstorage"
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            })
        ]
    },
    {
        input: "src/cstorage.js",
        output: {
            file: "dist/js/cstorage.min.js",
            format: "umd",
            name: "cstorage"
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            }),
            uglify()
        ]
    }
]