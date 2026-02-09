# turn-tracker

Magic: The Gathering turn and phase tracker built with React, TypeScript, Vite, and Tailwind CSS.

## Build Commands

```bash
make dev       # Start dev server (npm run dev)
make build     # Production build (npm run build)
make lint      # Run ESLint (npm run lint)
make preview   # Preview production build (npm run preview)
```

## Critical Rules

- Pin dependencies to exact versions (e.g., `"react": "18.3.1"`)
- Keep docs updated with every code change
- Keep Makefile updated - add new tasks as project evolves
- All components must be fully typed with TypeScript (no `any`)
- Validate data at boundaries with Zod schemas
