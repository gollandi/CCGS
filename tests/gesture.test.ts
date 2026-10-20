import test from 'node:test';
import assert from 'node:assert/strict';
import { shouldReveal, getPull } from '../src/lib/gesture.ts';

test('small, accidental movement does not reveal a story', () => {
  assert.equal(shouldReveal(8, 8), false);
  assert.equal(shouldReveal(47, 0), false);
});
test('deliberate pulls work in every direction, including diagonals', () => {
  for (const [x, y] of [[48, 0], [-48, 0], [0, 48], [0, -48], [34, 34]]) {
    assert.equal(shouldReveal(x, y), true);
  }
});
test('pointer cancellation cannot reveal a story after a long drag', () => {
  assert.equal(shouldReveal(900, 900, true), false);
});
test('deformation remains bounded outside the interaction surface', () => {
  assert.deepEqual(getPull(10000, -10000), { x: 1.4, y: 1.2 });
  assert.deepEqual(getPull(-10000, 10000), { x: -1.4, y: -1.2 });
});
test('drag direction follows the finger in scene coordinates', () => {
  assert.deepEqual(getPull(80, -80), { x: .5, y: .5 });
});
