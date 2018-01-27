const assert = require('assert');
const { test, assertSort, randomArray } = require('./test');

class Heap {
  static sort(arr) {
    return new Heap(arr).sort();
  }

  constructor(arr) {
    this.arr = arr;
    this.size = arr.length;

    const half = Math.floor(arr.length / 2);
    for (let i = half; i >= 0; i--) {
      this.maxHeapify(i);
    }
  }

  leftChildIndex(i) {
    return i * 2 + 1;
  }

  rightChildIndex(i) {
    return i * 2 + 2;
  }

  swap(i, j) {
    const temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  }

  maxHeapify(i) {
    const leftIndex = this.leftChildIndex(i);
    const rightIndex = this.rightChildIndex(i);
    let largestIndex = i;
    if (leftIndex < this.size && this.arr[leftIndex] > this.arr[largestIndex]) {
      largestIndex = leftIndex;
    }
    if (rightIndex < this.size && this.arr[rightIndex] > this.arr[largestIndex]) {
      largestIndex = rightIndex;
    }
    if (largestIndex !== i) {
      this.swap(i, largestIndex);
      this.maxHeapify(largestIndex);
    }
    return this.arr;
  }

  sort() {
    for (let i = this.arr.length - 1; i > 0; i--) {
      this.swap(0, i);
      this.size--;
      this.maxHeapify(0);
    }
    return this.arr;
  }
}

module.exports = Heap;

if (require.main === module) {
  test('heapSort', () => {
    assertSort(Heap.sort, []);
    assertSort(Heap.sort, [0, 1]);
    assertSort(Heap.sort, [1, 0]);
    assertSort(Heap.sort, [0, 1, 2]);
    assertSort(Heap.sort, [3, 4, 0, 2, 1, 5]);
    assertSort(Heap.sort, [3, 3, 2, 1, 0, 2, 3]);
    for (let i = 0; i < 100; i++) {
      assertSort(Heap.sort, randomArray(20));
    }
  });
}
