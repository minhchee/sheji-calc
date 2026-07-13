# sheji-calc（设算）

> 室内设计现场实用计算工具箱。照度、材料损耗、人体工程学校验，内置国标数据。

## 为什么做这个（实用又冷门）

室内设计师每周都在算：这个房间要几盏灯？瓷砖买多少片才不亏？这条通道够不够宽？
这些活现在靠手算、Excel 或干脆凭经验，几乎没有人为华语设计师做成开源命令行工具。

`sheji-calc` 把三类高频、易错、被主流开源生态忽视的计算，打包成一个零运行依赖的
TypeScript 工具箱。它不性感、不追热点，但工地和方案阶段真的用得上。

数据内置 GB 50034-2013《建筑照明设计标准》、GB 50763-2012《无障碍设计规范》等，
数值用于快速估算，正式出图请以最新官方标准为准。

## 安装

```bash
git clone https://github.com/minhchee/sheji-calc.git
cd sheji-calc
npm install
npm run build
npm link   # 可选：全局可用 sheji-calc 命令
```

## 使用

### 照度 / 灯具数量

```bash
# 按房间与活动自动查国标照度，反推灯具数
sheji-calc light --area 20 --room 卧室 --task 床头阅读
# -> lux: 150, luminaireLumens: 800, fixtures: 8, actualLux: 154

# 手动指定照度
sheji-calc light --area 20 --lux 150 --lumen 800
```

### 材料损耗估算

```bash
# 600×600mm 瓷砖，12㎡，损耗 5%，每箱 12 片
sheji-calc material tile --area 12 --w 600 --h 600 --waste 5 --box 12
# -> piecesWithWaste: 35, boxes: 3

# 涂料：40㎡墙面，每升刷 10㎡，2 遍，损耗 10%
sheji-calc material paint --area 40 --coverage 10 --coats 2 --waste 10
# -> litersWithWaste: 8.8

# 壁纸：40㎡，卷宽 530mm 长 10m
sheji-calc material wallpaper --area 40 --rw 530 --rl 10000
```

### 人体工程学校验

```bash
sheji-calc ergo list                 # 列出全部规则
sheji-calc ergo 主通道净宽 --actual 850
# -> pass: false, marginMm: -50
```

任意命令加 `--json` 输出机器可读结果，便于接入脚本或其他工具。

## 作为库使用

```ts
import { requiredFixtures, tileEstimate, checkClearance } from 'sheji-calc';

requiredFixtures(20, 150, 800);          // 灯具数
tileEstimate(12, 600, 600, 5);           // 瓷砖用量
checkClearance('主通道净宽', 1000);        // 净宽校验
```

## 测试

```bash
npm test
```

## 许可证

MIT © minhchee

---

# sheji-calc (English)

A practical, obscure toolbox for interior designers: illuminance/fixture count,
material waste estimation, and ergonomics clearance checks, with built-in Chinese
standard (GB 50034 / GB 50763) data.

```bash
npm install && npm run build
sheji-calc light --area 20 --room 卧室 --task 床头阅读
sheji-calc material tile --area 12 --w 600 --h 600
sheji-calc ergo 主通道净宽 --actual 850
```

Zero runtime dependencies. Data is for quick estimation; always verify against
the latest official standards before final drawings.
