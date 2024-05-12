<div align="center">

# xlane

<img alt="logo" src="./logo.png" width="300">

React based progress bar for command-line/terminal applications

</div>

## Features

- 🌱 Simple & Easy to use
- 🔥 Supports single & multiple progress bar
- 🎨 Supports 256 & Truecolor
- ⭐️ Fully customizable

## Installation

```bash
# npm
npm install xlane

# yarn
yarn add xlane
```

## Usage

```ts
import { xLane } from 'xlane';

// 1. Create instance
const xlane = xLane({
  progressBarSize: 50,
  activeChar: '█',
  inactiveChar: '░',
  refreshRate: 50,
});

// 2. Add new progress bar
const progressBar = xlane.add({
  total: 100,
  template: '{label} {progress} ({percentage})',
  placeholder: {
    label: 'Downloader',
  },
});

// 3. Render progress bar
progressBar.start({ value: 0 });

await download({
  onProgress: (percent) => {
    // 4. Update progress bar state
    progressBar.update({ value: percent });
  },
});

// 5. Unmount progress bar
progressBar.stop();

// 6. Remove progress bar
xlane.remove(progressBar);
xlane.removeAll();
```

![single-progress-bar](./preview/single-progress-bar.gif)

<details>

  <summary>Multiple progress bars</summary>

[Demo](./demo/multiple-progress-bars.ts)

![multiple-progress-bars](./preview/multiple-progress-bars.gif)

</details>

<details>

  <summary>Custom colored progress bars</summary>

[Demo](./demo/custom-colors.ts)

![multiple-progress-bars](./preview/custom-colors.gif)

</details>

<details>

  <summary>Re-use progress bar</summary>

[Demo](./demo/reuse-progress-bar.ts)

![multiple-progress-bars](./preview/reuse-progress-bar.gif)

</details>

## Documentation

### xLane

Create xLane instance.

- Parameters
  | Name | Type | Required |
  |:--|:--|:--|
  | options | `XLaneOptions` | No |
- Return Value
  | Type |
  |:--|
  | `XLane` |

```ts
/* interfaces */

interface XLaneOptions {
  /**
   * Defaults to `50` (Depend on terminal size).
   */
  progressBarSize?: ProgressBarProps['progressBarSize'];
  /**
   * Defaults to `'█'`.
   */
  activeChar?: ProgressBarProps['activeChar'];
  /**
   * Defaults to `'░'`.
   */
  inactiveChar?: ProgressBarProps['inactiveChar'];
  /**
   * Defaults to `50`.
   */
  refreshRate?: ContainerProps['refreshRate'];
}

function xLane(options?: XLaneOptions): XLane;
```

```ts
import { xLane } from 'xlane';

const instance = xLane(options);
```

- `progressBarSize`: Defaults to `50` (Depend on terminal size).
- `activeChar`: Defaults to `'█'`.
- `inactiveChar`: Defaults to `'░'`.
- `refreshRate`: Defaults to `50`.

### XLane.add

Create a new `ProgressBar` into instance context.
It can be called multiple times for multiple progress bars.

- Parameters
  | Name | Type | Required |
  |:--|:--|:--|
  | progressConfig | `ProgressConfig` | Yes |
- Return Value
  | Type |
  |:--|
  | `ProgressBar` |

```ts
/* interfaces */

interface ProgressConfig {
  total: number;
  template?: string;
  placeholder?: PlaceholderConfig;
}

function add(progressConfig: ProgressConfig): ProgressBar;
```

- `total` Total value.
- `template`: [Template](#template) string.
- `placeholder`: Key-Value data that replace of template's placeholders.

### XLane.remove

Unmount & Remove specified `ProgressBar` from current context.

- Parameters
  | Name | Type | Required |
  |:--|:--|:--|
  | progressBar | `ProgressBar` | Yes |
- Return Value
  | Type |
  |:--|
  | `void` |

```ts
/* interfaces */

function remove(progressBar: ProgressBar): void;
```

### XLane.removeAll

Unmount & Remove all progress bars from current context.

- Return Value
  | Type |
  |:--|
  | `void` |

```ts
/* interfaces */

function removeAll(): void;
```

### ProgressBar.start

Render progress bar.

- Parameters
  | Name | Type | Required |
  |:--|:--|:--|
  | options | `ProgressBarOptions` | Yes |
- Return Value
  | Type |
  |:--|
  | `void` |

```ts
/* interfaces */

interface ProgressBarOptions {
  value: number;
  total?: number;
  placeholder?: PlaceholderConfig;
}

function start(options: ProgressBarOptions): void;
```

- `value`: current progress value.
- `total`: total progress value.
- `placeholder`: Key-Value data that replace of template's placeholders.

### ProgressBar.update

Set new states and re-render progress bar.

- Parameters
  | Name | Type | Required |
  |:--|:--|:--|
  | options | `ProgressBarOptions` | Yes |
- Return Value
  | Type |
  |:--|
  | `void` |

```ts
/* interfaces */

interface ProgressBarOptions {
  value: number;
  total?: number;
  placeholder?: PlaceholderConfig;
}

function update(options: ProgressBarOptions): void;
```

- `value`: current progress value.
- `total`: total progress value.
- `placeholder`: Key-Value data that replace of template's placeholders.

### ProgressBar.stop

Unmount progress bar.

> [!NOTE]  
> If you want to exit the process, you should remove all of progress bars from context.

```ts
function stop(): void;
```

## Template

> [!WARNING]
> If you use reserved placeholder name, it will be overwritten to internal value of xlane.

```ts
const templateString = 'Template {label} {progress} | {test}';

progressBar.update({
  placeholder: {
    label: '#1',
    test: {
      text: 'Colored Text',
      color: '#00ffff',
    },
  },
});

// Preview
// Template #1 ██████████████░░░░░░░░░░░░░░░░ | Colored Text
```

- Reserved placeholders
  - `{progress}`: Progress bar (required)
  - `{value}`: Current value
  - `{total}`: Total value
  - `{percentage}`: `current / total * 100`% value

## Development

```bash
# Lint
yarn lint

# Build
yarn build

# Run demo code
yarn start demo/{name}.ts
```

## Resources

- Logo image generated by [DALL-E](https://openai.com/index/dall-e-3)

## License

[MIT](./LICENSE)
