import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeCalculatorComponent } from './coffee-calculator.component';

describe('CoffeeCalculatorComponent', () => {
  let component: CoffeeCalculatorComponent;
  let fixture: ComponentFixture<CoffeeCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeCalculatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoffeeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
