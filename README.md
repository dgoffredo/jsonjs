json.js
====
`JSON.stringify(eval(...))`

Why
---
Unquoted object keys and inline arithmetic can be handy. So can
`Array.prototype.map` and friends.

What
----
`json.js` is a `node` script that reads a file or standard input, evaluates
its contents as Javascript in an empty environment (except for that guaranteed
by the language, e.g. `JSON` and `Object`), and prints to standard output the
resulting value as JSON.

How
---
```console
$ ./json.js <<'END_JS'
{
    foo: 'bar',
    ['hello' + 'there']: [1, 2, 3].map(n => `number${n}`)
}
END_JS
{"foo":"bar","hellothere":["number1","number2","number3"]}
```
