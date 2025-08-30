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
// Gulp-if
const gulpIf = require("gulp-if");
// Path
const path = require("path");

const paths = {
  styles: {
    src: "./src/SCSS/**/*.scss",
    dist: "./public/css",
  },

  scripts: {
    src: "./src/JS/script.js",
    dist: "./public/JS"
  },

  images: {
    src: "./src/assets/images/**/*",
    dist: "./public/assets/images"
  },

  html: "./public/index.html",
  dist: "./public"
};

function prepareCSS() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", (error) => {
      console.error(`Sass error: ${error}`)
    }))
    .pipe(postcss([
      autoprefixer({
        cascade: false,
        grid: "autoplace"
      }),
      cssnano({
        preset: ["default", {
          discardComments: {
            removeAll: true
          }
        }]
      })
    ]))
    .pipe(rename({
      basename: "style",
      suffix: ".min",
      extname: ".css"
    })).on("error", (error) => {
      console.error(`Rename error: ${error}`)
    })
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.styles.dist));
}

function transformJS() {
  return src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ["@babel/env"],
    }).on("error", (error) => {
      console.error(`Babel error: ${error}`);
    }))
    .pipe(terser({
      toplevel: true
    }))
    .pipe(rename({
      basename: "script",
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.scripts.dist));
}

function isNotWebp(file) {
  return path.extname(file.path).toLowerCase() !== ".webp";
}

function compressImages() {
  return src(paths.images.src)
    .pipe(gulpIf(
      isNotWebp, 
      imagemin().on("error", (error) => {
        console.error(`Imagemin error: ${error}`)
      })
    ))
    .pipe(gulpIf(
      isNotWebp, 
      rename({suffix: ".min"}).on("error", (error) => {
        console.error(`Rename error: ${error}`)
      })
    ))
    .pipe(dest(paths.images.dist));
}

function startBrowserSync(cb) {
  browserSync.init(
    {
      host: "192.168.1.101",
      port: 3000,
      injectChanges: true,
      server: {
        baseDir: "./public",
        index: "index.html"
      },
    }
  );

  cb();
}

function watchForChanges() {
  watch(paths.html).on("change", reload);
  watch(paths.styles.src, prepareCSS).on("change", reload);
  watch(paths.scripts.src, transformJS).on("change", reload);
  watch(paths.images.src, compressImages).on("change", reload);
}

module.exports.default = series(prepareCSS, transformJS, compressImages, startBrowserSync, watchForChanges);
module.exports.prepareCSS = prepareCSS;
module.exports.compressImages = compressImages;
module.exports.startBrowserSync = startBrowserSync;
module.exports.watch = watch;