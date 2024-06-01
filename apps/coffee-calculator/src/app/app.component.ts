import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CoffeeCalculatorComponent } from './coffee-calculator/coffee-calculator.component';

@Component({
  standalone: true,
  imports: [RouterModule, CoffeeCalculatorComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Coffee Calculator';

  constructor(title: Title) {
    title.setTitle(this.title);
  }
}
