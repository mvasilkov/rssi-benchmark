var Benchmark = require('benchmark'),
    suite = new Benchmark.Suite,
    fs = require('fs'),
    enc = {encoding: 'utf8'},
    template = {
        rssi: fs.readFileSync(__dirname + '/template.rssi.html', enc),
        lodash: fs.readFileSync(__dirname + '/template.lodash.html', enc),
        dot: fs.readFileSync(__dirname + '/template.dot.html', enc)
    },
    result = fs.readFileSync(__dirname + '/result.html', enc),
    fmt = require('rssi'),
    _ = require('underscore'),
    dot = require('dot')

// sanity test
var args = {hola: 'Hola', better: 'Better', inet: 'Internet'},
    rt = fmt(template.rssi),
    compiled = _.template(template.lodash),
    temp = dot.template(template.dot)

console.assert(rt(args) === result)
console.assert(compiled(args) === result)
// console.assert(temp(args) === result)

// benchmark
suite
    .add('rssi', function () { var result = rt(args) })
    .add('underscore', function () { var result = compiled(args) })
    .add('dot', function () { var result = temp(args) })
    .add('rssi2', function () { var result = rt(args) })
    .on('cycle', function (event) { console.log(String(event.target)) })
    .on('complete', function () {
        console.log('winrar: ' + this.filter('fastest').pluck('name')) })
    .run({'async': true})
