"use strict";

var { series, watch } = require("gulp");
var browserSync = require("browser-sync");
var nodemon = require("gulp-nodemon");

function browserSyncfun() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        ignored: ["node_modules/**/*", "/gulpfile.js"],
        files: ["**/*"],
        port: 5001,
        open: false,
    });
}

function nodemonfun(cb) {
    var started = false;

    return nodemon({
        script: "app.js",
    }).on("start", function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
}

exports.default = series(nodemonfun, browserSyncfun);
