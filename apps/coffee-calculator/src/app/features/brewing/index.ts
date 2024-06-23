import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AutoFocusDirective } from '@shared/directives/auto-focus.directive';
import { HistoryModule } from '../history';
import { BrewConfigurationComponent } from './brew-configuration/brew-configuration.component';
import { BrewStepsComponent } from './brew-steps/brew-steps.component';

@NgModule({
  declarations: [BrewConfigurationComponent, BrewStepsComponent],
  imports: [
    HistoryModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    AutoFocusDirective,
  ],
  exports: [BrewConfigurationComponent, BrewStepsComponent],
})
export class BrewingModule {}
