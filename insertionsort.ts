import { test, assertSort, randomArray } from './test';

function insertionSort(arr: number[]): number[] {
  for (let j = 1; j < arr.length; j++) {
    const key = arr[j];
    let i = j - 1;
    // [0,i] is already sorted. Insert key into the range.
    while (i >= 0 && arr[i] > key) {
      // Shift to right if the item is bigger than key.
      arr[i + 1] = arr[i];
      i--;
    }
    // Finally insert the key.
    // We could swap in the loop instead, but it requires more instructions.
    // Notice that we need to use `arr[i] > key` instead of `arr[i] > arr[i + 1]`
    // because arr[i + 1] does not have key yet.
    arr[i + 1] = key;
  }
  return arr;
}

if (require.main === module) {
  test('insertionSort', () => {
    assertSort(insertionSort, []);
    assertSort(insertionSort, [1]);
    assertSort(insertionSort, [3, 1, 2]);
    assertSort(insertionSort, [1, 3, 0, 3]);

    assertSort(insertionSort, randomArray(10, 100));

    for (let i = 0; i < 100; i++) {
      assertSort(insertionSort, randomArray(100, 20));
    }
  });
}
