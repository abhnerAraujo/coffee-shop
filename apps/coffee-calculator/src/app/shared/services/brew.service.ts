import { Injectable, inject } from '@angular/core';
import { Brewing } from '@domain/brewing';
import { methodTime, methodWaterAmount } from '@domain/method';
import { MethodProcess } from '@domain/method-process';
import { ratioOptions } from '@domain/ratio';
import { ratioIntensityByMethod } from '@domain/ratio-intensity';
import { stepsByMethodProcess } from '@domain/steps';
import { Unit } from '@domain/unit';
import { from, map } from 'rxjs';
import { BREWING_REPOSITORY } from 'src/app/features/brewing/infra';
import { CoffeeCalculator } from 'src/app/features/calculator/domain';
import { HISTORY_REPOSITORY } from 'src/app/features/history/infra';
import { AppStateService } from './app-state.service';
import { BrewSyncService } from './brew-sync.service';

@Injectable({
  providedIn: 'root',
})
export class BrewService {
  private history = inject(HISTORY_REPOSITORY);
  private brewRepo = inject(BREWING_REPOSITORY);
  private calculator = new CoffeeCalculator();
  private brewSync = inject(BrewSyncService);
  private appState = inject(AppStateService);

  getLastProcess() {
    return from(this.history.getHistory()).pipe(
      map(history => history.shift())
    );
  }

  startNewBrewing(methodProcess: MethodProcess) {
    const { currentUser } = this.appState;
    const brewing = Brewing.create({
      methodProcess,
      name: 'My brew',
      steps: stepsByMethodProcess(methodProcess),
      timer: methodTime[methodProcess.method],
      properties: Brewing.extractPropertiesFromMethodProcess(methodProcess),
      timeline: [],
      ...(currentUser && {
        author: {
          id: currentUser.id,
          name: currentUser.name,
        },
      }),
    });

    return brewing;
  }

  frenchPress() {
    const units = { water: 'ml' as Unit, coffee: 'g' as Unit };
    const method = 'French Press';
    const ratio = ratioOptions[method].medium;
    const cups = {
      amount: 1,
      unit: 'ml' as Unit,
      volume: methodWaterAmount[method],
    };

    this.calculator.setCups(cups.amount);
    this.calculator.setRatio(ratio);
    this.calculator.setUnits(units);
    this.calculator.setMethod(method);
    return MethodProcess.builder()
      .withMethod(method)
      .withCups(cups)
      .withRatio(ratio)
      .withQuantities(this.calculator.calculate())
      .withUnits(units)
      .build();
  }

  suggestName(process: MethodProcess) {
    return `${ratioIntensityByMethod(process.ratio, process.method)} ${
      process.method
    }`.toLocaleUpperCase();
  }

  updateBrewing(brewing: Brewing) {
    this.brewRepo.update(brewing);
    return brewing;
  }

  getBrewing(id: string) {
    return this.brewRepo.getBrewing(id);
  }

  listBrewings() {
    return from(this.brewRepo.listBrewings());
  }

  syncBrewings() {
    this.brewSync.sync();
  }
}
