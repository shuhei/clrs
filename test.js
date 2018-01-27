const assert = require('assert');

function test(name, fn) {
  try {
    fn();
    console.log(`OK ${name}`);
  } catch (e) {
    console.error(`NG ${name}`);
    console.error(e.stack);
    console.error('expected: %j', e.expected);
    console.error('  actual: %j', e.actual);
  }
}

function assertSort(sortFn, arr) {
  const original = arr.slice();
  const expected = arr.slice().sort((a, b) => a - b);
  const actual = sortFn(arr);
  assert.deepEqual(actual, expected, original);
}

function randomArray(size) {
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = Math.floor(Math.random() * size);
  }
  return arr;
}

module.exports = {
  test,
  assertSort,
  randomArray,
};
