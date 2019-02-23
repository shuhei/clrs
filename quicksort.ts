import { test, assertSort, randomArray } from "./test";

function swap(arr: number[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function randomizedPartition(
  arr: number[],
  p: number,
  r: number
): number | null {
  if (r - p < 1) {
    return null;
  }

  const pivot = p + Math.floor(Math.random() * (r - p));
  swap(arr, pivot, r);

  let i = p - 1;
  for (let j = p; j < r; j++) {
    if (arr[j] <= arr[r]) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, r);
  return i + 1;
}

export default function quicksort(arr: number[]): number[] {
  let parts = [[0, arr.length - 1]];
  while (parts.length) {
    const next = [];
    for (let k = 0; k < parts.length; k++) {
      const [p, r] = parts[k];
      const q = randomizedPartition(arr, p, r);
      if (typeof q === "number") {
        next.push([p, q - 1]);
        next.push([q + 1, r]);
      }
    }
    parts = next;
  }
  return arr;
}

if (require.main === module) {
  test("quicksort", () => {
    assertSort(quicksort, []);
    assertSort(quicksort, [2, 0, 1]);
    assertSort(quicksort, [3, 0, 2, 5, 6]);
    assertSort(quicksort, [3, 4, 5, 0, 2, 1]);
    for (let i = 0; i < 100; i++) {
      assertSort(quicksort, randomArray(20, 20));
    }
  });
}
