// 1.5
import * as assert from "assert";
import { test } from "./test";

export default function oneAway(a: string, b: string): boolean {
  if (a.length === b.length) {
    // Check for a replacement.
    let different = false;
    for (let i = 0; i < a.length; i++) {
      if (a.charAt(i) !== b.charAt(i)) {
        if (different) {
          // Two different characters.
          return false;
        } else {
          // The first different character.
          different = true;
        }
      }
    }
    return true;
  }

  // Make sure that a is shorter than b.
  if (a.length > b.length) {
    return oneAway(b, a);
  }

  if (b.length - a.length > 1) {
    return false;
  }

  // b has one character more than a.
  let different = false;
  for (let i = 0; i < a.length; i++) {
    if (different) {
      if (a.charAt(i) !== b.charAt(i + 1)) {
        return false;
      }
    } else {
      if (a.charAt(i) !== b.charAt(i)) {
        different = true;
      }
    }
  }
  return true;
}

if (require.main === module) {
  test("oneAway", () => {
    assert.equal(oneAway("pale", "ple"), true);
    assert.equal(oneAway("pales", "pale"), true);
    assert.equal(oneAway("pale", "bale"), true);
    assert.equal(oneAway("pale", "bake"), false);
    assert.equal(oneAway("pale", "paleale"), false);
    assert.equal(oneAway("pale", "paaale"), false);
  });
}
