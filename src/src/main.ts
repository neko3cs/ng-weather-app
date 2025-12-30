import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/components/app/app';
import localeJa from '@angular/common/locales/ja';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeJa);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
