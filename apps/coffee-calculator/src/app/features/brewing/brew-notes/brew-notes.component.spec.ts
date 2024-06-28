import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrewNotesComponent } from './brew-notes.component';

describe('BrewNotesComponent', () => {
  let component: BrewNotesComponent;
  let fixture: ComponentFixture<BrewNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrewNotesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrewNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
