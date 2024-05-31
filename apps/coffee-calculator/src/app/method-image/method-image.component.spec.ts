import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});
