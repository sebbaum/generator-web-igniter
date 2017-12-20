let mix = require('laravel-mix');

mix.setPublicPath('public');

mix.sass('src/sass/styles.scss', 'public/css')
  .js('src/js/main.js', 'public/js')
  .copy('src/index.html', 'public/index.html');


mix.browserSync(<%- JSON.stringify(browserSyncConfig) %>);