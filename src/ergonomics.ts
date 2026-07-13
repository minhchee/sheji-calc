import { ERGO_RULES, ErgoRule } from './standards.js';

export interface ErgoCheck {
  rule: ErgoRule;
  actualMm: number;
  pass: boolean;
  marginMm: number; // 余量，正数表示富余，负数表示不足
}

export function checkClearance(idOrName: string, actualMm: number): ErgoCheck {
  const rule = ERGO_RULES.find((r) => r.id === idOrName || r.name === idOrName);
  if (!rule) throw new Error(`未找到人体工程学规则：${idOrName}（用 list 查看）`);
  const marginMm = actualMm - rule.minMm;
  return { rule, actualMm, pass: marginMm >= 0, marginMm };
}

export function listRules(): ErgoRule[] {
  return ERGO_RULES;
}
