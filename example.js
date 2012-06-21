var table = require('yatf');

var headers = [ 'FOO', 'BAR', 'SOMETHING LONGER'];

var data = [
    [ 'foo1'.bold.blue, 'bar1', 'A comment of some length' ],
    [ 'foo2'.bold.blue, 'test', 'Another comment'.magenta ],
    [ 'foo3'.bold.blue, 'a longer bold value'.bold, 'The last row in this table' ],
];

table(headers, data, { underlineHeaders: true });

