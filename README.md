# domcon [![Build Status](https://travis-ci.org/mwri/domcon.svg?branch=master)](https://travis-ci.org/mwri/domcon) [![Coverage Status](https://coveralls.io/repos/github/mwri/domcon/badge.svg?branch=master)](https://coveralls.io/github/mwri/domcon?branch=master)

'Domcon' allows significant DOM structures to be built from a fairly
terse descriptive structure, and facilitates easy access to any elements
as a jQuery selection.

## Quick start

Here's an example building a simple bootstrap form:

```javascript
let form_dc = new domcon('form', {}, [
    ['div', {'class': 'form-group'}, [
        ['label', {}, 'Add friend:'],
        ['input', {'type': 'input', 'class': 'form-control'}],
        ['button', {'type': 'submit', 'class': 'btn btn-primary'}, 'OK'],
    ]],
]);
```

This obviously recursive structure is based around four field
arrays, three of which are apparent above, the element name, an object
of attributes, and the 'inner', which can be a text value or an array
of child element specifications.

This will construct the following:

```html
<form>
  <div class="form-group">
    <label>New label</label>
    <input type="input" class="form-control">
    <button type="submit" class="btn btn-primary">OK</button>
  </div>
</form>
```

And, it will also make the individual elements easily accessible, so to
access the `input` element, as a jQuery selection, to get it's value
for example:

```javascript
let input_value = form_dc.div.input.jquery().val();
```

Because there can be multiple elements of the same name however, the
following also works:

```javascript
let input_value = form_dc.div.input[0].jquery().val();
```

If for example you build DOM elements as follows:

```javascript
let form_dc = new domcon('form', {}, [
    ['div', {'class': 'form-group'}, [
        ['label', {}, 'Add friend:'],
        ['input', {'type': 'input', 'class': 'form-control'}],
        ['label', {}, 'Add enemy:'],
        ['input', {'type': 'input', 'class': 'form-control'}],
        ['button', {'type': 'submit', 'class': 'btn btn-primary'}, 'OK'],
    ]],
]);
```

The first and second input values can now be acquired like this:

```javascript
let friend_input_value = form_dc.div.input[0].jquery().val();
let enemy_input_value = form_dc.div.input[1].jquery().val();
```

Note that though the numbered access method works if there is one or
many elements with the given name, leaving out the number does not
work if there are many.

A way to avoid using the numeric indexing in this case is to supply
an alternative unique ID name, using the fourth field in the element
specification, like this:

```javascript
let form_dc = new domcon('form', {}, [
    ['div', {'class': 'form-group'}, [
        ['label', {}, 'Add friend:'],
        ['input', {'type': 'input', 'class': 'form-control'}, [], 'friend'],
        ['label', {}, 'Add enemy:'],
        ['input', {'type': 'input', 'class': 'form-control'}, [], 'enemy'],
        ['button', {'type': 'submit', 'class': 'btn btn-primary'}, 'OK'],
    ]],
]);
```

Now the input values can now be acquired like this:

```javascript
let friend_input_value = form_dc.div.friend.jquery().val();
let enemy_input_value = form_dc.div.enemy.jquery().val();
```

Or like this (the substitute ID doesn't actually have to be
unique so it is possible for there to me more than one):

```javascript
let friend_input_value = form_dc.div.friend[0].jquery().val();
let enemy_input_value = form_dc.div.enemy[0].jquery().val();
```

## Contents

1. [Quick start](#quick-start).
   1. [Contents](#contents).
   2. [Full API reference](#full-api-reference).
      1. [constructor](#constructor).
      2. [jquery](#jquery).
      3. [append_to](#append_to).
2. [Build](#build).

## Full API reference

Include the ES5 dist as follows:

```html
<script type="text/javascript" src="lib/domcon/dist/domcon.js"></script>
```

Or, if environmentally appropriate, import the `domcon` constructor with
import:

```javascript
import domcon from 'domcon';
```

Or with require:

```javascript
let domcon = require('domcon').default;
```

### constructor

Constructs a `domcon` object, building the DOM elements described. For
example:

```javascript
let form_dc = new domcon('form', {}, [
    ['div', {'class': 'form-group'}, [
        ['label', {}, 'Add friend:'],
        ['input', {'type': 'input', 'class': 'form-control'}],
        ['label', {}, 'Add enemy:'],
        ['input', {'type': 'input', 'class': 'form-control'}, undefined, 'enemy'],
        ['button', {'type': 'submit', 'class': 'btn btn-primary'}, 'OK'],
    ]],
]);
```

The parameters are as follows:

1. The name of the element to build (required).
2. The attributes to apply to the element (optional, defaults to `{}`).
3. The child text or element specifications (optional, defaults to `[]`).
4. An alternative navigation ID (optional, defaults to element name).

The 'child text or element specifications', if it isn't text, is an
array of arrays, each sub array having up to four elements, which are
used as parameters for recursive `domcon` construction of the child
elements.

The above example will construct the following HTML therefore:

```html
<form>
  <div class="form-group">
    <label>Add friend:</label>
    <input type="input" class="form-control">
    <label>Add enemy:</label>
    <input type="input" class="form-control">
    <button type="submit" class="btn btn-primary">OK</button>
  </div>
</form>
```

The elements created can be navigated by using the element names (or the
alternative navigation ID if provided in parameter four. The first input
can be accessed as a `domcon` object as `form_dc.div.input` and as a
jQuery selection as `form_dc.div.input.jquery()`. The second input
can be accessed as a `domcon` object as `form_dc.div.enemy` and as a
jQuery selection as `form_dc.div.enemy.jquery()`, because the altnerative
navigation ID `enemy` was used.

If the second input had not been given an alternative navigation ID the
two inputs jQuery selections would be `form_dc.div.input[0].jquery()` and
`form_dc.div.input[1].jquery()` respectively.

### jquery

Returns a jQuery selection for the represented DOM. For example:

```javascript
dc.jquery().click(my_click_handler);
```

### append_to

Appends the represented DOM to the jQuery selection or DOM element
passed. For example:

```javascript
db.append_to($('#foobar'));
```

The call returns the `domcon` object so that it can be chained to
the constructor, for example:

```javascript
let form_dc = new domcon('div', {}, [
]).append_to($('#parent'));


## Build

run `npm install` to install the dependencies, and `grunt build` to
build (or `./node_modules/.bin/grunt build` if you do not have
grunt, grunt CLI locally installed.

This will run code checkers and linters and the test suite, report on
coverage and build build `dist/domcon_es5.js`, an ES5 babel
transpile of the ES6 source.

Running `grunt watch:build` will watch for changes to the source or
tests and invoke the full build cycle when they are detected. Running
`grunt watch:test` will again watch for changes, and invoke the most
light weight possible file test cycle.

Note that in the event of stack traces being output during the full
build, with coverage reports, the stack trace line numbers will be
broken. Run `test` or `watch:test` for valid stack traces instead
of `build`.
