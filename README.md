zen-id
======

**Generate random strings by pattern, including checksums and validation.**

Some notes about this code:
  * Conceptually based on [gen-id](/domudall/gen-id) package by [domudall](http://github.com/domudall/) 
  * No guarantees of complete uniqueness, but longer patterns should be ok
  * Written for nodejs, but could be adapted to other Javascript environments
  * This is my first published npm package, be nice

### Installation

Use npm:

    npm install zen-id

### Basic Usage

The goal for this code is to be as flexible as possible. There are a number
of different ways it can be used. I hope to expand on the "usage" section
over time, but for now I suggest reading the (short) code to learn more.

```javascript
var format = 'AAAaaacchhhcc';
var zen_id = require('zen-id').create(format);

var my_id = zen_id.generate();                  // => 'HYKzbk7473e99'
var is_valid = zen_id.validate(my_id);          // => true
```

### Formats

| Character | Range | Description |
| --------- | ----- | ----------- |
| n | 0-9 | numeric |
| h | 0-9a-f | hex |
| a | a-z | lowercase a-z |
| A | A-Z | uppercase A-Z |
| x | 0-9a-z | numeric or lowercase a-z |
| X | 0-9A-Za-z | numeric or a-z any case |
| z | A-Za-z | a-z any case |
| c | - | checksum character |

Any non-format character is repeated verbatim in the output.

### Validation

The `validate(id)` method can be used to check if a value
*matches the format pattern*. Can be useful comparing any pattern,
but possibly most useful with checksums. See following section.

### Checksums

Checksums are character values applied to certain output positions based on
the random (pattern) input up to that point. Checksums are also valuable to
detect input errors.

Checksums are not infallible, nor is this packages's caluation method so
fixed that you could assume previously generated IDs would validate against
the same format in the future. At least in the early stages, the calculation
method is subject to change.

Checksums are best used to detect a situation where an apparently invalid
code was entered based on the format, not as an ultimate test of whether the
code was ever issued, or not.

### Credits and Notes

**zen-id** is based on the npm package [gen-id](/domudall/gen-id) by @domudall
which mostly worked great for me, but I wanted to make a few tweaks (mostly to
add validation). When I delved into the code it didn't work for me stylistically
so I decided to publish my own rendition of this functionality, rather than
add in code I wrote and try to get a pull request accepted with possibly clashing
coding styles. The name was chosen as a take on *gen-id* but also because it was
what I consider one of my "zen" coding projects (something I do to either wind-up
or wind-down mentally).

### License

Free software under MIT License.
