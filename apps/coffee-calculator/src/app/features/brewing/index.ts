import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { HistoryModule } from '../history';
import { BrewConfigurationComponent } from './brew-configuration/brew-configuration.component';
import { BrewStepsComponent } from './brew-steps/brew-steps.component';

@NgModule({
  declarations: [BrewConfigurationComponent, BrewStepsComponent],
  imports: [HistoryModule, MatIconModule, MatButtonModule, MatTabsModule],
  exports: [BrewConfigurationComponent, BrewStepsComponent],
})
export class BrewingModule {}
