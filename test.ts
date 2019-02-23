import * as assert from "assert";

export function test(name: string, fn: () => void): void {
  try {
    fn();
    console.log(`OK ${name}`);
  } catch (e) {
    console.error(`NG ${name}`);
    console.error(e.stack);
    console.error("expected: %j", e.expected);
    console.error("  actual: %j", e.actual);
  }
}

export function assertSort(
  sortFn: (nums: number[]) => number[],
  arr: number[]
): void {
  const original = arr.slice();
  const expected = arr.slice().sort((a, b) => a - b);
  const actual = sortFn(arr);
  assert.deepEqual(actual, expected, original.toString());
}

export function randomArray(max: number, size: number): number[] {
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = Math.floor(Math.random() * max);
  }
  return arr;
}
