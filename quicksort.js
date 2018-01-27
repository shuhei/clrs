const { test, assertSort, randomArray } = require('./test');

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr, p, r) {
  if (r - p < 1) {
    return null;
  }
  let i = p;
  for (let j = p; j < r; j++) {
    if (arr[j] <= arr[r]) {
      swap(arr, i, j);
      i++;
    }
  }
  swap(arr, i, r);
  return i;
}

function quicksort(arr) {
  let parts = [[0, arr.length - 1]];
  while (parts.length) {
    const next = [];
    for (let k = 0; k < parts.length; k++) {
      const [p, r] = parts[k];
      const i = partition(arr, p, r);
      if (typeof i === 'number') {
        next.push([p, i - 1]);
        next.push([i, r]);
      }
    }
    parts = next;
  }
  return arr;
}

if (require.main === module) {
  test('quicksort', () => {
    assertSort(quicksort, []);
    assertSort(quicksort, [2, 0, 1]);
    assertSort(quicksort, [3, 0, 2, 5, 6]);
    assertSort(quicksort, [3, 4, 5, 0, 2, 1]);
    for (let i = 0; i < 100; i++) {
      assertSort(quicksort, randomArray(20));
    }
  });
}
