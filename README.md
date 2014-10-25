zen-id
======

**Generate random strings by pattern, including checksums and validation.**

Some notes about this code:
  * Conceptually based on [gen-id](/domudall/gen-id) package by [domudall](@domudall) 
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
var my_id = zen_id.generate();
var is_valid = zen_id.validate(my_id);
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

Any other character is repeated verbatim in the output.

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
