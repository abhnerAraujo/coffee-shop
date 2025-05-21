import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Brewing } from '@domain/brewing';
import { BrewStateService } from '@shared/services/brew-state.service';

@Component({
  selector: 'app-brew-notes',
  templateUrl: './brew-notes.component.html',
  styleUrl: './brew-notes.component.scss',
})
export class BrewNotesComponent implements OnInit {
  protected description = signal<string>('');
  protected editDescription = signal<boolean>(false);
  protected isEditing = signal(false);
  constructor(
    private brewState: BrewStateService,
    private destroyRef: DestroyRef,
  ) {
    brewState.editing$
      .pipe(takeUntilDestroyed())
      .subscribe(editing => this.isEditing.set(editing));
  }

  ngOnInit(): void {
    this.brewState.brewing$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(brewing => this.updateBrewing(brewing));
  }

  private updateBrewing(brewing: Brewing | undefined) {
    if (brewing) {
      this.description.set(brewing.getDescription());
    }
  }

  protected saveDescription(description: string) {
    const brewing = this.brewState.getBrewing();

    if (brewing) {
      brewing.setDescription(description);
      this.editDescription.set(false);
    }
  }

  protected handleDescriptionClick() {
    if (!this.isEditing()) return;
    this.editDescription.set(true);
  }
}
