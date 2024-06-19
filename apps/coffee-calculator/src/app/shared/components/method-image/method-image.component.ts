import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MethodType } from '@domain/method';

@Component({
  selector: 'app-method-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './method-image.component.html',
  styleUrl: './method-image.component.scss',
})
export class MethodImageComponent {
  protected methodImage = signal<string>('');
  protected alt = signal<string>('');
  @Input() set method(value: MethodType) {
    this.methodImage.set(`/img/${this.methodImages[value]}`);
    this.alt.set(value);
  }
  private readonly methodImages = {
    AeroPress: 'aeropress.png',
    Chemex: 'chemex.png',
    'French Press': 'french-press.png',
    V60: 'v60.png',
    'Moka Pot': 'moka-pot.png',
  };
}
