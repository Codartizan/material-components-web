<!--docs:
title: "Ripples"
layout: detail
section: components
excerpt: "Ink ripple touch feedback effect."
iconId: ripple
path: /catalog/ripples/
-->

# Ripple

MDC Ripple provides the JavaScript and CSS required to provide components (or any element at all) with a material "ink ripple" interaction effect. It is designed to be efficient, uninvasive, and usable without adding any extra DOM to your elements.

MDC Ripple also works without JavaScript, where it gracefully degrades to a simpler CSS-Only implementation.

## Design & API Documentation

<ul class="icon-list">
  <li class="icon-list-item icon-list-item--spec">
    <a href="https://material.io/guidelines/motion/choreography.html#choreography-radial-reaction">Material Design guidelines: Choreography</a>
  </li>
  <li class="icon-list-item icon-list-item--link">
    <a href="https://material-components-web.appspot.com/ripple.html">Demo</a>
  </li>
</ul>

## Installation

```
npm install --save @material/ripple
```

## Usage

A ripple can be applied to a variety of elements to represent interactive surfaces. Several MDC Web components, such as Button, FAB, Checkbox and Radio, also use ripples.

A ripple can be added to an element through either a JavaScript or CSS-only implementation. When a ripple is initialized on an element using JS, it dynamically adds a `mdc-ripple-upgraded` class to that element. If ripple JS is not initialized but Sass mixins are included on the surface, the ripple uses a simpler CSS-only implementation which relies on `:hover`, `:focus`, and `:active`.

### CSS Classes

CSS Class | Description
--- | ---
`mdc-ripple-surface` | Adds a ripple to the element
`mdc-ripple-surface--primary` | Sets the ripple color to the theme primary color
`mdc-ripple-surface--accent` | Sets the ripple color to the theme secondary color

### Sass Mixins

In order to fully style states as well as the ripple effect for pressed state, both `mdc-ripple` mixins, as well as either the basic or advanced `mdc-states` mixins must be included.

```
.my-ripple-surface {
  @include mdc-ripple-surface;
  @include mdc-ripple-radius;
  @include mdc-states; /* Basic mdc-states mixin */
}
```

These APIs use pseudo-elements for the ripple effect: `::before` for the background, and `::after` for the foreground.

#### Ripple Mixins

Mixin | Description
--- | ---
`mdc-ripple-surface` | Adds base styles for a ripple surface
`mdc-ripple-radius($radius)` | Adds styles for the radius of the ripple effect,<br>for both bounded and unbounded ripples

#### Basic States Mixins

When using the basic states mixins, inclusion of the `mdc-states` mixin is mandatory.
Inclusion of `mdc-states-activated` or `mdc-states-selected` is optional, depending on whether activated or selected
states are applicable to the component in question.

Mixin | Description
--- | ---
`mdc-states($color, $has-nested-focusable-element)` | Mandatory. Adds state and ripple styles in the given color
`mdc-states-activated($color, $has-nested-focusable-element)` | Optional. Adds state and ripple styles for activated states in the given color
`mdc-states-selected($color, $has-nested-focusable-element)` | Optional. Adds state and ripple styles for selected states in the given color

> _NOTE_: Each of the mixins above adds state and ripple styles using the indicated color, deciding opacities based on whether the passed color is light or dark.<br>`$has-nested-focusable-element` defaults to `false` but should be set to `true` if the component contains a focusable element (e.g. an input) under the root node.

#### Advanced States Mixins

When using the advanced states mixins, every one of the mixins below should be included at least once.

These mixins can also be used to emit activated or selected styles if applicable, by applying them within a selector for
`&--activated` or `&--selected` modifier classes.

Mixin | Description
--- | ---
`mdc-states-base-color($color)` | Mandatory. Sets up base state styles using the provided color
`mdc-states-hover-opacity($opacity)` | Mandatory. Adds styles for hover state using the provided opacity
`mdc-states-focus-opacity($opacity, $has-nested-focusable-element)` | Mandatory. Adds styles for focus state using the provided opacity
`mdc-states-press-opacity($opacity)` | Mandatory. Adds styles for press state using the provided opacity

> _NOTE_: `$has-nested-focusable-element` defaults to `false` but should be set to `true` if the component contains a focusable element (e.g. an input) under the root node.

### `MDCRipple`

The `MDCRipple` JavaScript component allows for programmatic activation / deactivation of the ripple, for interdependent interaction between
components. For example, this is used for making form field labels trigger the ripples in their corresponding input elements.

To use the `MDCRipple` component, first [import the `MDCRipple` JS](../../docs/importing-js.md). Then, initialize the ripple with the correct DOM element.

```javascript
const surface = document.querySelector('.my-ripple-surface');
const ripple = new MDCRipple(surface);
```

You can also use `attachTo()` as an alias if you don't care about retaining a reference to the
ripple.

```javascript
MDCRipple.attachTo(document.querySelector('.my-ripple-surface'));
```

Property | Value Type | Description
--- | --- | ---
`unbounded` | Boolean | Whether or not the ripple is unbounded
> _NOTE_: Surfaces for bounded ripples should have the `overflow` property set to `hidden`, while surfaces for unbounded ripples should have it set to `visible`.

Method Signature | Description
--- | ---
`activate() => void` | Proxies to the foundation's `activate` method
`deactivate() => void` | Proxies to the foundation's `deactivate` method
`layout() => void` | Proxies to the foundation's `layout` method

### `MDCRippleAdapter`

| Method Signature | Description |
| --- | --- |
| `browserSupportsCssVars() => boolean` | Whether or not the given browser supports CSS Variables. |
| `isUnbounded() => boolean` | Whether or not the ripple should be considered unbounded. |
| `isSurfaceActive() => boolean` | Whether or not the surface the ripple is acting upon is [active](https://www.w3.org/TR/css3-selectors/#useraction-pseudos) |
| `isSurfaceDisabled() => boolean` | Whether or not the ripple is attached to a disabled component |
| `addClass(className: string) => void` | Adds a class to the ripple surface |
| `removeClass(className: string) => void` | Removes a class from the ripple surface |
| `registerInteractionHandler(evtType: string, handler: EventListener) => void` | Registers an event handler on the ripple surface |
| `deregisterInteractionHandler(evtType: string, handler: EventListener) => void` | Unregisters an event handler on the ripple surface |
| `registerDocumentInteractionHandler(evtType: string, handler: EventListener) => void` | Registers an event handler on the documentElement |
| `deregisterDocumentInteractionHandler(evtType: string, handler: EventListener) => void` | Unregisters an event handler on the documentElement |
| `registerResizeHandler(handler: Function) => void` | Registers a handler to be called when the ripple surface (or its viewport) resizes |
| `deregisterResizeHandler(handler: Function) => void` | Unregisters a handler to be called when the ripple surface (or its viewport) resizes |
| `updateCssVariable(varName: string, value: (string or null)) => void` | Sets the CSS property `varName` on the ripple surface to the value specified |
| `computeBoundingRect() => ClientRect` | Returns the ClientRect for the surface |
| `getWindowPageOffset() => {x: number, y: number}` | Returns the `page{X,Y}Offset` values for the window object |

> _NOTE_: When implementing `browserSupportsCssVars`, please take the [Edge](#caveat-edge) and [Safari 9](#caveat-safari) considerations into account. We provide a `supportsCssVariables` function within the `util.js` which we recommend using, as it handles this for you. 

### `MDCRippleFoundation`

Method Signature | Description
--- | ---
`activate() => void` | Triggers an activation of the ripple (the first stage, which happens when the ripple surface is engaged via interaction, such as a `mousedown` or a `pointerdown` event). It expands from the center.
`deactivate() => void` | Triggers a deactivation of the ripple (the second stage, which happens when the ripple surface is engaged via interaction, such as a `mouseup` or a `pointerup` event). It expands from the center.
`layout() => void` | Recomputes all dimensions and positions for the ripple element. Useful if a ripple surface's position or dimension is changed programmatically.
`setUnbounded(boolean: unbounded) => void` | Sets the ripple to be unbounded or not based on the given boolean.

## Tips/Tricks

### Using a sentinel element for a ripple

Usually, you'll want to leverage `::before` and `::after` pseudo-elements when integrating the ripple into MDC-Web components. If you find you can't use pseudo-elements to style the ripple, another strategy could be to use a sentinel element that goes inside your element and covers its surface. Doing this should get you the same effect.

```html
<div class="my-component">
  <div class="mdc-ripple-surface"></div>
  <!-- your component DOM -->
</div>
```

### Unbounded ripple

If you'd like to use _unbounded_ ripples, such as those used for checkboxes and radio buttons, you
can do so either imperatively in JS _or_ declaratively using the DOM.

#### Using JS

You can set an `unbounded` property to specify whether or not the ripple is unbounded.

```javascript
const ripple = new MDCRipple(root);
ripple.unbounded = true;
```

#### Using DOM (Component Only)

If you are using our vanilla component for the ripple (not our foundation class), you can add a
data attribute to your root element indicating that you wish the ripple to be unbounded:

```html
<div class="surface" data-mdc-ripple-is-unbounded>
  <p>A surface</p>
</div>
```

### MDCRipple with custom functionality

Usually, you'll want to use `MDCRipple` _along_ with the component for the actual UI element you're trying to add a
ripple to. `MDCRipple` has a static `createAdapter(instance)` method that can be used to instantiate a ripple within
any `MDCComponent` that requires custom adapter functionality.

```js
class MyMDCComponent extends MDCComponent {
  constructor() {
    super(...arguments);
    const foundation = new MDCRippleFoundation(Object.assign(MDCRipple.createAdapter(this), {
      isSurfaceActive: () => this.isActive_, /* Custom functionality */
    }));
    this.ripple_ = new MDCRipple(this.root_, foundation);
  }
}
```

### Keyboard interaction for custom UI components

Different keyboard events activate different elements. For example, the space key activate buttons, while the enter key activates links. Handling this by sniffing the key/keyCode of an event is brittle and error-prone, so instead we take the approach of using `adapter.isSurfaceActive()`. The
way in which our default vanilla DOM adapter determines this is by using
`element.matches(':active')`. However, this approach will _not_ work for custom components that
the browser does not apply this pseudo-class to.

If you want your component to work properly with keyboard events, you'll have to listen for both `keydown` and `keyup` and set some sort of state that the adapter can use to determine whether or not the surface is "active".

```js
class MyComponent {
  constructor(el) {
    this.el = el;
    this.active = false;
    const foundation = new MDCRippleFoundation({
      // ...
      isSurfaceActive: () => this.active
    });
    this.el.addEventListener('keydown', evt => {
      if (isSpace(evt)) {
        this.active = true;
      }
    });
    this.el.addEventListener('keyup', evt => {
      if (isSpace(evt)) {
        this.active = false;
      }
    });
    this.ripple_ = new MDCRipple(this.root_, foundation);
  }
}
```

### Specifying known element dimensions

If you asynchronously load style resources, such as loading stylesheets dynamically via scripts
or loading fonts, then `adapter.getClientRect()` may by default return _incorrect_ dimensions when
the ripple foundation is initialized. For example, if you put a ripple on an element that uses an
icon font, and the size of the icon font isn't specified at initialization time, then if that icon
font hasn't loaded it may report the intrinsic width/height incorrectly. In order to prevent this,
you can override the default behavior of `getClientRect()` to return the correct results. For
example, if you know an icon font sizes its elements to `24px` width/height, you can do the
following:

```js
const foundation = new MDCRippleFoundation({
  // ...
  computeBoundingRect: () => {
    const {left, top} = element.getBoundingClientRect();
    const dim = 24;
    return {
      left,
      top,
      width: dim,
      height: dim,
      right: left + dim,
      bottom: top + dim
    };
  }
});
this.ripple_ = new MDCRipple(this.root_, foundation);
```

### The util API

External frameworks and libraries can use the following utility methods when integrating a component.

Method Signature | Description
--- | ---
`util.supportsCssVariables(windowObj, forceRefresh = false) => Boolean` | Determine whether the current browser supports CSS variables (custom properties). This function caches its result; `forceRefresh` will force recomputation, but is used mainly for testing and should not be necessary in normal use.
`util.applyPassive(globalObj = window, forceRefresh = false) => object` | Determine whether the current browser supports passive event listeners, and if so, use them. This function caches its result; `forceRefresh` will force recomputation, but is used mainly for testing and should not be necessary in normal use.
`util.getMatchesProperty(HTMLElementPrototype) => Function` | Choose the correct matches property to use on the current browser.
`util.getNormalizedEventCoords(ev, pageOffset, clientRect) => object` | Determines X/Y coordinates of an event normalized for touch events and ripples.

## Caveats

### Caveat: Edge

> TL;DR ripples are disabled in Edge because of issues with its support of CSS variables in pseudo elements.

Edge introduced CSS variables in version 15. Unfortunately, there are
[known issues](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/)
involving its implementation for pseudo-elements which cause ripples to behave incorrectly.
We feature-detect Edge's buggy behavior as it pertains to `::before`, and do not initialize ripples if the bug is
observed. Earlier versions of Edge (and IE) are not affected, as they do not report support for CSS variables at all,
and as such ripples are never initialized.

### Caveat: Safari 9

> TL;DR ripples are disabled in Safari 9 because of a nasty CSS variables bug.

The ripple works by updating CSS Variables which are used by pseudo-elements. This allows ripple
effects to work on elements without the need to add a bunch of extra DOM to them. Unfortunately, in
Safari 9.1, there is a nasty bug where updating a css variable on an element will _not_ trigger a
style recalculation on that element's pseudo-elements which make use of the css variable (try out
[this codepen](http://codepen.io/traviskaufman/pen/jARYOR) in Chrome, and then in Safari 9.1 to
see the issue). We feature-detect around this using alternative heuristics regarding different
webkit versions: Webkit builds which have this bug fixed (e.g. the builds used in Safari 10+)
support [CSS 4 Hex Notation](https://drafts.csswg.org/css-color/#hex-notation) while those do not
have the fix don't. We use this to reliably feature-detect whether we are working with a WebKit
build that can handle our usage of CSS variables.

### Caveat: Mobile Safari

> TL;DR for CSS-only ripple styles to work as intended, register a `touchstart` event handler on the affected element or its ancestor.

Mobile Safari does not trigger `:active` styles noticeably by default, as
[documented](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/AdjustingtheTextSize/AdjustingtheTextSize.html#//apple_ref/doc/uid/TP40006510-SW5)
in the Safari Web Content Guide. This effectively suppresses the intended pressed state styles for CSS-only ripple surfaces. This behavior can be remedied by registering a `touchstart` event handler on the element, or on any common ancestor of the desired elements.

See [this StackOverflow answer](https://stackoverflow.com/a/33681490) for additional information on mobile Safari's behavior.

### Caveat: Theme Custom Variables

> TL;DR theme custom variable changes will not propagate to ripples if the browser does not support
> [CSS 4 color-mod functions](https://drafts.csswg.org/css-color/).

The way that [mdc-theme works](../mdc-theme#mdc-theme-prop-mixin) is that it emits two properties: one with the hard-coded sass variable, and another for a
CSS variable that can be interpolated. The problem is that ripple backgrounds need to have an opacity, and currently there's no way to opacify a pre-existing color defined by a CSS variable.
There is an editor's draft for a `color-mod` function (see link in TL;DR) that _can_ do this:

```css
background: color(var(--mdc-theme-primary) a(6%));
```

But as far as we know, no browsers yet support it. We have added a `@supports` clause into our code
to make sure that it can be used as soon as browsers adopt it, but for now this means that _changes
to your theme via a custom variable will not propagate to ripples._ We don't see this being a gigantic issue as we envision most users configuring one theme via sass. For places where you do need this, special treatment will have to be given.
