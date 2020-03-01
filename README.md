 <div align="center">
  <h2>Colortone</h2>
</div>

## 📦 Getting Started

```
npm install @marchworks/colortone
```
Or if you are using yarn
```
yarn add @marchworks/colortone
```

### Usage
```
import { darken, lighten } from 'colortone';

// method(color, ratio)
const darkerBlueTone = darken("#0000ff", 0.2)
const lighterBlueTone = lighten("#0000ff", 0.2)
...
```

### Args
The color arg can be in any of the following formats
```
"#rrggbb"
"#rgb"
[r, g, b] --> the r, g and b values should be of type number
{r, g, b} --> the r, g and b values should be of type number
```
the ratio can not be outside [0, 1]
