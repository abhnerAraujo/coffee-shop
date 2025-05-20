import { AsyncPipe, NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
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
import { BrewTimerComponent } from './brew-timer/brew-timer.component';
import { TimelineStepsComponent } from './timeline-steps/timeline-steps.component';

@NgModule({
  declarations: [
    BrewConfigurationComponent,
    BrewStepsComponent,
    BrewNotesComponent,
    TimelineStepsComponent,
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
    FormsModule,
    AsyncPipe,
    BrewTimerComponent,
  ],
  providers: [provideFirestore(() => getFirestore())],
  exports: [
    BrewConfigurationComponent, 
    BrewStepsComponent, 
    BrewNotesComponent,
    TimelineStepsComponent,
    BrewTimerComponent
  ],
})
export class BrewingModule {}
