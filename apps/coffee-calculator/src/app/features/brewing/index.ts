import { NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AutoFocusDirective } from '@shared/directives/auto-focus.directive';
import { DisplayTimePipe } from '@shared/pipes/display-time/display-time.pipe';
import { HistoryModule } from '../history';
import { BrewConfigurationComponent } from './brew-configuration/brew-configuration.component';
import { BrewNotesComponent } from './brew-notes/brew-notes.component';
import { BrewStepsComponent } from './brew-steps/brew-steps.component';

@NgModule({
  declarations: [
    BrewConfigurationComponent,
    BrewStepsComponent,
    BrewNotesComponent,
  ],
  imports: [
    HistoryModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    AutoFocusDirective,
    MatDividerModule,
    NgClass,
    DisplayTimePipe,
  ],
  providers: [provideFirestore(() => getFirestore())],
  exports: [BrewConfigurationComponent, BrewStepsComponent, BrewNotesComponent],
})
export class BrewingModule {}
