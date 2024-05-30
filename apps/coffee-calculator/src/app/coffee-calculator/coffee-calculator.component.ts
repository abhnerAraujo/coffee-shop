import { Component, signal } from '@angular/core';
import CoffeeCalculatorView, {
  UnitOptions,
} from '@domain/coffee-calculator-view';
import { ProcessPresenterService } from '../process-presenter/process-presenter.service';

@Component({
  selector: 'app-coffee-calculator',
  standalone: true,
  imports: [],
  templateUrl: './coffee-calculator.component.html',
  styleUrl: './coffee-calculator.component.scss',
})
export class CoffeeCalculatorComponent implements CoffeeCalculatorView {
  protected waterMeasureOptions = signal<UnitOptions['water']>([]);
  protected coffeeMeasureOptions = signal<UnitOptions['coffee']>([]);
  constructor(private presenter: ProcessPresenterService) {
    this.presenter.init(this);
  }
  setUnitOptions(mesureOptions: UnitOptions): void {
    this.waterMeasureOptions.update(() => [...mesureOptions.water]);
    this.coffeeMeasureOptions.update(() => [...mesureOptions.coffee]);
  }
  setMethodOptions(): void {
    throw new Error('Method not implemented.');
  }
  setRatioOptions(): void {
    throw new Error('Method not implemented.');
  }
  setCupSizeOptions(): void {
    throw new Error('Method not implemented.');
  }
  setCupAmountOptions(): void {
    throw new Error('Method not implemented.');
  }
}
