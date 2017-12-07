let mix = require('laravel-mix');

mix.sass('sass/styles.scss', 'public/css')
  .js('js/main.js', 'public/js')
  .copy('./index.html', 'public/index.html');


mix.browserSync({
  serveStatic: ['./public'],
  files: ['./public']
});