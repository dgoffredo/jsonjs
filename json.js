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

    // Wrap the provided function in parentheses and invoke it as a function.
    // The extra newline ("\n") is to prevent issues with a trailing line
    // comment in the input.
    code = `(\n${code}\n)()`;

    // Create an execution context with no global variables (except those
    // provided by the language), and execute the code in that context. Then
    // JSONify the result and print it to standard output.
    const value = vm.runInNewContext(code, undefined, {
        lineOffset: -1,
        filename: inputPath
    });
    const stringified = JSON.stringify(value);
    if (typeof stringified !== 'string') {
        throw Error(`JSON.stringify of the returned value has type ${typeof stringified} while a string was expected. The value is probably not JSON-compatible. value: ${value}`);
    }
    console.log(stringified);
});
