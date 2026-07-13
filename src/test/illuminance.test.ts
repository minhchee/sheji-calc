import test from 'node:test';
import assert from 'node:assert/strict';
import { requiredFixtures, actualIlluminance, requiredLumens, lookupStandard } from '../illuminance.js';

test('requiredLumens 基础公式', () => {
  // E=100lx, A=10m², U=0.6, MF=0.8 -> 100*10/0.48 = 2083.33
  assert.ok(Math.abs(requiredLumens(10, 100) - 2083.333) < 0.01);
});

test('requiredFixtures 向上取整', () => {
  // total = 150*20/0.48 = 6250; /800 = 7.8125 -> 8
  const n = requiredFixtures(20, 150, 800, { utilization: 0.6, maintenance: 0.8 });
  assert.equal(n, 8);
});

test('actualIlluminance 反算不低于下限', () => {
  const lux = actualIlluminance(20, 8, 800, { utilization: 0.6, maintenance: 0.8 });
  assert.ok(lux >= 150);
});

test('lookupStandard 命中标准', () => {
  assert.equal(lookupStandard('卧室', '床头阅读')?.lux, 150);
});
