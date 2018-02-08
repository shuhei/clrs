import * as assert from 'assert';
import { test } from './test';

class Node {
  parent: Node | null;
  left: Node | null;
  right: Node | null;

  constructor(public value: number) {
  }
}

// TODO: Forbid duplicated values?
class BinarySearchTree {
  root: Node | null;

  insert(n: number): void {
    const newNode = new Node(n);
    let parentNode: Node | null = null;
    let currentNode: Node | null = this.root;
    while (currentNode) {
      parentNode = currentNode;
      if (currentNode.value > n) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    if (!parentNode) {
      this.root = newNode;
    } else if (parentNode.value > n) {
      parentNode.left = newNode;
      newNode.parent = parentNode;
    } else {
      parentNode.right = newNode;
      newNode.parent = parentNode;
    }
  }

  exists(n: number): boolean {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.value === n) {
        return true;
      } else if (currentNode.value > n) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  min(): number | null {
    let parentNode = null;
    let currentNode = this.root;
    while (currentNode) {
      parentNode = currentNode;
      currentNode = currentNode.left;
    }
    return parentNode ? parentNode.value : null;
  }

  max(): number | null {
    let parentNode = null;
    let currentNode = this.root;
    while (currentNode) {
      parentNode = currentNode;
      currentNode = currentNode.right;
    }
    return parentNode ? parentNode.value : null;
  }
}

if (require.main === module) {
  test('BinarySearchTree', () => {
    const tree = new BinarySearchTree();
    const nums = [3, 5, 4, 2, 1, 3, 12, -3];
    nums.forEach((n) => {
      tree.insert(n);
    });
    assert.equal(tree.min(), -3);
    assert.equal(tree.max(), 12);
    nums.forEach((n) => {
      tree.exists(n);
    });
    assert(!tree.exists(8));
    assert(!tree.exists(7));
    assert(!tree.exists(-15));
  });
}
