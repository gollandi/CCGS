import test from 'node:test';
import assert from 'node:assert/strict';
import { openingScore, lensIntent } from '../src/lib/refraction.ts';

test('opening is immediate, peaks at 1.5 seconds and becomes exactly still at 3', () => {
  assert.equal(openingScore(0), 0);
  assert.equal(openingScore(.5), 0);
  assert.equal(openingScore(1.5), 1);
  assert.equal(openingScore(3), .35);
  assert.equal(openingScore(300), .35);
});

test('intent ignores small tremors and remains bounded during a long pull', () => {
  assert.equal(lensIntent(5), 0);
  assert.equal(lensIntent(70), 1);
  assert.equal(lensIntent(300), 1);
  assert.ok(lensIntent(35) > 0 && lensIntent(35) < 1);
});
