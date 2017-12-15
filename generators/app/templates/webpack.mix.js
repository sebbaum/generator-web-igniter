let mix = require('laravel-mix');

mix.setPublicPath('public');

mix.sass('sass/styles.scss', 'public/css')
  .js('js/main.js', 'public/js')
  .copy('./index.html', 'public/index.html');


mix.browserSync(<%- JSON.stringify(browserSyncConfig) %>);