import { Component } from '@angular/core';
import { CoffeeCalculatorComponent } from '../../coffee-calculator/coffee-calculator.component';
import { HistoryModule } from '../../features/history';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoffeeCalculatorComponent, HistoryModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
