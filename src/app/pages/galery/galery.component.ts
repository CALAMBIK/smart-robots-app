import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.scss',
})
export class GaleryComponent {
  public imgs = [
    'assets/1.png',
    'assets/2.png',
    'assets/3.png',
    'assets/4.png',
    'assets/5.png',
  ];

  public currentIndex = 0;

  public prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.imgs.length) % this.imgs.length;
  }
  public nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.imgs.length;
  }
}
