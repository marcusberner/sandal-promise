#sandal-promise

[![Build Status](https://travis-ci.org/marcusberner/sandal-promise.png?branch=master)](https://travis-ci.org/marcusberner/sandal-promise)


Sandal-promise extends the [sandal](https://github.com/marcusberner/sandal) dependency injection framework. It enables resolving using [q](https://github.com/kriskowal/q) promises..

## Installation

### Npm

    $ npm install sandal-promise

### Bower

    $ npm install sandal-promise

## Usage

Sandal-promise will extend the container with a `.promise(names)` function. The promise function will take one or multiple strings as parameters and return a q promise. After resolving all components, the promise will be resolved with an array of components in the specified order. If only one name is provided the result will not be an array but the single resolved component.

For use in browsers the sandal and q libraries must be included before the promise extension.

#### Example (browser)
```html
<script src="sandal.js"></script>
<script src="q.js"></script>
<script src="sandal-promise.js"></script>

<script>
    var sandal = new Sandal(); // will be auto extended in browsers
    var myObject = {};
    var otherObject = {};
    sandal
        .object('myObject', myObject)
        .object('otherObject', otherObject)
        .promise('myObject', 'otherObject')
        .then(function(result) {
            // will be [myObject, otherObject]    
        }, function (err) {
            // called with error if resolving fails
        });
</script>
```

#### Example (Node.js)
```js
var Sandal = require('sandal').extend(require('sandal-promise'));
var sandal = new Sandal();

// or

var Sandal = require('sandal');
var sandal = new Sandal();
sandal.extend(require('sandal-promise'));

// then

sandal.object('myObject', myObject).object('otherObject', otherObject);
sandal
    .promise('myObject', 'otherObject')
    .then(function(result) {
        // will be [myObject, otherObject]    
    }, function (err) {
        // called with error if resolving fails
    });
```
