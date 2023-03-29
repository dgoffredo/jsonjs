#!/usr/bin/env node

const fs = require('fs'),
      vm = require('vm'),
      inputPath   = process.argv[2] || '/dev/stdin';

function printUsage() {
    console.log(
`usage: ${process.argv[1]} [.json.js file]

Reads a Javascript function from the optionally specified
file or from standard input if no file is specified, and
prints the returned object as JSON to standard output.`);
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

    // Wrap the provided function in parentheses and execute it.
    // The extra newline ("\n") and block comment ("/**/") are to prevent
    // issues with trailing comments in the input.
    code = `(${code}\n/**/)()`;

    // Create an execution context with no global variables (except those
    // provided by the language), and execute the code in that context. Then
    // JSONify the result and print it to standard output.
    const value = vm.runInNewContext(code);
    const stringified = JSON.stringify(value);
    if (typeof stringified !== 'string') {
        throw Error(`JSON.stringify of the returned value has type ${typeof stringified} while a string was expected. The value is probably not JSON-compatible. value: ${value}`);
    }
    console.log(stringified);
});
