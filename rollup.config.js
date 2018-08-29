import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

export default [
    {
        input: "src/jquerystorage.js",
        output: {
            file: "dist/js/jquerystorage.js",
            sourcemap: true,
            format: "umd",
            name: "commonStore"
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            })
        ]
    },
    {
        input: "src/jquerystorage.js",
        output: {
            file: "dist/js/jquerystorage.min.js",
            format: "umd",
            name: "commonStore"
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            }),
            uglify()
        ]
    }
]