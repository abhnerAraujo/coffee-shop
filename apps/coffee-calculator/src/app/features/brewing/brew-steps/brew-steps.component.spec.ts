import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrewStepsComponent } from './brew-steps.component';

describe('BrewStepsComponent', () => {
  let component: BrewStepsComponent;
  let fixture: ComponentFixture<BrewStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrewStepsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrewStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
