import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavList } from '../../entities/nav-list';

const MATERIAL_MODULES = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
];

@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ...MATERIAL_MODULES,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  public navList: NavList[] = [
    { path: '', name: 'Главная', icon: 'home' },
    { path: 'robots', name: 'Роботы', icon: 'smart_toy' },
    { path: 'devices', name: 'Устройства', icon: 'sensors' },
    { path: 'gallery', name: 'Галерея', icon: 'photo_library' },
    { path: 'contact', name: 'Обратная связь', icon: 'contact_mail' },
  ];
}
