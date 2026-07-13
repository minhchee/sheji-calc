// 标准数据来源：GB 50034-2013《建筑照明设计标准》、GB 50763-2012《无障碍设计规范》
// 以及通用人体工程学设计经验值。数值用于快速估算，正式出图请以最新官方标准为准。

export interface IlluminanceStandard {
  room: string;
  task: string;
  lux: number;
  standard: string;
}

// 部分常见空间的维持平均照度标准值（lx）。节选自 GB 50034-2013。
export const ILLUMINANCE_STANDARDS: IlluminanceStandard[] = [
  { room: '起居室', task: '一般活动', lux: 100, standard: 'GB 50034-2013 表 5.2.1' },
  { room: '起居室', task: '书写阅读', lux: 300, standard: 'GB 50034-2013 表 5.2.1' },
  { room: '卧室', task: '一般活动', lux: 75, standard: 'GB 50034-2013 表 5.2.1' },
  { room: '卧室', task: '床头阅读', lux: 150, standard: 'GB 50034-2013 表 5.2.1' },
  { room: '餐厅', task: '一般活动', lux: 150, standard: 'GB 50034-2013 表 5.2.1' },
  { room: '厨房', task: '一般活动', lux: 100, standard: 'GB 50034-2013 表 5.3.1' },
  { room: '厨房', task: '操作台', lux: 150, standard: 'GB 50034-2013 表 5.3.1' },
  { room: '卫生间', task: '一般活动', lux: 100, standard: 'GB 50034-2013 表 5.4.1' },
  { room: '办公室', task: '普通', lux: 300, standard: 'GB 50034-2013 表 5.5.1' },
  { room: '办公室', task: '高档', lux: 500, standard: 'GB 50034-2013 表 5.5.1' },
  { room: '会议室', task: '一般', lux: 300, standard: 'GB 50034-2013 表 5.5.1' },
  { room: '商场营业厅', task: '一般', lux: 300, standard: 'GB 50034-2013 表 5.5.1' },
  { room: '教室', task: '一般', lux: 300, standard: 'GB 50034-2013 表 5.5.1' },
  { room: '走廊', task: '一般', lux: 50, standard: 'GB 50034-2013 表 5.5.1' },
  { room: '库房', task: '一般', lux: 50, standard: 'GB 50034-2013 表 5.5.1' },
];

export interface ErgoRule {
  id: string;
  name: string;
  minMm: number;
  description?: string;
  standard?: string;
}

// 常见空间净宽/净距最小要求（mm）。综合 GB 50763-2012 及通用人体工程学经验值。
export const ERGO_RULES: ErgoRule[] = [
  { id: 'passage_main', name: '主通道净宽', minMm: 900, description: '单人无障碍通行最低，建议 1000', standard: 'GB 50763-2012' },
  { id: 'passage_double', name: '双人并行通道', minMm: 1100, description: '两人可侧身错行', standard: '通用人体工程学' },
  { id: 'kitchen_work', name: '厨房操作台前通道', minMm: 900, description: '单人操作，双人 1200', standard: 'JGJ 64 饮食建筑设计规范(参考)' },
  { id: 'dining_chair', name: '餐椅后通行', minMm: 600, description: '就座后腿部空间约 300', standard: '通用人体工程学' },
  { id: 'bed_side', name: '床侧通行', minMm: 600, description: '取物与通行', standard: '通用人体工程学' },
  { id: 'toilet_front', name: '马桶前活动空间', minMm: 600, description: '正面使用，侧面约 450', standard: 'GB 50763-2012' },
  { id: 'shower_min', name: '淋浴间最小边长', minMm: 900, description: '无障碍建议 1000 带坐台或 1500', standard: 'GB 50763-2012' },
  { id: 'wardrobe_front', name: '衣柜前操作空间', minMm: 600, description: '开门取物', standard: '通用人体工程学' },
  { id: 'sofa_table', name: '沙发与茶几间距', minMm: 300, description: '舒适区间 300-450', standard: '通用人体工程学' },
  { id: 'desk_leg', name: '书桌腿部净空(深)', minMm: 550, description: '高度方向≥600', standard: '通用人体工程学' },
];
