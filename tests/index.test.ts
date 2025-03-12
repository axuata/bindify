import {describe, expect, test} from "vitest";
import {sum} from "../src";

describe('test code', () => {
  test('1 + 2', () => {
    expect(sum(1, 2)).toBe(3);
  });
});