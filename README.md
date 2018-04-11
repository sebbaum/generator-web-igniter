# generator-web-igniter [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A yeoman generator to kickstart your frontend development.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-web-igniter using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-web-igniter
```

Then generate your new project:

```bash
yo web-igniter
```

## Supported features
* Webpack
* BrowserSync
* SASS
* purgeCSS
* Vanilla JS
* jquery
* Google Analytics with cookie bar
* Basic imprint (Impressum) page

### Google Analytics and the cookie bar
Here are some more information on Google Analytics (GA). 
By default IP anonymization is activated. So it is not possibile to track the exact geo location
of your website's visitors. In Europe this is a legal requirement. However you can deactivate IP 
anonymization like so:
In `src/index.html` find:
```
gtag('config', gaProperty, { 'anonymize_ip': true });
```
and set `anonymize_ip` to `false`.

If GA is enabled a cookie bar is integrated automatically to your website. This is also a legal requirement in Europe.
You can customize the behavior and the look like so:
In `src/js/main.js`:
```
/*
 * Integration of a simple cookie bar.
 */
import SimpleCookieConsent from 'simple-cookie-consent';

new SimpleCookieConsent(
  {
    policyText: 'Your cookie text goes here',
    barClassName: '',
    additionalLink: 'privacy.html',
    additionalLinkText: 'Privacy Policy'
  });
```
The look can be edited in `src/sass/styles.scss`
```
@import '../../node_modules/simple-cookie-consent/dist/simple-cookie-consent.min.css';

.c-simple-cookie-consent {
  // Bar styles here (e.g. background-color, position, z-index)

  &__policy {
    // Message styling here (e.g. font)
  }

  &__button {
    // Styles that apply to both the 'accept' and 'additonal button'. (e.g. background-color)
    &--additional {
      // Styles specifically for the 'additonal' button which override the base button styling
    }
  }
}
```
For more information about the cookie bar, check [Simple Cookie Consent](https://www.npmjs.com/package/simple-cookie-consent).

## Basic imprint page
In some countries (Germany for example) it is required to have an imprint page (Impressum) if you run a
commercial website. Now you can optionally generate a basic imprint page with our generator. You just have to replace 
the placeholders `[IN UPPER CASE]` in `src/pages/impressum.html with your specific information. Since the imprint is required in Germany, the generated imprint page
is in german language.

If you also activated Google Analytics there is a special section about Google Analytics and oup-out links integrated
in the generated imprint.

## Roadmap
* Integration of frontend frameworks

## License
Apache-2.0 © [Sebastian Baum](http://www.sebbaum.de)


[npm-image]: https://badge.fury.io/js/generator-web-igniter.svg
[npm-url]: https://npmjs.org/package/generator-web-igniter
[travis-image]: https://travis-ci.org/sebbaum/generator-web-igniter.svg?branch=master
[travis-url]: https://travis-ci.org/sebbaum/generator-web-igniter
[daviddm-image]: https://david-dm.org/sebbaum/generator-web-igniter.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/sebbaum/generator-web-igniter
