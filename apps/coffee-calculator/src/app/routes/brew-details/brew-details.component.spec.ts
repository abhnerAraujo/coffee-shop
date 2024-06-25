import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrewDetailsComponent } from './brew-details.component';

describe('BrewDetailsComponent', () => {
  let component: BrewDetailsComponent;
  let fixture: ComponentFixture<BrewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrewDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
