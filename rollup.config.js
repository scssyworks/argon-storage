import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default [
    {
        input: "src/argon-storage.js",
        output: {
            file: "dist/js/argon-storage.js",
            sourcemap: true,
            format: "umd",
            name: "ArgonStorage",
            exports: 'named'
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            })
        ]
    },
    {
        input: "src/argon-storage.js",
        output: {
            file: "dist/js/argon-storage.min.js",
            format: "umd",
            name: "ArgonStorage",
            exports: 'named'
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            }),
            terser()
        ]
    }
]