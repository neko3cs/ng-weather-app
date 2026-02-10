# Agent Instructions - ng-weather-app

This document provides essential information for AI coding agents operating in this repository.

## Project Overview

A weather application built with Angular 21, leveraging modern features like Standalone Components, Signals, and the latest Control Flow syntax.

- **Frontend**: Angular 21 (Standalone Components, Signals, Control Flow Syntax)
- **Styling**: Angular Material 3, Tailwind CSS v3
- **API**: Open-Meteo API for weather data, Nominatim (OpenStreetMap) for geolocation
- **Testing**: Vitest (integrated with Angular CLI unit-test builder)
- **Language**: Interaction with users must be in **Japanese**.

## Directory Structure

The project has a nested structure. Always operate relative to the project root `/Users/neko3cs/src/ng-weather-app`.

- `/src`: The main Angular workspace root.
  - `/src/src/app`: Application source code.
    - `/components`: UI components (e.g., `current-forecast`, `hourly-forecast`).
    - `/services`: Business logic, API integrations, and state management.
    - `/types`: TypeScript type definitions for API responses and internal models.
  - `/src/dist`: Build output (managed by Angular CLI).
- `/docs`: GitHub Pages deployment directory (contains final build artifacts for static hosting).

## Common Commands

All commands should be executed within the `src` directory unless specified otherwise.

### Build & Development

- **Start Dev Server**: `pnpm start` (Runs `ng serve`)
- **Production Build**: `pnpm build` (Runs `ng build`)
- **Deploy to GitHub Pages**: `pnpm run deploy`
  - _Note_: This custom script in `src/package.json` builds with `base-href ./`, cleans the `/docs` directory, and copies new artifacts.

### Testing

- **Run All Tests**: `pnpm test` (Runs `ng test --watch=false`)
- **Run Single Test File**: `pnpm run test -- --include=src/app/app.spec.ts`
  - Alternatively: `npx ng test --include=src/app/components/current-forecast/current-forecast.spec.ts`
- **Vitest Watch Mode**: `npx vitest` (if you prefer direct Vitest interaction)

### Linting & Formatting

- **Formatting**: The project uses Prettier. Configuration is in `src/package.json`.
- **Prettier Command**: `npx prettier --write .` (Run inside `src`)
- **Linting**: No explicit ESLint configuration is currently present; follow existing code patterns strictly.

## Code Style Guidelines

### 1. Naming Conventions

- **Directories & Files**: kebab-case (e.g., `src/app/components/current-forecast/`)
- **Classes**: PascalCase (e.g., `export class CurrentForecast`)
- **Variables & Functions**: camelCase (e.g., `weather = signal<Weather | null>(null)`)
- **Types & Interfaces**: PascalCase (e.g., `export type Weather = { ... }`)
- **Selectors**: `app-` prefix with kebab-case (e.g., `selector: 'app-current-forecast'`)

### 2. Angular Best Practices (v21+)

- **Standalone Components**: Always use `standalone: true`.
- **Dependency Injection**: Prefer the `inject()` function over constructor injection.

  ```typescript
  private weatherService = inject(WeatherService);
  ```

- **State Management**: Use **Signals** (`signal`, `computed`, `effect`) for component state and reactive logic.
- **Signals Example**:

  ```typescript
  weather = signal<Weather | null>(null);
  hasData = computed(() => this.weather() !== null);
  ```

- **Control Flow**: Use the new `@if`, `@for`, `@switch` syntax instead of structural directives like `*ngIf`.

  ```html
  @if (weather(); as data) {
  <app-current-forecast [current]="data.current" />
  }
  ```

- **Async Handling**: Use `lastValueFrom` to convert RxJS Observables to Promises when using `async/await` in component methods.

### 3. Imports

- Use relative imports for local files (e.g., `import { Weather } from '../../types/weather'`).
- Group imports:
  1. Angular core/common/forms packages
  2. Third-party libraries (Material, RxJS)
  3. Local components/services/types
- Main type definitions should use `export default` to simplify imports.

### 4. Error Handling

- Wrap API calls and browser API interactions (like Geolocation) in `try/catch` blocks.
- Use Signals to manage error messages and loading states in the UI to ensure responsive feedback.
- _Example_:

  ```typescript
  try {
    const coords = await this.geoService.getCurrentLocation();
    // handle success
  } catch (err) {
    this.message.set("Failed to get location");
  }
  ```

### 5. Styling

- Use **Tailwind CSS** for layout, spacing, and responsive design.
- Use **Angular Material 3** components for standard UI elements (buttons, cards, spinners).
- When referencing Material design tokens in Tailwind, use the `bg-(--mat-sys-...)` or `text-(--mat-sys-...)` syntax (Tailwind v3 compatible: `bg-[var(--mat-sys-...)]`).

## Git Safety Protocol

Agents must adhere to the following rules to prevent accidental or unwanted changes:

1. **Commit Restrictions**:
   - NEVER run `git commit` without explicit user permission.
   - Present a summary of changes and ask for permission first.
2. **Push Restrictions**:
   - NEVER run `git push` without explicit user permission.
   - Always verify the remote branch before pushing.
3. **No Amend/Force Push**:
   - Avoid `git commit --amend` or `git push --force` unless explicitly requested.

## Agent Roles

The project defines the following roles for coordinated development:

1. **Software Architect**: Responsible for project structure and ensuring Angular best practices.
2. **Frontend Engineer**: Responsible for component implementation, logic, and styling.
3. **API & Data Integration Engineer**: Responsible for external API communication and data models.
4. **QA & Test Engineer**: Responsible for unit testing and code quality assurance.
5. **UI/UX Designer**: Responsible for layout, accessibility, and visual polish.

---

_Last Updated: 2026-02-10_
