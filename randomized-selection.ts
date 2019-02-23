import * as assert from "assert";
import { test, randomArray } from "./test";

function swap<T>(arr: T[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function randomizedPartition(
  arr: number[],
  p: number,
  r: number
): number | null {
  const pivot = p + Math.floor(Math.random() * (r - p));
  swap(arr, pivot, r);

  let i = p - 1;
  for (let j = p; j < r; j++) {
    if (arr[j] < arr[r]) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, r);
  return i + 1;
}

function randomizedSelection(index: number, arr: number[]): number | null {
  if (arr.length < index + 1) {
    return null;
  }
  let p = 0;
  let r = arr.length - 1;
  while (true) {
    const q = randomizedPartition(arr, p, r);
    if (q === null) {
      console.log(`[${arr.join(",")}]`, p, q, r);
      return null;
    } else if (q === index) {
      return arr[index];
    } else if (q < index) {
      p = q + 1;
    } else {
      r = q - 1;
    }
  }
}

if (require.main === module) {
  test("randomizedSelection", () => {
    assertSelection(randomizedSelection, 1, []);
    assertSelection(randomizedSelection, 1, [1]);
    assertSelection(randomizedSelection, 1, [3, 1, 2]);
    for (let i = 0; i < 100; i++) {
      const index = Math.floor(Math.random() * 100);
      assertSelection(randomizedSelection, 1, randomArray(100, 100));
    }
  });
}

function assertSelection(
  fn: (index: number, arr: number[]) => number | null,
  index: number,
  arr: number[]
): void {
  const sorted = arr.slice().sort((a, b) => a - b);
  assert.equal(fn(index, arr), sorted[index]);
}
