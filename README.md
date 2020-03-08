 <div align="center">
  <h1>Colortone</h1>
</div>

## Getting Started

```
npm install @marchworks/colortone
```
Or if you are using yarn
```
yarn add @marchworks/colortone
```

### Usage
```
import colortone from 'colortone';

// colortone(color, ratio) --> hex || null
const darkerBlueTone = colortone("#0000ff", -0.05)
const lighterBlueTone = colortone("#0000ff", 0.05)
```

### Args
The color arg can be in any of the following formats
```
"#rrggbb"
"#rgb"
[r, g, b] --> the r, g and b values should be of type number
{r, g, b} --> the r, g and b values should be of type number
```
the ratio can not be outside [-1, 1]
