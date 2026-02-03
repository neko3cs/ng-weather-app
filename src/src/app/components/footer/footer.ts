import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer style="padding: 2rem 0; text-align: center; border-top: 1px solid var(--mat-sys-outline-variant); margin-top: 2rem;">
      <div style="display: flex; justify-content: center; align-items: center; gap: 1rem; mb: 1rem;">
        <a
          href="https://github.com/neko3cs/ng-weather-app"
          style="color: var(--mat-sys-primary); text-decoration: underline; font-weight: 500;"
        >
          GitHub Repos
        </a>
        <span style="opacity: 0.6;" aria-hidden="true">/</span>
        <a
          href="https://x.com/neko3cs"
          style="color: var(--mat-sys-primary); text-decoration: underline; font-weight: 500;"
        >
          開発者(X)
        </a>
      </div>
      <p style="font-size: 0.75rem; opacity: 0.6; margin-top: 1rem;">&copy; 2026 neko3cs</p>
    </footer>
  `,
})
export class Footer {}
