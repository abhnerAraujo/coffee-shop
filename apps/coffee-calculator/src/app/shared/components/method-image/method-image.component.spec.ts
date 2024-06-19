import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MethodImageComponent } from './method-image.component';

describe('MethodImageComponent', () => {
  let component: MethodImageComponent;
  let fixture: ComponentFixture<MethodImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethodImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MethodImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set methodImage', () => {
    component.method = 'AeroPress';
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(`[data-testid="method-image"]`))
    ).toBeTruthy();
  });
});
