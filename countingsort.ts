import { test, assertSort, randomArray } from './test';

export default function countingSort(max: number, arr: number[]): number[] {
  const counts = new Array(max + 1);
  const result = new Array(arr.length);
  // Fill counts with zeros.
  for (let i = 0; i < counts.length; i++) {
    counts[i] = 0;
  }
  // Count keys.
  for (let i = 0; i < arr.length; i++) {
    counts[arr[i]]++;
  }
  // Keep count of keys that are less than or equal to the key in each cell.
  for (let i = 1; i < counts.length; i++) {
    counts[i] = counts[i] + counts[i - 1];
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    // Don't forget to `-1`. If counts[0] === 1, result[0] should be updated
    // instead of result[1].
    result[counts[arr[i]] - 1] = arr[i];
    // Not to put same keys in the same place.
    counts[arr[i]]--;
  }
  return result;
}

if (require.main === module) {
  test('countingSort', () => {
    const sort = (max: number) => (arr: number[]) => countingSort(max, arr);

    assertSort(sort(10), [0, 2, 0, 0, 3, 4]);

    for (let i = 0; i < 100; i++) {
      assertSort(sort(100), randomArray(100));
    }
  });
}
