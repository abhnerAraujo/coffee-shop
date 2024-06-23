import { Injectable, inject } from '@angular/core';
import { MethodProcess } from '@domain/method-process';
import { ratioOptions } from '@domain/ratio';
import { CUP_SIZE, Unit } from '@domain/unit';
import { from, map } from 'rxjs';
import { CoffeeCalculator } from 'src/app/features/calculator/domain';
import { HISTORY_REPOSITORY } from 'src/app/features/history/infra';

@Injectable({
  providedIn: 'root',
})
export class BrewService {
  private history = inject(HISTORY_REPOSITORY);
  private calculator = new CoffeeCalculator();

  getLastProcess() {
    return from(this.history.getHistory()).pipe(
      map(history => history.shift())
    );
  }

  frenchPress() {
    const units = { water: 'ml' as Unit, coffee: 'g' as Unit };
    const method = 'French Press';
    const ratio = ratioOptions[method].medium;
    const cups = { amount: 1, unit: 'ml' as Unit, volume: CUP_SIZE };

    this.calculator.setCups(cups.amount);
    this.calculator.setRatio(ratio);
    this.calculator.setUnits(units);
    return MethodProcess.builder()
      .withMethod(method)
      .withCups(cups)
      .withRatio(ratio)
      .withQuantities(this.calculator.calculate())
      .withUnits(units)
      .build();
  }
}
