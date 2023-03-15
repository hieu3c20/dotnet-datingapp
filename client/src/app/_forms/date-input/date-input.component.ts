import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { Component, Input, Self } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() maxDate: Date;
  bsConfig: Partial<BsDatepickerConfig>

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.bsConfig= {
      containerClass: 'theme-red',
      dateInputFormat: 'DD MMMM YYYY'
    }
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl
  }

  writeValue(obj: any): void {
  
  }
  registerOnChange(fn: any): void {
   
  }
  registerOnTouched(fn: any): void {
   
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }
}
