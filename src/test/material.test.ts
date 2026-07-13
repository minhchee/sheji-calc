import test from 'node:test';
import assert from 'node:assert/strict';
import { tileEstimate, paintEstimate, wallpaperEstimate, wallArea } from '../material.js';

test('tileEstimate 含损耗取整', () => {
  const r = tileEstimate(12, 600, 600, 5); // 0.36 m²/片 -> 33.33 片 -> 35 with 5%
  assert.equal(r.tileAreaM2, 0.36);
  assert.equal(r.piecesWithWaste, 35);
  assert.equal(r.piecesNet, 34);
});

test('paintEstimate 用量', () => {
  const r = paintEstimate(40, 10, 2, 10); // 80/10=8L -> 8.8
  assert.equal(r.litersWithWaste, 8.8);
});

test('wallArea 扣减门窗', () => {
  assert.equal(wallArea(5, 4, 3, 4), 50);
});

test('wallpaperEstimate 卷数', () => {
  const r = wallpaperEstimate(40, 530, 10000, 10); // 5.3 m²/卷 -> 9 卷 with 10%
  assert.equal(r.rollsWithWaste, 9);
});
