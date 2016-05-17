#!/usr/bin/env node

var help = require('./lib/help');
var map = require('./lib/map');
var convert = require('./lib/convert');
var settings = require('./package.json');

var argv = require('minimist')(process.argv, {
    string: ["input", "output", "in-network", "in-address", "tokens", "map"],
    integer: ["workers"],
    boolean: ["help", "debug"],
    alias: {
        "version": "v",
        "output":  "o",
        "input":   "i"
    }
});

if (argv.help) {
    help(argv);
    process.exit(0);
} else if (argv.version) {
    console.log(settings.name + '@' + settings.version);
    process.exit(0);
}

if (!argv.debug && process.env.DEBUG) argv.debug = true;
if (!argv.workers && process.env.WORKERS) argv.workers = parseInt(process.env.WORKERS);

switch (argv._[2]) {
    case ("help"):
        help(argv);
        break;
    case ("map"):
        map(argv);
        break;
    case ("convert"):
        convert(argv);
        break;
    default:
        help(argv);
        break;
}
