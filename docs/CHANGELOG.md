<a name="5.6.2"></a>
## [5.6.2](https://github.com/meisterplayer/ui-htmlui/compare/v5.6.1...v5.6.2) (2018-04-17)


### Bug Fixes

* **volumeslider:** check for TouchEvent to disallow mute on click on mobile. Small fix for mobile on which the volume slider is not hiding ([6bf51dd](https://github.com/meisterplayer/ui-htmlui/commit/6bf51dd))



<a name="5.6.1"></a>
## [5.6.1](https://github.com/meisterplayer/ui-htmlui/compare/v5.6.0...v5.6.1) (2018-03-19)


### Bug Fixes

* **ads:** Fix issue where ad would not show up ([b0fe80f](https://github.com/meisterplayer/ui-htmlui/commit/b0fe80f))



<a name="5.6.0"></a>
# [5.6.0](https://github.com/meisterplayer/ui-htmlui/compare/v5.5.2...v5.6.0) (2018-02-27)



<a name="5.5.2"></a>
## [5.5.2](https://github.com/meisterplayer/ui-htmlui/compare/v5.5.1...v5.5.2) (2018-02-26)


### Bug Fixes

* **click:** Ignore clicks on child elements ([c95cfd0](https://github.com/meisterplayer/ui-htmlui/commit/c95cfd0))
* **style:** moved mstr-item padding to child, when child hidden no padding ([37255a9](https://github.com/meisterplayer/ui-htmlui/commit/37255a9))
* **style:** volumeBarFigure and volumeBarFill interfere with e.pageOffsetY, so pointer-events should be none ([e91e1ab](https://github.com/meisterplayer/ui-htmlui/commit/e91e1ab))
* **volume:** do not show volume element on iOS ([bbf2aed](https://github.com/meisterplayer/ui-htmlui/commit/bbf2aed))
* **volume:** fixed volumebar button vertical positioning ([776a5c2](https://github.com/meisterplayer/ui-htmlui/commit/776a5c2))
* **volume:** replaced fixed height (12) with dynamic height of volumeBarFigure (offsetHeight) ([3732c99](https://github.com/meisterplayer/ui-htmlui/commit/3732c99))



<a name="5.5.1"></a>
## [5.5.1](https://github.com/meisterplayer/ui-htmlui/compare/v5.5.0...v5.5.1) (2018-02-07)


### Bug Fixes

* **fullscreen:** Fix issue where full screen button would not do anything when clicked ([e035326](https://github.com/meisterplayer/ui-htmlui/commit/e035326))
* **fullscreen:** hide fullscreen item with audio items (approved by F. Waller) ([64fada0](https://github.com/meisterplayer/ui-htmlui/commit/64fada0))
* **volume:** Fix issue where slider was still showing on iOS ([9f6dd38](https://github.com/meisterplayer/ui-htmlui/commit/9f6dd38))


### Features

* **directives:** Add TogglePlayPauseClick directive ([353c776](https://github.com/meisterplayer/ui-htmlui/commit/353c776))
* **directives:** Allow multiple directives ([bf412c8](https://github.com/meisterplayer/ui-htmlui/commit/bf412c8))



<a name="5.5.0"></a>
# [5.5.0](https://github.com/meisterplayer/ui-htmlui/compare/v5.4.0...v5.5.0) (2018-02-05)


### Features

* **audioImage:** Use correct styling for use of <img> tag ([abaa888](https://github.com/meisterplayer/ui-htmlui/commit/abaa888))



<a name="5.4.0"></a>
# [5.4.0](https://github.com/meisterplayer/ui-htmlui/compare/v5.3.5...v5.4.0) (2018-01-23)


### Features

* **api:** Use the [data-mstr-id] attribute for event handles ([c2c277d](https://github.com/meisterplayer/ui-htmlui/commit/c2c277d)), closes [#8](https://github.com/meisterplayer/ui-htmlui/issues/8) [meisterplayer/meisterplayer#66](https://github.com/meisterplayer/meisterplayer/issues/66)
* **audio:** Set styles for audio background image ([713456b](https://github.com/meisterplayer/ui-htmlui/commit/713456b))
* **bitrates:** Remember the chosen bitrate via localStorage ([cc42419](https://github.com/meisterplayer/ui-htmlui/commit/cc42419))



<a name="5.3.5"></a>
## [5.3.5](https://github.com/meisterplayer/ui-htmlui/compare/v5.3.4...v5.3.5) (2017-12-28)


### Bug Fixes

* **seekbar:** Fix issue with jumpy seekbar ([60e00ab](https://github.com/meisterplayer/ui-htmlui/commit/60e00ab))



<a name="5.3.3"></a>
## [5.3.3](https://github.com/meisterplayer/ui-htmlui/compare/v5.3.2...v5.3.3) (2017-09-11)



<a name="5.3.1"></a>
## [5.3.1](https://github.com/meisterplayer/ui-htmlui/compare/v5.3.0...v5.3.1) (2017-08-08)


### Bug Fixes

* **layout:** Remove redundant wrapper div ([9ee0740](https://github.com/meisterplayer/ui-htmlui/commit/9ee0740))
* **naming:** Rename standard Seekbar to SeekBar ([07407a1](https://github.com/meisterplayer/ui-htmlui/commit/07407a1))



<a name="5.3.0"></a>
# [5.3.0](https://github.com/meisterplayer/ui-htmlui/compare/v5.2.0...v5.3.0) (2017-07-24)


### Features

* **autohide:** add directive structure and auto-show-hide directive ([968fba8](https://github.com/meisterplayer/ui-htmlui/commit/968fba8))



<a name="5.2.0"></a>
# [5.2.0](https://github.com/meisterplayer/ui-htmlui/compare/v5.1.0...v5.2.0) (2017-07-07)


### Features

* **rename:** Change plugin name to HtmlUi ([f9a8242](https://github.com/meisterplayer/ui-htmlui/commit/f9a8242))
* **template:** allow template to be configured as HTML-string ([32b115c](https://github.com/meisterplayer/ui-htmlui/commit/32b115c))



<a name="5.1.0"></a>
# 5.1.0 (2017-06-27)


### Bug Fixes

* **classes:** Namespace .icon -> .pf-icon ([baa8a11](https://github.com/meisterplayer/ui-customui/commit/baa8a11))


### Features

* **custom:** Add initial support for creating custom ui ([e28ca0e](https://github.com/meisterplayer/ui-customui/commit/e28ca0e))
* **pluginVersion:** Add pluginVersion to class ([f7d066f](https://github.com/meisterplayer/ui-customui/commit/f7d066f))
* **remote:** Add option to load remote templates ([2a0d2b8](https://github.com/meisterplayer/ui-customui/commit/2a0d2b8))
* **standard:** Add option to use elements from standard ui ([c85d48a](https://github.com/meisterplayer/ui-customui/commit/c85d48a))



<a name="1.0.0"></a>
# 1.0.0 (2017-03-19)


### Bug Fixes

* **classes:** Namespace .icon -> .pf-icon ([baa8a11](https://git.triple-it.nl/meister-player/plugin.ui.custom/commits/baa8a11))


### Features

* **custom:** Add initial support for creating custom ui ([e28ca0e](https://git.triple-it.nl/meister-player/plugin.ui.custom/commits/e28ca0e))
* **remote:** Add option to load remote templates ([2a0d2b8](https://git.triple-it.nl/meister-player/plugin.ui.custom/commits/2a0d2b8))
* **standard:** Add option to use elements from standard ui ([c85d48a](https://git.triple-it.nl/meister-player/plugin.ui.custom/commits/c85d48a))



