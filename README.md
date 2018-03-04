# domcon [![Build Status](https://travis-ci.org/mwri/domcon.svg?branch=master)](https://travis-ci.org/mwri/domcon) [![Coverage Status](https://coveralls.io/repos/github/mwri/domcon/badge.svg?branch=master)](https://coveralls.io/github/mwri/domcon?branch=master)

'Domcon' allows significant DOM structures to be built from a fairly
terse descriptive structure, and facilitates easy access to any elements.

Note that version 2 does not require jQuery, the dependency was removed
as it was adding very little value, and some methods as well which were
just pass throughs or had no clear use case. jQuery is used in the test
suite for convenience however.

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

The same construction can be achieved more tersely still with:

```javascript
let nl_form_dc = new domcon(
    {'form': [
        {'div[class="form-group"]': [
            {'label': 'New label'},
            {'input[type="input",class="form-control"]': ''},
            {'button[type="submit",class="btn btn-primary"]': 'OK'},
        ]},
    ]}
);
```

This might look like only a marginal improvement, but some constructions
are MUCH more terse, where the parser can make assumptions about your
intent. See the [constructor](#constructor) documentation for details.

The individual elements are made easily accessible, which is crucial if
you construct a large lump of DOM but then need easy access to the
various bits. So to access the `input` element for example:

```javascript
let input_element = form_dc.div.input.e;
```

Because there can be multiple elements of the same name however, the
following also works:

```javascript
let input_element = form_dc.div.input[0].e;
```

If you build DOM elements as follows:

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
let friend_input_element = form_dc.div.input[0].e;
let enemy_input_element = form_dc.div.input[1].e;
```

Note that though this numbered access method works if there is one or
many elements with the given name, leaving out the number does not
work if there are many, as this would be ambiguous and require
arbitrary behaviour.

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
let friend_input_element = form_dc.div.friend.e;
let enemy_input_element = form_dc.div.enemy.e;
```

Or like this (the substitute ID doesn't actually have to be
unique so it is possible for there to me more than one):

```javascript
let friend_input_element = form_dc.div.friend[0].e;
let enemy_input_element = form_dc.div.enemy[0].e;
```

## Contents

1. [Quick start](#quick-start).
   1. [Contents](#contents).
   2. [Full API reference](#full-api-reference).
      1. [Attributes](#attributes).
         1. [e](#e).
      2. [Functions](#functions).
         1. [constructor](#constructor).
         2. [append_to](#append_to).
         3. [append](#append).
2. [Build](#build).

## Full API reference

Include the ES5 dist as follows:

```html
<script type="text/javascript" src="lib/domcon/dist/domcon.js"></script>
```

### attributes

#### e

The `e` attribute is the DOM element. So for example if `dc` is your
`domcon` object `dc.e` will be the DOM element it represents, or
`$(dc.e)` the equivalent jQuery selection of it. A child element
is no different so `dc.form.input.e` and `$(dc.form.input.e)` would
be the input child(ren) element(s) of the form of the `domcon` object
and the jQuery selection respectively.

The jQuery selection conversion will work transparently if there is
a single or many children, and you can end up with a jQuery selection
which has fairly arbitrary elements represented, because those are
the ones you tagged with a particular alternative name.

### functions

#### constructor

Constructs a `domcon` object, building the DOM elements described. There
are two structural formats that may be used, the first is based around
a recursive four element array format, for example:

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
alternative navigation ID if provided in parameter four. In the example
above, the first input `domcon` object will be `form_dc.div.input`, and
the second input `domcon` object will be `form_dc.div.enemy`, because
the altnerative navigation ID `enemy` was used. Append `.e` to get the
element represented by the `domcon` object.

If the second input had not been given an alternative navigation ID the
two input `domcon` objects would have been `form_dc.div.input[0]` and
`form_dc.div.input[1]` respectively.

The second **more terse specification** can make assumptions about
your intent, based on DOM expectations, and this, along with some other
adjustments to the format, can make it much more terse. First, the
form above in this altnerative more terse format:

```javascript
let form_dc = new domcon(
    {'form': [
        {'div[class="form-group"]': [
            {'label': 'Add friend:'},
            {'input[type="input",class="form-control"]': ''},
            {'label': 'Add enemy:'},
            {'input/enemy[type="input",class="form-control"]': ''},
            {'button[type="submit",class="btn btn-primary"]': 'OK'},
        ]},
    ]},
);
```

There is no assumption advantage here however, so, a better example is a
table. Take the following:

```javascript
let table_dc = new domcon(
    {'table': [
        {'tr': ['ID', 'Name', 'Position', 'Online']},
        {'tbody': [
            {'tr/first[class="blue",id="top"]': ['1', 'Michael', 'Director', {'td[class="online"]': '4 min'}]},
            {'tr': ['2', 'John', 'Manager', {'td[class="online"]': '1 hour'}]},
            {'tr': ['3', 'Andrew', 'Janitor', {'td[class="offline"]': 'Offline'}]},
        ]},
    ]}
);
```

Here, a simple string is given for all the `TR` child elements
constituting the table header, and the same for many of the `TR`
child elements in the table body as well. The context (i.e. `TR`
inside `TABLE` or `TR` inside `TBODY` allows the parser to decide
if a `TH` or a `TD` should be created.

The HTML generated in this case is:

```html
<table>
  <tr>
    <th>ID</th><th>Name</th><th>Position</th><th>Online</th>
  </tr>
  <tbody>
    <tr class="blue" id="top">
      <td>1</td><td>Michael</td><td>Director</td><td class="online">4 min</td>
    </tr>
    <tr>
      <td>2</td><td>John</td><td>Manager</td><td class="online">1 hour</td>
    </tr>
    <tr>
      <td>3</td><td>Andrew</td><td>Janitor</td><td class="offline">Offline</td>
    </tr>
  </tbody>
</table>
```

Using the original four element array structure would look like this
(almost twice as much text):

```javascript
let table_dc = new domcon('div', {}, [
    ['table', {}, [
        ['tr', {}, [
            ['th', {}, 'ID'], ['th', {}, 'Name'], ['th', {}, 'Position'], ['th', {}, 'Online'],
        ] ],
        ['tbody', {}, [
            ['tr', {'class' 'blue', 'id': 'top'}, [
                ['td', {}, '1'], ['td', {}, 'Michael'], ['td', {}, 'Director'], ['td', {class:'online'}, '4 min']
            ], 'first' ],
            ['tr', {}, [
                ['td', {}, '2'], ['td', {}, 'John'], ['td', {}, 'Manager'], ['td', {class:'online'}, '1 hour']
            ] ],
            ['tr', {}, [
                ['td', {}, '3'], ['td', {}, 'Andrew'], ['td', {}, 'Janitor'], ['td', {class:'offline'}, 'Offline']
            ] ],
        ]],
    ]]
]);
```

If `domcon` is called on to make an assumption but doesn't know
the context, an error will be thrown with the message **do not
know what element to include for "STRING"**, where STRING is the
content you have provided. In this case, you can either specify
the name of the element by changing `"STRING"` into something
like `{'NAME': 'STRING'}`, or add the missing assumption to
the `default_child` function class (and submit a pull request
for the change of course).

Finally, an array may be given as a single parameter to the
constructor, and is taken to contain the four arguments (element
name, attributes, child elements specification and alternative
navigation name), as usual (though, also as usual, only the
first is mandatory).

#### append_to

Appends the represented DOM element to the DOM element passed.
For example:

```javascript
dc.append_to(other_element);
```

This is the same as `other_element.appendChild(dc.e)`.

#### append

Appends the DOM element passed to the represented DOM element.
For example:

```javascript
dc.append(other_element);
```

This is the same as `dc.e.appendChild(other_element)`.

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
