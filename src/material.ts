export interface TileResult {
  tileAreaM2: number;
  piecesNet: number;
  piecesWithWaste: number;
  boxes?: number;
}

export function tileEstimate(
  areaM2: number,
  tileW: number,
  tileH: number,
  wastePct = 5,
  boxPieces?: number
): TileResult {
  if (areaM2 <= 0 || tileW <= 0 || tileH <= 0) throw new Error('尺寸与面积必须为正数');
  const tileAreaM2 = (tileW * tileH) / 1_000_000; // mm -> m²
  const net = areaM2 / tileAreaM2;
  const withWaste = Math.ceil(Number((net * (1 + wastePct / 100)).toFixed(4)));
  const boxes = boxPieces ? Math.ceil(withWaste / boxPieces) : undefined;
  return { tileAreaM2, piecesNet: Math.ceil(net), piecesWithWaste: withWaste, boxes };
}

export interface PaintResult {
  litersNet: number;
  litersWithWaste: number;
}

export function paintEstimate(
  wallAreaM2: number,
  coveragePerL: number,
  coats = 2,
  wastePct = 10
): PaintResult {
  if (wallAreaM2 <= 0 || coveragePerL <= 0 || coats <= 0) {
    throw new Error('墙面面积、覆盖率、遍数必须为正数');
  }
  const net = (wallAreaM2 * coats) / coveragePerL;
  return { litersNet: round1(net), litersWithWaste: round1(net * (1 + wastePct / 100)) };
}

export interface WallpaperResult {
  rollsNet: number;
  rollsWithWaste: number;
}

export function wallpaperEstimate(
  wallAreaM2: number,
  rollW: number,
  rollL: number,
  wastePct = 10
): WallpaperResult {
  if (wallAreaM2 <= 0 || rollW <= 0 || rollL <= 0) throw new Error('参数必须为正数');
  const rollArea = (rollW * rollL) / 1_000_000; // mm -> m²
  const net = wallAreaM2 / rollArea;
  return {
    rollsNet: Math.ceil(net),
    rollsWithWaste: Math.ceil(Number((net * (1 + wastePct / 100)).toFixed(4))),
  };
}

export function wallArea(
  lengthM: number,
  widthM: number,
  heightM: number,
  doorWindowAreaM2 = 0
): number {
  const perimeter = 2 * (lengthM + widthM);
  return Math.max(0, perimeter * heightM - doorWindowAreaM2);
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
