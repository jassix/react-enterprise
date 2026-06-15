# Creating a New Package

1. Create the package directory under the right area (`apps/`, `packages/`, `tooling/`).
2. Write `package.json` using workspace + catalog protocols:

   ```json
   {
     "name": "@repo/new-package",
     "type": "module",
     "exports": {
       ".": { "import": "./src/index.ts", "types": "./src/index.ts" }
     },
     "dependencies": {
       "@repo/std": "workspace:"
     },
     "devDependencies": {
       "@repo/tsconfig": "workspace:",
       "@types/bun": "catalog:"
     },
     "peerDependencies": {
       "typescript": "catalog:"
     }
   }
   ```

3. Add a `tsconfig.json` extending the appropriate shared config:

   ```json
   {
     "extends": "@repo/tsconfig/bun.tsconfig.json",
     "compilerOptions": { "rootDir": "src", "outDir": "dist" },
     "include": ["src/**/*"]
   }
   ```

4. Run `bun install` so the workspace symlinks update.
5. Verify the package is matched by a `workspaces.packages` glob in the root `package.json`; add a glob if needed.
6. Run `bun run format` before committing (oxfmt formats `package.json` and all source).
