import test from 'node:test';
import assert from 'node:assert/strict';
import { checkClearance, listRules } from '../ergonomics.js';

test('checkClearance 通过', () => {
  const r = checkClearance('主通道净宽', 1000);
  assert.equal(r.pass, true);
  assert.equal(r.marginMm, 100);
});

test('checkClearance 不足', () => {
  const r = checkClearance('主通道净宽', 800);
  assert.equal(r.pass, false);
  assert.equal(r.marginMm, -100);
});

test('listRules 非空', () => {
  assert.ok(listRules().length > 0);
});
