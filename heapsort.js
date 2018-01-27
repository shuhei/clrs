const assert = require('assert');
const { test, assertSort, randomArray } = require('./test');

function leftChildIndex(i) {
  return i * 2 + 1;
}

function rightChildIndex(i) {
  return i * 2 + 2;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function maxHeapify(arr, heapLength, i) {
  const leftIndex = leftChildIndex(i);
  const rightIndex = rightChildIndex(i);
  let largestIndex = i;
  if (leftIndex < heapLength && arr[leftIndex] > arr[largestIndex]) {
    largestIndex = leftIndex;
  }
  if (rightIndex < heapLength && arr[rightIndex] > arr[largestIndex]) {
    largestIndex = rightIndex;
  }
  if (largestIndex !== i) {
    swap(arr, i, largestIndex);
    maxHeapify(arr, heapLength, largestIndex);
  }
  return arr;
}

function buildMaxHeap(arr) {
  const half = Math.floor(arr.length / 2);
  for (let i = half; i >= 0; i--) {
    maxHeapify(arr, arr.length, i);
  }
  return arr;
}

function heapSort(arr) {
  buildMaxHeap(arr);
  let heapLength = arr.length;
  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    heapLength--;
    maxHeapify(arr, heapLength, 0);
  }
  return arr;
}

module.exports = heapSort;

if (require.main === module) {
  test('leftChildIndex', () => {
    assert.equal(leftChildIndex(0), 1);
    assert.equal(leftChildIndex(1), 3);
    assert.equal(leftChildIndex(2), 5);
  });

  test('rightChildIndex', () => {
    assert.equal(rightChildIndex(0), 2);
    assert.equal(rightChildIndex(1), 4);
    assert.equal(rightChildIndex(2), 6);
  });

  test('maxHeapify', () => {
    assert.deepEqual(maxHeapify([1, 0, 2], 2, 0), [1, 0, 2]);
    assert.deepEqual(maxHeapify([0, 1, 2], 2, 0), [1, 0, 2]);
    assert.deepEqual(maxHeapify([0, 1, 2], 3, 0), [2, 1, 0]);
    assert.deepEqual(maxHeapify([2, 1, 0], 3, 0), [2, 1, 0]);
    assert.deepEqual(maxHeapify([0, 4, 6, 1, 3, 2, 5], 7, 0), [6, 4, 5, 1, 3, 2, 0]);
  });

  test('buildMaxHeap', () => {
    assert.deepEqual(buildMaxHeap([0, 1, 2]), [2, 1, 0]);
    assert.deepEqual(buildMaxHeap([3, 4, 0, 1, 2]), [4, 3, 0, 1, 2]);
  });

  test('heapSort', () => {
    assertSort(heapSort, []);
    assertSort(heapSort, [0, 1]);
    assertSort(heapSort, [1, 0]);
    assertSort(heapSort, [0, 1, 2]);
    assertSort(heapSort, [3, 4, 0, 2, 1, 5]);
    assertSort(heapSort, [3, 3, 2, 1, 0, 2, 3]);
    for (let i = 0; i < 100; i++) {
      assertSort(Heap.sort, randomArray(20));
    }
  });
}
