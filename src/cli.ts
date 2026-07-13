#!/usr/bin/env node
import { requiredFixtures, actualIlluminance, lookupStandard } from './illuminance.js';
import { tileEstimate, paintEstimate, wallpaperEstimate } from './material.js';
import { checkClearance, listRules } from './ergonomics.js';

const USAGE = `sheji-calc 设算 · 室内设计实用计算工具箱
用法：
  sheji-calc light  --area 20 --room 卧室 --task 床头阅读 [--lumen 800] [--U 0.6] [--MF 0.8]
  sheji-calc light  --area 20 --lux 150 --lumen 800
  sheji-calc material tile      --area 12 --w 600 --h 600 [--waste 5] [--box 12]
  sheji-calc material paint     --area 40 --coverage 10 [--coats 2] [--waste 10]
  sheji-calc material wallpaper --area 40 --rw 530 --rl 10000 [--waste 10]
  sheji-calc ergo list
  sheji-calc ergo 主通道净宽 --actual 850
任意命令追加 --json 输出机器可读结果。`;

function num(v: string | undefined, name: string): number {
  if (v === undefined) throw new Error(`缺少参数 --${name}`);
  const n = Number(v);
  if (Number.isNaN(n)) throw new Error(`参数 --${name} 必须为数字`);
  return n;
}

function flag(args: string[], name: string): string | undefined {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
}

function hasFlag(args: string[], name: string): boolean {
  return args.includes(`--${name}`);
}

function formatOut(o: unknown): string {
  if (Array.isArray(o)) {
    return o.map((r) => `${r.id}\t${r.name}\t≥${r.minMm}mm\t${r.standard ?? ''}`).join('\n');
  }
  const obj = o as Record<string, unknown>;
  return Object.entries(obj)
    .map(([k, v]) => {
      if (k === 'rule' && v && typeof v === 'object') {
        const r = v as { name: string; minMm: number; standard?: string };
        return `rule: ${r.name}（≥${r.minMm}mm，${r.standard ?? ''}）`;
      }
      if (v && typeof v === 'object') return `${k}: ${JSON.stringify(v)}`;
      return `${k}: ${v}`;
    })
    .join('\n');
}

function main(): void {
  const [, , cmd, ...rest] = process.argv;
  const json = hasFlag(rest, 'json');
  try {
    let out: unknown;
    switch (cmd) {
      case 'light': {
        const room = flag(rest, 'room');
        const task = flag(rest, 'task');
        const area = num(flag(rest, 'area'), 'area');
        let lux: number;
        if (room) {
          const s = lookupStandard(room, task);
          if (!s) throw new Error(`未找到 ${room}${task ? ' / ' + task : ''} 的照度标准`);
          lux = s.lux;
        } else {
          lux = num(flag(rest, 'lux'), 'lux');
        }
        const lumen = flag(rest, 'lumen') ? num(flag(rest, 'lumen'), 'lumen') : 800;
        const U = flag(rest, 'U') ? num(flag(rest, 'U'), 'U') : 0.6;
        const MF = flag(rest, 'MF') ? num(flag(rest, 'MF'), 'MF') : 0.8;
        const fixtures = requiredFixtures(area, lux, lumen, { utilization: U, maintenance: MF });
        out = {
          room, task, areaM2: area, lux,
          luminaireLumens: lumen, fixtures,
          actualLux: Math.round(actualIlluminance(area, fixtures, lumen, { utilization: U, maintenance: MF })),
        };
        break;
      }
      case 'material': {
        const sub = rest[0];
        const area = num(flag(rest, 'area'), 'area');
        if (sub === 'tile') {
          const w = num(flag(rest, 'w'), 'w');
          const h = num(flag(rest, 'h'), 'h');
          const waste = flag(rest, 'waste') ? num(flag(rest, 'waste'), 'waste') : 5;
          const box = flag(rest, 'box') ? num(flag(rest, 'box'), 'box') : undefined;
          out = { type: 'tile', ...tileEstimate(area, w, h, waste, box) };
        } else if (sub === 'paint') {
          const cov = num(flag(rest, 'coverage'), 'coverage');
          const coats = flag(rest, 'coats') ? num(flag(rest, 'coats'), 'coats') : 2;
          const waste = flag(rest, 'waste') ? num(flag(rest, 'waste'), 'waste') : 10;
          out = { type: 'paint', ...paintEstimate(area, cov, coats, waste) };
        } else if (sub === 'wallpaper') {
          const rw = num(flag(rest, 'rw'), 'rw');
          const rl = num(flag(rest, 'rl'), 'rl');
          const waste = flag(rest, 'waste') ? num(flag(rest, 'waste'), 'waste') : 10;
          out = { type: 'wallpaper', ...wallpaperEstimate(area, rw, rl, waste) };
        } else {
          throw new Error('material 子命令：tile | paint | wallpaper');
        }
        break;
      }
      case 'ergo': {
        const sub = rest[0];
        if (sub === 'list' || !sub) {
          out = listRules();
          break;
        }
        const actual = num(flag(rest, 'actual'), 'actual');
        out = checkClearance(sub, actual);
        break;
      }
      default:
        console.log(USAGE);
        return;
    }
    console.log(json ? JSON.stringify(out, null, 2) : formatOut(out));
  } catch (e) {
    console.error('错误：', (e as Error).message);
    process.exit(1);
  }
}

main();
