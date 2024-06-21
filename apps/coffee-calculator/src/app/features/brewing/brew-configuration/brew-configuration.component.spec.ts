import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrewConfigurationComponent } from './brew-configuration.component';

describe('BrewConfigurationComponent', () => {
  let component: BrewConfigurationComponent;
  let fixture: ComponentFixture<BrewConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrewConfigurationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrewConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
