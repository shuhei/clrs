import * as assert from "assert";
import { test, randomArray } from "./test";
import countingSort from "./countingsort";

export default function radixSort(arr: number[][]): number[][] {
  if (arr.length === 0) {
    return arr;
  }
  const size = arr[0].length;
  let result = arr;
  // Sort from the lowest digit.
  for (let i = size - 1; i >= 0; i--) {
    const getKey = (nums: number[]) => nums[i];
    result = countingSort(getKey, 9, result);
  }
  return result;
}

if (require.main === module) {
  test("radixSort", () => {
    for (let i = 0; i < 100; i++) {
      const arr = randomArray(1000, 20).map(n =>
        pad("0", 3, n.toString())
          .split("")
          .map(n => parseInt(n, 10))
      );
      assertSort(radixSort, arr);
    }
  });
}

function pad(char: string, n: number, str: string): string {
  let result = str;
  while (result.length < n) {
    result = char + result;
  }
  return result;
}

function assertSort(
  sortFn: (nums: number[][]) => number[][],
  arr: number[][]
): void {
  const original = arr.map(ns => ns.join(""));
  const expected = original.slice().sort();
  const actual = sortFn(arr).map(ns => ns.join(""));
  assert.deepEqual(actual, expected, original.toString());
}
