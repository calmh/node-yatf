yatf
====

Yet Another Table Formatter, obviously. The point of this one is to handle
column layout and fit into the current window size. It leaves the formatting
completely up to you, except for the `underlineHeaders` option which you can't
do anyway until you know how wide the columns become.

If the window isn't wide enough to display all columns, they'll be truncated and markers indicating this will be shown.

Example
-------

    var table = require('yatf');
    
    var headers = [ 'NAME', 'PROPERTY', 'VALUE', 'SOURCE' ];
    
    var data = [
    [ 'zones'.bold, 'compressratio', '1.06x', '-' ],
    [ 'zones/01b2c898-945f-11e1-a523-af1afbe22822'.blue.bold, 'compressratio', '1.93x'.magenta, '-' ],
    // ...
    [ 'zones/b2535e73-0892-4183-9e02-0255c6dde661/data'.magenta.bold, 'compressratio', '1.34x'.magenta, '-' ],
    ];
    
    table(headers, data, { underlineHeaders: true });

![](https://github.com/calmh/node-yatf/raw/master/screenshot.png)

License
-------

MIT

