import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  IAutocompleteInputOptions,
  IInputOptions,
} from 'ngx-material-autocomplete-force-select/lib/interfaces';
import { ListItemViewModel } from 'ngx-material-autocomplete-force-select/lib/models/list-item-view.model';
import { distinctUntilChanged, Observable } from 'rxjs';
import { TestFormService } from './services/test-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'test-my-package';
  valueOptions = [
    { display: 'Code', code: 'code' },
    { display: 'Id', code: 'id' },
    { display: 'Display', code: 'display' },
    { display: 'The object', code: '' },
  ];
  mainFormGroup: FormGroup;

  constructor(
    protected fb: FormBuilder,
    private testFormService: TestFormService
  ) {}
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    this.mainFormGroup
      .get('valueShouldBe')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((x) => {
        this.mainFormGroup.get('autocompleteforceSelect')?.setValue('');
        this.mainFormGroup
          .get('autocompleteforceSelect')
          ?.updateValueAndValidity();
      });
  }

  ngOnInit(): void {
    this.mainFormGroup = this.fb.group({
      valueShouldBe: [{ value: 'code', disabled: false }, []],
      autocompleteforceSelect: [{ value: '', disabled: false }, []],
    });
  }

  public get getSelectedValue(): any {
    return !!this.mainFormGroup.get('autocompleteforceSelect')?.value
      ? JSON.stringify(this.mainFormGroup.get('autocompleteforceSelect')?.value)
      : '';
  }

  public get getAutocompleteTwoOptions(): IInputOptions {
    return {
      label: 'Auto complete force select',
      requiredMessage: 'Kötelezően kitöltendő!!!',
      labelClasses: this.getLabelClasses,
      inputClasses: this.getInputClasses,
    } as IInputOptions;
  }
  public get getAutocompleteAutoOptions(): IAutocompleteInputOptions {
    return {
      filterMethod: this.autocompleteFilterMethod,
      minLengthForCall: 2,
      valueShouldBe: this.mainFormGroup.get('valueShouldBe')?.value,
    };
  }

  public get getSelectInputOneOptions(): IInputOptions {
    return {
      label: 'Select Input 1',
      requiredMessage: 'Kötelező',
      labelClasses: this.getLabelClasses,
      inputClasses: this.getInputClasses,
    } as IInputOptions;
  }

  autocompleteFilterMethod = (
    partOfText: string
  ): Observable<ListItemViewModel[]> => {
    return this.testFormService.apiAutocompletelistPartOfText(partOfText);
  };
  public get getLabelClasses(): string[] {
    return ['', ''];
  }
  public get getInputClasses(): string[] {
    return ['', ''];
  }
}
