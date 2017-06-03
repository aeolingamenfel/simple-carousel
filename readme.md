# Simple Carousel

[![npm version](https://badge.fury.io/js/a-simple-carousel.svg)](https://badge.fury.io/js/a-simple-carousel)

A vanilla JS, performant, accessible implementation of a carousel UI element.

Major Features:

 - Vanilla JS: works with your build with no extra frameworks
 - Performant: uses proper render layers to ensure high performance

---

 - [Quickstart](#quickstart)
 - [Creating a Carousel](#creating-a-carousel)
   - [Preparing the HTML](#preparing-the-html)
   - [Initializing the Carousel](#initializing-the-carousel)
 - [API](#api)
   - [Carousel.next()](#carouselnext)
   - [Carousel.previous()](#carouselprevious)
 - [Options](#options)
   - [Element](#element)
   - [Selector](#selector)
   - [Movement Mode](#movement-mode)
   - [Movement Increment](#movement-increment)
   - [Movement Unit](#movement-unit)

## Quickstart

*Note: this quickstart requires [webpack](https://webpack.js.org/) and
[NPM](https://www.npmjs.com/)*

First, get Simple Carousel from NPM:

```
npm i --save a-simple-carousel
```

Next, you'll need to in some way include the CSS file into your build that is
necessary for it to render right. You can *either* include the SASS file into
your SASS build, found at `src/sass/SimpleCarousel.scss` (relative to the
`SimpleCarousel` module), *or* you can just directly import the CSS file from
`dist/css/SimpleCarousel.css` (again, relative to the module root).

Once you have the CSS getting to the page, import `SimpleCarousel` from that
package into your Javascript where needed:

```javascript
import * as SimpleCarousel from "a-simple-carousel";
```

Then just follow the [Creating a Carousel](#creating-a-carousel) documentation
below to get up and running.

## Creating a Carousel

### Preparing the HTML

A Carousel requires a small amount of specific HTML to work properly. Most
notably, the carousel element requires that there be a "tray" element wrapping
around the actual Carousel contents. By default, Simple Carousel looks for an
element beneath the Carousel element with the class of `tray`, but this can be
configured using the [tray selector option](#tray-selector).

Otherwise, no styles or additional configuration need be added; the rest is
handled by the Carousel object when it is initalized.

*Example:*

```html
<div id="my-carousel">
    <div class="tray">
        <!-- carousel items go here -->
    </div>
</div>
```

### Initializing the Carousel

There are two ways to create a Carousel, both of which involves the global
symbol `SimpleCarousel`. You can either use the `SimpleCarousel.init()` which
returns a Carousel instance, or you can instantiate the instance yourself using
`SimpleCarousel.Carousel()` constructor.

Either way, the `init()` method or the `Carousel()` constructor take the same
configuration object, which is documented [below](#options).

**Examples:**

*Creating a slider using the init method*

```javascript
var carousel = SimpleCarousel.init({
    element: document.getElementById("my-carousel")
});
```

*Creating a slider using the constructor*

```javascript
var carousel = new SimpleCarousel.Carousel({
    selector: "#my-carousel"
});
```

## API

Either calling the Carousel constructor or using the `init()` method will return
a `Carousel` object, on which the below methods can be found.

### Carousel.next()

Moves the Carousel forward by one increment of distance (by default, one
screen-length), assuming that that Carousel is not in the middle of moving
already *and* the Carousel is not at the end of its track.

*Example:*

```javascript
var carousel = SimpleCarousel.init({
    element: document.getElementById("my-carousel")
});

carousel.next();
```

### Carousel.previous()

Moves the Carousel backwards by one increment of distance (by default, one
screen-length), assuming that the Carousel is not in the middle of moving
already *and* the Carousel is not and the beginning of its track.

*Example:*

```javascript
var carousel = SimpleCarousel.init({
    element: document.getElementById("my-carousel")
});

carousel.previous();
```

## Options

Below are the options that can be passed to the `init()` method or the
constructor to configure how the carousel works.

The only required option is you *must* specify an element for the carousel to
connect to, either via the `config.element` option or the `config.selector`
option.

### Element

Required: Yes (if [Selector](#selector) option is not specified)<br />
Value: `HTMLElement`<br />
Default: n/a<br />
Key: `element`

Used to specify the `HTMLElement` that the Carousel should connect to. Must be
specified if no element selector is specified.

### Selector

Required: Yes (if [Element](#element) option is not specified)<br />
Value: `String`<br />
Default: n/a<br />
Key: `selector`

The CSS selector specifying the element that the Carousel should connect to.
Must be specified if no element selector is specified.

### Movement Mode

Required: No<br />
Value: `String`<br />
Default: `normal`<br />
Key: `movementMode`

Options: `(normal|child-increment)`

Specifies the movement mode of the Carousel. These modes determine how the
Carousel computes how much to move when the `next()` or `previous()` methods
are called or it otherwise decides to move. See more information about the modes
below.

| Name | Key | Description |
| --- | --- | --- |
| Normal Mode | `normal` | This is the default mode. When active, causes the Carousel to move based on the set [Movement Increment](#movement-increment) and [Movement Unit](#movement-unit) options (or their defaults). |
| Child Increment Mode | `child-increment` | When set, this mode causes the Carousel to ignore the [Movement Increment](#movement-increment) and [Movement Unit](#movement-unit) options, and instead move child-by-child. That is, that the Carousel will move based on each child's width. This is dynamically computed, so if children are different widths, or they change widths, that change will be accounted for. |

### Movement Increment

Required: No<br />
Value: `Integer`<br />
Default: `100`<br />
Key: `movementIncrement`

The increment of movement that the carousel moves every time that `next()` or
`previous()` is called. This is based on the [movement unit](#movement-unit)
setting, so for example, if the movement unit is set to `%` and the movement
increment is set to `50`, then calling `next()` would move the slider `50%`
to the left.

### Movement Unit

Required: No<br />
Value: `String`<br />
Default: `%`<br />
Key: `movementUnit`

The unit to be applied to the movement increment (see
[movement increment](#movement-increment)). Accepts any valid CSS unit.

### Tray Selector

Required: No<br />
Value: `String`<br />
Default: `.tray`<br />
Key: `traySelector`

The CSS selector specifying the tray element. This selector is *relative to* the
parent Carousel element.

If you are not sure what the tray element is or what it is for, please see the
[preparing the HTML](#preparing-the-html) section.
