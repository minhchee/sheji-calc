import { ILLUMINANCE_STANDARDS, IlluminanceStandard } from './standards.js';

export interface LightFactors {
  utilization: number; // 利用系数 U，默认 0.6
  maintenance: number; // 维护系数 MF，默认 0.8
}

export const DEFAULT_FACTORS: LightFactors = { utilization: 0.6, maintenance: 0.8 };

// 维持平均照度公式：E = N·Φ·U·MF / A   （E:lx, A:m², Φ:单灯流明 lm, N:灯具数）

export function requiredLumens(areaM2: number, lux: number, f: Partial<LightFactors> = {}): number {
  const { utilization, maintenance } = { ...DEFAULT_FACTORS, ...f };
  if (areaM2 <= 0 || lux <= 0 || utilization <= 0 || maintenance <= 0) {
    throw new Error('面积、照度、利用系数、维护系数必须为正数');
  }
  return (lux * areaM2) / (utilization * maintenance);
}

export function requiredFixtures(
  areaM2: number,
  lux: number,
  luminaireLumens: number,
  f: Partial<LightFactors> = {}
): number {
  const total = requiredLumens(areaM2, lux, f);
  if (luminaireLumens <= 0) throw new Error('单灯流明必须为正数');
  return Math.ceil(total / luminaireLumens);
}

export function actualIlluminance(
  areaM2: number,
  fixtures: number,
  luminaireLumens: number,
  f: Partial<LightFactors> = {}
): number {
  const { utilization, maintenance } = { ...DEFAULT_FACTORS, ...f };
  return (fixtures * luminaireLumens * utilization * maintenance) / areaM2;
}

export function lookupStandard(room: string, task?: string): IlluminanceStandard | undefined {
  const r = room.trim();
  const t = task?.trim();
  return ILLUMINANCE_STANDARDS.find((s) => s.room === r && (t ? s.task === t : true));
}
