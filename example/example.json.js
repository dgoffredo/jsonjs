// The outer parentheses are optional (they'll be added before evaluation). I
// include them here so that vscode doesn't complain.
({
    key: "value",
    "foo_bar": [1, 1 + 1, `${"three"}`],
    ['foo' + 'bar']: 'baz',
    all_of_js: (()  => JSON.stringify('hi'))()
})
