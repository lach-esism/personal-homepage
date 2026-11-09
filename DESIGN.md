# Personal Homepage Design Tokens

## Direction

Editorial research notebook: warm paper, ink typography, restrained teal accents, visible rules and numbered sections. The page should feel like a working portfolio rather than a generic SaaS landing page.

## Colors

| Token | Light | Dark | Use |
|---|---|---|---|
| Paper | `#f2efe6` | `#101614` | Page background |
| Paper deep | `#e8e2d5` | `#17201d` | Depth |
| Ink | `#121817` | `#ece8de` | Primary text |
| Ink soft | `#384441` | `#c6c8c0` | Body copy |
| Muted | `#69736f` | `#8e9994` | Metadata |
| Accent | `#0e6c62` | `#78c6ba` | Links and emphasis |
| Warm | `#b54d2e` | `#ee8d6e` | Index numbers |

## Typography

- Display: Songti SC, STSong, Noto Serif CJK SC
- Body: PingFang SC, Hiragino Sans GB, Microsoft YaHei
- Metadata: SFMono-Regular, Cascadia Code, Consolas

## Layout

- Max width: 1440px
- Page padding: `clamp(1.25rem, 4.5vw, 4.75rem)`
- Desktop section split: 2 / 9 columns
- Project split: number / content / technical detail
- Mobile breakpoints: 1024px and 720px

## Interaction

- Theme preference persists in localStorage.
- Reveal motion is disabled when reduced motion is requested.
- `?edit=1` enables contenteditable and Pretext reflow for design review.
