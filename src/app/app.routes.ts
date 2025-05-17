import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(
        (c) => c.MainLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'robots',
        loadComponent: () =>
          import('./pages/robots/robots.component').then(
            (c) => c.RobotsComponent
          ),
      },
      {
        path: 'devices',
        loadComponent: () =>
          import('./pages/devices/devices.component').then(
            (c) => c.DevicesComponent
          ),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./pages/analytics/analytics.component').then(
            (c) => c.AnalyticsComponent
          ),
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./pages/galery/galery.component').then(
            (c) => c.GaleryComponent
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact.component').then(
            (c) => c.ContactComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then(
            (c) => c.SettingsComponent
          ),
      },
    ],
  },
];
