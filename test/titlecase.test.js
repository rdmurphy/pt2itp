'use strict';

const tape = require('tape');
const titlecase = require('../lib/label/titlecase').titleCase;
const minors = require('@mapbox/title-case')('en');

tape('title case xformation', (t) => {
    const tests = [
        ['Väike-Sõjamäe', 'Väike-Sõjamäe'],
        ['Väike-sõjamäe', 'Väike-Sõjamäe'],
        ['väike-sõjamäe', 'Väike-Sõjamäe'],
        ['väike sõjamäe', 'Väike Sõjamäe'],
        ['väike  sõjamäe', 'Väike Sõjamäe'],
        ['Väike Sõjamäe', 'Väike Sõjamäe'],
        ['VäikeSõjamäe', 'Väikesõjamäe'],
        ['abra CAda -bra', 'Abra Cada Bra'],
        ['our lady of whatever', 'Our Lady of Whatever'],
        ['our lady OF whatever', 'Our Lady of Whatever'],
        ['St Martin\'s Neck Road', 'St Martin\'s Neck Road'],
        ['MT. MOOSILAUKE HWY', 'Mt. Moosilauke Hwy'],
        ['some  miscellaneous rd (what happens to parentheses?)', 'Some Miscellaneous Rd (What Happens to Parentheses?)'],
        ['main st NE', 'Main St NE'],
        ['main St NW', 'Main St NW'],
        ['SW Main St.', 'SW Main St.'],
        ['Main S.E. St', 'Main SE St'],
        ['main st ne', 'Main St NE'],
        ['nE. Main St', 'Ne. Main St']
    ];

    for (const test of tests) {
        t.equal(titlecase(test[0], minors), test[1], `${test[0]} => ${test[1]}`);
    }

    t.end();
});

tape('label logic, default behavior', (t) => {
    const label = require('../lib/label/titlecase')();
    const tests = [
        // [[
        //     { freq: 12, display: 'our lady of whatever', tokenized: [{ token: 'our', token_type: null }, { token: 'lady', token_type: null }, { token: 'of', token_type: null }, { token: 'whatever', token_type: null }], source: 'address' },
        //     { freq: 2, display: 'our lady', tokenized: [{ token: 'our', token_type: null }, { token: 'lady', token_type: null }], source: 'network' }
        // ], 'Our Lady of Whatever,Our Lady'],
        // [[
        //     { display: 'our lady of whatever', tokenized: [{ token: 'our', token_type: null }, { token: 'lady', token_type: null }, { token: 'of', token_type: null }, { token: 'whatever', token_type: null }], source: 'address' },
        //     { display: 'OUR LADY of WHATEVER', tokenized: [{ token: 'our', token_type: null }, { token: 'lady', token_type: null }, { token: 'of', token_type: null }, { token: 'whatever', token_type: null }], source: 'network' }
        // ], 'Our Lady of Whatever'],
        // [[
        //     { display: 'Our Lady of whatever', tokenized: [{ token: 'our', token_type: null }, { token: 'lady', token_type: null }, { token: 'of', token_type: null }, { token: 'whatever', token_type: null }], source: 'address' },
        //     { display: 'OUR LÄDY OF WHATEVER', tokenized: [{ token: 'our', token_type: null }, { token: 'lady', token_type: null }, { token: 'of', token_type: null }, { token: 'whatever', token_type: null }], source: 'network' }
        // ], 'Our Lady of Whatever'],
        // [[
        //     { display: 'York Branch Road', tokenized: [{ token: 'york', token_type: null }, { token: 'br', token_type: null }, { token: 'rd', token_type: null }], source: 'address' },
        //     { display: 'York Road', tokenized: [{ token: 'york', token_type: null }, { token: 'rd', token_type: null }], source: 'address' },
        //     { display: 'York Road', tokenized: [{ token: 'york', token_type: null }, { token: 'rd', token_type: null }], source: 'network' }
        // ], 'York Road,York Branch Road'],
        // [[
        //     { freq: 603, source: 'address', display: 'GRAND AVE', priority: 0, tokenized: [{ token: 'grand', token_type: null }, { token: 'av', token_type: null }] },
        //     { freq: 17, source: 'address', display: 'GRAND VALLEY DR', priority: 0, tokenized: [{ token: 'grand', token_type: null }, { token: 'vly', token_type: null }, { token: 'dr', token_type: null }] },
        //     { freq: 3, source: 'address', display: 'Grand Ave', priority: 0, tokenized: [{ token: 'grand', token_type: null }, { token: 'av', token_type: null }] },
        //     { freq: 1, source: 'network', display: 'Grand Avenue', priority: 0, tokenized: [{ token: 'grand', token_type: null }, { token: 'av', token_type: null }] }
        // ], 'Grand Avenue,Grand Valley Dr'],
        [[
            { display: 'NE M L King Blvd', priority: 0, source: 'address', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1480 },
            { display: 'NE MARTIN LUTHER KING JR BLVD', priority: 0, source: 'address', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 110 },
            { display: 'NE M L KING BLVD', priority: 0, source: 'address', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 18 },
            { display: 'SE M L King Blvd', priority: 0, source: 'address', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 7 },
            { display: 'N M L King Blvd', priority: 0, source: 'address', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 3 },
            { display: 'SE MARTIN LUTHER KING JR BLVD', priority: 0, source: 'address', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 2 },
            { display: 'NE MLK', priority: 0, source: 'network', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }], freq: 1 },
            { display: 'Northeast Martin Luther King Junior Boulevard', priority: 0, source: 'network', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'OR 99E', priority: 0, source: 'network', tokenized: [{ token: 'or', token_type: null }, { token: '99e', token_type: null }], freq: 1 },
            { display: 'State Highway 99E', priority: 0, source: 'network', tokenized: [{ token: 'state', token_type: null }, { token: 'hwy', token_type: 'Way' }, { token: '99e', token_type: null }], freq: 1 },
            { display: 'NE MLK Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE M L K Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE Martin Luther King Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE MLK Jr Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE M L K Jr Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE Martin Luther King Jr Blvd', priority: 1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE MLK BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE M L K BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE Martin Luther King BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE MLK Jr BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE M L K Jr BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE Martin Luther King Jr BLVD', priority: 1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE MLK BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE M L K BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE Martin Luther King BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE MLK Jr BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE M L K Jr BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE Martin Luther King Jr BLVD', priority: 1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'SE MLK Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'SE M L K Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'SE Martin Luther King Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'SE MLK Jr Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'SE M L K Jr Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'SE Martin Luther King Jr Blvd', priority: 1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'N MLK Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'N M L K Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'N Martin Luther King Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'N MLK Jr Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'N M L K Jr Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'N Martin Luther King Jr Blvd', priority: 1, source: 'generated', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'SE MLK BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'SE M L K BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'SE Martin Luther King BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'SE MLK Jr BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'SE M L K Jr BLVD', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'SE Martin Luther King Jr BLVD', priority: 1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'NE MLK', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }], freq: 1 },
            { display: 'NE M L K', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }], freq: 1 },
            { display: 'NE Martin Luther King', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }], freq: 1 },
            { display: 'NE MLK Jr', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'jr', token_type: null }], freq: 1 },
            { display: 'NE M L K Jr', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'jr', token_type: null }], freq: 1 },
            { display: 'NE Martin Luther King Jr', priority: 1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }], freq: 1 },
            { display: 'Northeast MLK Boulevard', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'Northeast M L K Boulevard', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'Northeast Martin Luther King Boulevard', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'Northeast MLK Jr Boulevard', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'Northeast M L K Jr Boulevard', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 },
            { display: 'Northeast Martin Luther King Jr Boulevard', priority: 1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1 }
        ], [
            { display: 'Northeast Martin Luther King Jr Boulevard', priority: 1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 41 },
            { display: 'SE Martin Luther King Jr Blvd', priority: 1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 29 },
            { display: 'N Martin Luther King Jr Blvd', priority: 1, source: 'generated', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 28 },
            { display: 'NE Martin Luther King Jr', priority: 1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }], freq: 1, display_length: 24 },
            { display: 'NE M L King Blvd', priority: 0, source: 'address', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1480, display_length: 16 },
            { display: 'Northeast Martin Luther King Junior Boulevard', priority: 0, source: 'network', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 110, display_length: 45 },
            { display: 'SE M L King Blvd', priority: 0, source: 'address', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 7, display_length: 16 },
            { display: 'N M L King Blvd', priority: 0, source: 'address', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 3, display_length: 15 },
            { display: 'SE Martin Luther King Jr Blvd', priority: 0, source: 'address', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 2, display_length: 29 },
            { display: 'State Highway 99e', priority: 0, source: 'network', tokenized: [{ token: 'state', token_type: null }, { token: 'hwy', token_type: 'Way' }, { token: '99e', token_type: null }], freq: 1, display_length: 17 },
            { display: 'NE Mlk', priority: 0, source: 'network', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }], freq: 1, display_length: 6 },
            { display: 'or 99e', priority: 0, source: 'network', tokenized: [{ token: 'or', token_type: null }, { token: '99e', token_type: null }], freq: 1, display_length: 6 },
            { display: 'Northeast Martin Luther King Boulevard', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 38 },
            { display: 'Northeast M L K Jr Boulevard', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 28 },
            { display: 'Northeast Mlk Jr Boulevard', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 26 },
            { display: 'SE Martin Luther King Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 26 },
            { display: 'N Martin Luther King Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 25 },
            { display: 'Northeast M L K Boulevard', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 25 },
            { display: 'Northeast Mlk Boulevard', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 23 },
            { display: 'NE Martin Luther King', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'martin', token_type: null }, { token: 'luther', token_type: null }, { token: 'king', token_type: null }], freq: 1, display_length: 21 },
            { display: 'SE M L K Jr Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 16 },
            { display: 'N M L K Jr Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 15 },
            { display: 'SE Mlk Jr Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 14 },
            { display: 'N Mlk Jr Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'jr', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 13 },
            { display: 'SE M L K Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 13 },
            { display: 'N M L K Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 12 },
            { display: 'NE M L K Jr', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }, { token: 'jr', token_type: null }], freq: 1, display_length: 11 },
            { display: 'SE Mlk Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'se', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 11 },
            { display: 'N Mlk Blvd', priority: -1, source: 'generated', tokenized: [{ token: 'n', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'blvd', token_type: 'Way' }], freq: 1, display_length: 10 },
            { display: 'NE Mlk Jr', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'mlk', token_type: null }, { token: 'jr', token_type: null }], freq: 1, display_length: 9 },
            { display: 'NE M L K', priority: -1, source: 'generated', tokenized: [{ token: 'ne', token_type: 'Cardinal' }, { token: 'm', token_type: null }, { token: 'l', token_type: null }, { token: 'k', token_type: null }], freq: 1, display_length: 8 }
        ]]
        // [[
        //     { display: 'State Highway 123', tokenized: [{ token: 'state', token_type: null }, { token: 'hwy', token_type: null }, { token: '123', token_type: null }], source: 'address', priority: 1 },
        //     { display: 'State Highway 123 ABC', tokenized: [{ token: 'state', token_type: null }, { token: 'hwy', token_type: null }, { token: '123', token_type: null }], source: 'address' }, // Should be deduped on tokenized
        //     { display: 'NC 123', tokenized: [{ token: 'nc', token_type: null }, { token: '123', token_type: null }], source: 'network', priority: 5 }
        // ], 'Nc 123,State Highway 123']
    ];


    for (const test of tests) {
        t.deepEqual(label(test[0], true), test[1], `${test[0][0].display}/${test[0][1].display} => ${test[1]}`);
    }

    t.end();
});
