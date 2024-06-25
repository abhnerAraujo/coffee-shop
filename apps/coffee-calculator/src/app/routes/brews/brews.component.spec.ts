import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrewComponent } from './brews.component';

describe('BrewComponent', () => {
  let component: BrewComponent;
  let fixture: ComponentFixture<BrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
