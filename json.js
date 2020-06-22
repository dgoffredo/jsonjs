#!/usr/bin/env node

const fs = require('fs'),
      vm = require('vm'),
      inputPath   = process.argv[2] || '/dev/stdin';

function printUsage() {
    console.log(
`usage: ${process.argv[1]} [.json.js file]
    
Reads a Javascript object from the optionally specified file or from standard
input if no file is specified, and prints the resulting JSON to standard
output.`);
}

if (['--help', '-h'].indexOf(inputPath) !== -1) {
    printUsage();
    return;
}

fs.readFile(inputPath, 'utf8', (error, code) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }

    // Empty yields empty.
    if (code.trim() === '') {
        return;
    }

    // In order for an object literal to be parsed as an object and not as a
    // code block, it has to be enclosed in parentheses.
    code = `(${code})`;

    // Create an execution context with no global variables, and execute the
    // code in that context. Then JSONify the result and print it to standard
    // output.
    console.log(JSON.stringify(vm.runInNewContext(code)));
});
