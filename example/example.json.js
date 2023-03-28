// The parentheses around the curly braces are necessary for the value to
// be parsed as an object and not as a code block.
// Alternatively, you can use a code block with a return statement.
() => ({
    key: "value",
    "foo_bar": [1, 1 + 1, `${"three"}`],
    ['foo' + 'bar']: 'baz',
    all_of_js: (()  => JSON.stringify('hi'))()
})
