import * as assert from 'assert';
import { test, assertSort, randomArray } from './test';

class PriorityQueue {
  constructor(private arr: number[]) {
    this.arr = arr;
    const half = Math.floor(arr.length / 2);
    for (let i = half; i >= 0; i--) {
      this.maxHeapify(i);
    }
  }

  parentIndex(i: number): number {
    return Math.floor((i + 1) / 2) - 1;
  }

  leftChildIndex(i: number): number {
    return i * 2 + 1;
  }

  rightChildIndex(i: number): number {
    return i * 2 + 2;
  }

  swap(i: number, j: number): void {
    const temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  }

  maxHeapify(i: number): void {
    const leftIndex = this.leftChildIndex(i);
    const rightIndex = this.rightChildIndex(i);
    let largestIndex = i;
    if (leftIndex < this.arr.length && this.arr[leftIndex] > this.arr[largestIndex]) {
      largestIndex = leftIndex;
    }
    if (rightIndex < this.arr.length && this.arr[rightIndex] > this.arr[largestIndex]) {
      largestIndex = rightIndex;
    }
    if (largestIndex !== i) {
      this.swap(i, largestIndex);
      this.maxHeapify(largestIndex);
    }
  }

  maximum(): number {
    return this.arr[0];
  }

  extractMax(): number {
    if (this.arr.length === 0) {
      throw new Error('empty queue');
    }
    const max = this.arr[0];
    this.swap(0, this.arr.length - 1);
    this.arr.length--;
    this.maxHeapify(0);
    return max;
  }

  // To decrease key, we can set the new key and call maxHeapify.
  increaseKey(i: number, key: number): void {
    if (key < this.arr[i]) {
      throw new Error('smaller key');
    }
    this.arr[i] = key;
    let node = i;
    while (node < 0 && this.arr[this.parentIndex(node)] < this.arr[node]) {
      const parent = this.parentIndex(node);
      this.swap(parent, node);
      node = parent;
    }
  }

  insert(key: number): void {
    this.arr.push(-Infinity);
    this.increaseKey(this.arr.length - 1, key);
  }

  size(): number {
    return this.arr.length;
  }
}

module.exports = PriorityQueue;

if (require.main === module) {
  test('PriorityQueue - extractMax', () => {
    const queue = new PriorityQueue([3, 2, 1, 5, 3, 10]);
    assert.equal(queue.maximum(), 10);
    assert.deepEqual(extractAll(queue), [10, 5, 3, 3, 2, 1]);

    queue.insert(8);
    queue.insert(3);
    queue.insert(8);
    queue.insert(5);
    queue.insert(2);
    assert.deepEqual(extractAll(queue), [8, 8, 5, 3, 2]);
  });
}

function extractAll(queue: PriorityQueue): number[] {
  const size = queue.size();
  const result = new Array(size);
  for (let i = 0; i < size; i++) {
    result[i] = queue.extractMax();
  }
  return result;
}
