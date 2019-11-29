let tailwindcss = require("tailwindcss");
let mix = require("laravel-mix");
let glob = require("glob-all");
let PurgecssPlugin = require("purgecss-webpack-plugin");

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
    }
}

// PRODUCTION
if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            new PurgecssPlugin({
                paths: glob.sync([
                    path.join(__dirname, "*.html"),
                    path.join(__dirname, "js/**/*.js"),
                ]),
                extractors: [{
                    extractor: TailwindExtractor,
                    extensions: ["html", "js"]
                }],
                whitelist: [
                    path.join(__dirname, "scss/**/*.scss")
                ],
            })
        ]
    });
} else {
    mix.sourceMaps();
}

mix.js("src/js/app.js", "dist/js/app.min.js")
.sass("src/scss/app.scss", "dist/css/app.css")
.sass("src/scss/base.scss", "dist/css/base.css")
.sourceMaps()
.options({
    processCssUrls: false,
    postCss: [
        require("autoprefixer"),
        tailwindcss("./src/js/tailwind.config.js")
    ],
    clearConsole: true,
    publicPath: "./"
});
