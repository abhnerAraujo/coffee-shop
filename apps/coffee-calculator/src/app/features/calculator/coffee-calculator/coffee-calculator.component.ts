import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  Inject,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MethodType } from '@domain/method';
import { RatioIntensity } from '@domain/ratio';
import { Unit, UnitOptions } from '@domain/unit';
import { MethodImageComponent } from '@shared/components';
import { map } from 'rxjs';
import CoffeeCalculatorView, {
  CoffeCalculatorValue,
} from '../domain/coffee-calculator-view';
import { ProcessPresenterService } from '../process-presenter';

const MAT_MODULES = [
  MatButtonToggleModule,
  MatDividerModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
];

@Component({
  selector: 'app-coffee-calculator',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MethodImageComponent,
    LayoutModule,
    ...MAT_MODULES,
  ],
  providers: [ProcessPresenterService],
  templateUrl: './coffee-calculator.component.html',
  styleUrl: './coffee-calculator.component.scss',
})
export class CoffeeCalculatorComponent
  implements CoffeeCalculatorView, AfterViewInit
{
  protected waterMeasureOptions = signal<UnitOptions['water']>([]);
  protected coffeeMeasureOptions = signal<UnitOptions['coffee']>([]);
  protected ratioOptions = signal<RatioIntensity[]>([]);
  protected ratioIntensity = signal<RatioIntensity>('medium');
  protected methodOptions = signal<MethodType[]>([]);
  protected showCupsAmountInput = signal<boolean>(false);
  protected result = signal<{ water: string; coffee: string; cups: string }>({
    water: '',
    coffee: '',
    cups: '',
  });
  protected isMediumLayout = signal<boolean>(false);
  protected readonly form: FormGroup<CoffeCalculatorForm>;
  public destroyRef = inject(DestroyRef);
  constructor(
    protected presenter: ProcessPresenterService,
    private readonly formBuilder: FormBuilder,
    private layoutChanges: BreakpointObserver,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.form = this.formBuilder.group({
      coffeeAmount: 0,
      coffeeUnit: 'g' as Unit,
      waterAmount: 0,
      waterUnit: 'g' as Unit,
      method: 'French Press' as MethodType,
      coffeeCups: 1,
      ratio: this.formBuilder.group({
        coffee: 0,
        water: 0,
      }),
    });
    this.presenter.init(this, isPlatformBrowser(platformId));
    if (isPlatformBrowser(platformId)) {
      const mediumBreakpoint = '(min-width: 768px)';

      this.layoutChanges.observe([mediumBreakpoint]).subscribe(result => {
        this.isMediumLayout.set(result.matches);
      });
    }
  }

  ngAfterViewInit(): void {
    this.form.controls['method'].valueChanges.subscribe(value => {
      if (value) this.presenter.setIntensityRatio(value, 'medium');
    });
  }
  setUnitOptions(mesureOptions: UnitOptions): void {
    this.waterMeasureOptions.set([...mesureOptions.water]);
    this.coffeeMeasureOptions.set([...mesureOptions.coffee]);
  }
  setMethodOptions(options: MethodType[]): void {
    this.methodOptions.set(options);
  }
  setRatioOptions(options: RatioIntensity[]): void {
    this.ratioOptions.set(options);
  }
  setFormValue(value: Partial<CoffeCalculatorValue>): void {
    this.form.patchValue({ ...value });
  }
  setResult(value: { water: string; coffee: string; cups: string }): void {
    this.result.set(value);
  }

  protected handleSelectedCoffeeCups(value: string) {
    const amount = Number(value);

    if (amount) {
      this.form.controls['coffeeCups'].setValue(amount);
      this.showCupsAmountInput.set(false);
    } else this.showCupsAmountInput.set(true);
  }

  protected handleAddCups(value: number) {
    const coffeeCups = (this.form.value?.coffeeCups ?? 0) + value;

    this.form.controls['coffeeCups'].setValue(coffeeCups);
  }

  protected handleSelectedIntesity(value: RatioIntensity) {
    const { method } = this.form.value;

    if (method) {
      this.presenter.setIntensityRatio(method, value);
    }
    this.ratioIntensity.set(value);
  }

  get formChanges() {
    return this.form.valueChanges.pipe(map(this.createValue));
  }

  private createValue(values: typeof this.form.value): CoffeCalculatorValue {
    return {
      coffeeAmount: values.coffeeAmount ?? 0,
      coffeeUnit: values.coffeeUnit ?? 'g',
      waterAmount: values.waterAmount ?? 0,
      waterUnit: values.waterUnit ?? 'ml',
      method: values.method ?? 'French Press',
      coffeeCups: values.coffeeCups ?? 1,
      ratio: {
        coffee: values.ratio?.coffee ?? 0,
        water: values.ratio?.water ?? 0,
      },
    };
  }
}

type CoffeCalculatorForm = {
  coffeeAmount: FormControl<number | null>;
  coffeeUnit: FormControl<Unit | null>;
  waterAmount: FormControl<number | null>;
  waterUnit: FormControl<Unit | null>;
  method: FormControl<MethodType | null>;
  coffeeCups: FormControl<number | null>;
  ratio: FormGroup<{
    coffee: FormControl<number | null>;
    water: FormControl<number | null>;
  }>;
};
