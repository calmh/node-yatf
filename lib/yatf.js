// Strictness is nice.

"use strict";

// We need the colors module to be able to strip ANSI sequences from length
// calculations, and also to make red overflow markers.

var colors = require('colors');

// If stdout is not a TTY, we'll strip colors when printing.

var isatty = process.stdout.isTTY;

// Figure out useful maximum column lengths, and create space padding we can
// use later.

var windowLen = 80;
if (isatty) {
    windowLen = process.stdout.getWindowSize()[0];
}

var maxColumnWidth = Math.floor(windowLen * 0.9);
var space = '';
for (var i = 0; i < maxColumnWidth; i++) {
    space += ' ';
}

function out(str) {

    // Print the string, removing ANSI escape sequences if stdout is not a terminal.

    console.log(isatty ? str : str.stripColors);
}

module.exports = function (columns, data, opts) {
    var maxLen = [];
    var numCol = columns.length;
    var numRow = data.length;
    var totLen = 0;
    var row, r, c, val;
    var droppedColumn = false;

    if (!opts) {
        opts = {};
    }

    // Calculate the maximum width of each column.

    for (c = 0; c < numCol; c++) {
        maxLen.push(columns[c].stripColors.length);

        for (r = 0; r < numRow; r++) {
            val = data[r][c];
            if (typeof val !== 'string') {
                val = '' + val;
            }
            maxLen[c] = Math.min(maxColumnWidth, Math.max(maxLen[c], val.stripColors.length));
        }
    }

    // Go through all columns and check that they fit in the current window.

    for (c = 0; c < numCol; c++) {

        // Increase the total length by the length of this column. If it's not the last one,
        // also allow for the two spacers that will be added.

        totLen += maxLen[c];
        if (c < numCol - 1) {
            totLen += 2;
        }

        // If we have exceeded the window length, decrease the number of
        // columns so this is the last one.  Also set the width of this columns
        // to fit in the remaining space.

        if (totLen > windowLen) {
            numCol = c + 1;
            maxLen[c] -= (totLen - windowLen)
        }

        // If the resulting maximum length was less than three characters, drop
        // the column entirely and set a flag indicating that. Normally we dont
        // need to indicate a dropped column since one or more of the truncated
        // values would have been marked.

        if (totLen > windowLen && maxLen[c] < 3) {
            numCol--;
            droppedColumn = true;
        }
    }

    // Print the header row.

    row = '';
    for (c = 0; c < numCol; c++) {
        val = columns[c];

        // If the length of the header exceeds the column width, truncate it
        // and add a bold red chevron.  Otherwise pad it with spaces to the
        // column width.

        if (val.stripColors.length > maxLen[c]) {
            val = val.slice(0, maxLen[c] - 1);

            // Underline the entire header if the user asked for it.

            if (opts.underlineHeaders) {
                val = val.underline;
            }

            row += val;
            row += '>'.red.bold;
        } else {
            val += space.slice(0, maxLen[c] - columns[c].stripColors.length);

            // Underline the entire header if the user asked for it.

            if (opts.underlineHeaders) {
                val = val.underline;
            }

            row += val;

            // If this is not the last column, add a spacer.

            if (c < numCol - 1) {
                row += '  ';
            }
        }
    }

    // If we dropped columns above without changing the column widths, add a
    // chevron here before printing the header row to indicate that.

    if (droppedColumn) {
        row += '>'.red.bold.inverse;
    }

    out(row);

    // Print all data rows.

    for (r = 0; r < numRow; r++) {
        row = '';

        for (c = 0; c < numCol; c++) {
            val = data[r][c];

            // If the value is a number, convert it to a string and
            // right-adjust it to the column width.

            if (typeof val === 'number') {
                val = '' + val;
                if (val.length < maxLen[c]) {
                    val = space.slice(0, maxLen[c] - val.length) + val;
                }
            }

            // If the data length exceeds the column width, truncate in the
            // same way as the headers above. Otherwise pad if necessary.

            if (val.stripColors.length > maxLen[c]) {
                val = val.stripColors.slice(0, maxLen[c] - 1) + '>'.red;
            } else if (val.stripColors.length < maxLen[c]) {
                val = val + space.slice(0, maxLen[c] - val.stripColors.length);
            }

            row += val;

            // If this is not the last column, add a spacer.

            if (c < numCol - 1) {
                row += '  ';
            }

        }

        out(row);
    }
};
