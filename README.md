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
    
    var headers = [ 'FOO', 'BAR', 'SOMETHING LONGER'];
    
    var data = [
        [ 'foo1'.bold.blue, 'bar1', 'A comment of some length' ],
        [ 'foo2'.bold.blue, 'test', 'Another comment'.magenta ],
        [ 'foo3'.bold.blue, 'a longer bold value'.bold, 'The last row in this table' ],
    ];
    
    table(headers, data, { underlineHeaders: true });

License
-------

2-Clause BSD

