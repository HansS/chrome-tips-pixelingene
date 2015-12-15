var React = require('react');

(()=>console.log('logging via es6'))();

function *sayHello() {
    yield 'hello';
    yield 'world';
}

for (let x of sayHello()) {
    console.log(x);
}

fetch('/api')
    .then(response=>response.json())
    .then(json=>console.log(json));
