// Gulp
const { src, dest, watch, series } = require("gulp");
// CSS-related plugins
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
// Image compression
const imagemin = require("gulp-imagemin");
// Rename
const rename = require("gulp-rename");
// JavaScript
const babel = require("gulp-babel");
const terser = require("gulp-terser");
// Sourcemaps
const sourcemaps = require("gulp-sourcemaps");
// BrowserSync
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;