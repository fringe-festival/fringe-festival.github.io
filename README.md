# Fringe Festival 2026 Landing Page

React/Vite landing page for the 2026 International Fringe Festival Be'er Sheva.

## Run

```bash
pnpm install
pnpm run prepare:assets
pnpm run dev
```

## Build

```bash
pnpm run build
pnpm exec vite preview --host 0.0.0.0 --port 4173
```

The implementation uses the local festival source materials, converts selected images to WebP, copies the intro videos, and loads the provided brand fonts from `public/`.
