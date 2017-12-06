let mix = require('laravel-mix');

mix.sass('sass/styles.scss', 'public/css')
  .js('js/main.js', 'public/js')
  .copy('./index.html', 'public/index.html');


mix.browserSync({
  serveStatic: ['./'],
  files: ['./public']
});

// mix.browserSync({
//   proxy: 'https://localhost',
//   host: 'dev.host',
//   open: false,
//   watchOptions: {
//     usePolling: true
//   }
// });