import * as assert from 'assert';
import { test, assertSort } from './test';

class LinkedList<T> {
  constructor(
    public value: T,
    public prev: LinkedList<T> | null,
    public next: LinkedList<T> | null,
  ) {}

  add(value: T): void {
    let node: LinkedList<T> = this;
    while (node.next) {
      node = node.next;
    }
    node.next = new LinkedList(value, node, null);
  }

  insert(value: T): void {
    const temp = this.value;
    this.value = value;
    this.next = new LinkedList(temp, this, this.next);
  }

  copy(arr: T[], start: number): number {
    let node: LinkedList<T> | null = this;
    let i = start;
    while (node) {
      arr[i] = node.value;
      node = node.next;
      i++;
    }
    return i;
  }

  toArray(): T[] {
    let node: LinkedList<T> = this;
    let result = [node.value];
    while (node.next) {
      node = node.next;
      result.push(node.value);
    }
    return result;
  }
}

class SortedLinkedList extends LinkedList<number> {
  add(value: number): void {
    let node: SortedLinkedList = this;
    while (node.value < value && node.next) {
      node = node.next;
    }
    if (node.value >= value) {
      node.insert(value);
    } else {
      node.next = new SortedLinkedList(value, node, null);
    }
  }
}

function bucketSort(arr: number[]): number[] {
  const n = arr.length;
  const buckets = new Array(n);
  for (let i = 0; i < n; i++) {
    const value = arr[i];
    const index = Math.floor(value * n);
    if (buckets[index]) {
      buckets[index].add(value);
    } else {
      // TODO: Should I use insertion sort?
      buckets[index] = new SortedLinkedList(value, null, null);
    }
  }
  // Copy values in linked lists to an array
  let index = 0;
  for (let i = 0; i < n; i++) {
    if (buckets[i]) {
      index = buckets[i].copy(arr, index);
    }
  }
  return arr;
}

if (require.main === module) {
  test('bucketSort', () => {
    assertSort(bucketSort, []);
    assertSort(bucketSort, [0.8, 0.1, 0.6]);
    assertSort(bucketSort, [0.8, 0.15, 0.12]);

    assertSort(bucketSort, randomArray(100));
  });

  test('SortedLinkedList', () => {
    const list = new SortedLinkedList(3, null, null);
    list.add(5);
    list.add(1);
    list.add(5);
    list.add(8);
    list.add(3);
    list.add(2);
    assert.deepEqual(list.toArray(), [1, 2, 3, 3, 5, 5, 8]);

    const array = new Array(10).fill(null);
    const next = list.copy(array, 1);
    assert.equal(next, 8);
    assert.deepEqual(array, [null, 1, 2, 3, 3, 5, 5, 8, null, null]);
  });
}

function randomArray(size: number): number[] {
  const result = new Array(size);
  for (let i = 0; i < size; i++) {
    result[i] = Math.random();
  }
  return result;
}
