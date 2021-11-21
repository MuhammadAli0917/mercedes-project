"use strict";

let path = require('path')
// path.resolve("C:/Users/Nito/Desktop/MohirDev/Git connected projects/Mercedes")
module.exports = {
    mode: "development",
    entry: './src/js/script.js',
    output: {
        filename: "bundle.js",
        path: __dirname + '/src/js',
    },
    watch: true, // hamma narsa ko'rsatib beradi
    devtool: "source-map",
    module: {}
};