let mix = require('laravel-mix');
require('laravel-mix-purgecss');

/*
 Set the public path where packed files are located
 */
mix.setPublicPath('public');

/*
 Build CSS and purge unused CSS
 */
mix.sass('src/sass/styles.scss', 'public/css')
  .purgeCss({

    // enabled: true,

    // Your custom globs are merged with the default globs. If you need to fully replace
    // the globs, use the underlying `paths` option instead.
    globs: [
      path.join(__dirname, 'src/**/*.*')
    ],

    extensions: ['html', 'js'],

    // Other options are passed through to Purgecss
    whitelistPatterns: [],
  });

/*
 Build and bundle javascript files.
 Finaly copy index.html file
 */
mix.js('src/js/main.js', 'public/js')
  .copy('src/index.html', 'public/index.html');


mix.browserSync(<%- JSON.stringify(browserSyncConfig) %>);