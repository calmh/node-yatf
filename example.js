var table = require('yatf');

var headers = [ 'NAME', 'PROPERTY', 'VALUE', 'SOURCE' ];

var data = [
    [ 'zones'.bold, 'compressratio', '1.06x', '-' ],
    [ 'zones/01b2c898-945f-11e1-a523-af1afbe22822'.blue.bold, 'compressratio', '1.93x'.magenta, '-' ],
    [ 'zones/12800380-29d6-403d-a3bf-e7f91360b57f'.blue.bold, 'compressratio', '1.15x', '-' ],
    [ 'zones/12800380-29d6-403d-a3bf-e7f91360b57f-disk0'.green.bold, 'compressratio', '1.70x'.magenta, '-' ],
    [ 'zones/12800380-29d6-403d-a3bf-e7f91360b57f/cores'.yellow.bold, 'compressratio', '1.00x'.red, '-' ],
    [ 'zones/7dc0f886-5faa-4534-a68e-8277e167464e'.blue.bold, 'compressratio', '1.07x', '-' ],
    [ 'zones/7dc0f886-5faa-4534-a68e-8277e167464e-disk0'.green.bold, 'compressratio', '3.08x'.green, '-' ],
    [ 'zones/7dc0f886-5faa-4534-a68e-8277e167464e/cores'.yellow.bold, 'compressratio', '1.00x'.red, '-' ],
    [ 'zones/b2535e73-0892-4183-9e02-0255c6dde661'.blue.bold, 'compressratio', '1.34x', '-' ],
    [ 'zones/b2535e73-0892-4183-9e02-0255c6dde661/cores'.yellow.bold, 'compressratio', '1.00x'.red, '-' ],
    [ 'zones/b2535e73-0892-4183-9e02-0255c6dde661/data'.magenta.bold, 'compressratio', '1.34x'.magenta, '-' ],
];

table(headers, data, { underlineHeaders: true });

