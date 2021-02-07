import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInput2Component),
    multi: true
};


@Component({
    selector: 'app-custom-input2',
    templateUrl: './custom-input2.component.html',
    styleUrls: ['./custom-input2.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CustomInput2Component implements ControlValueAccessor {

    constructor() {
    }

    // The internal data model
    private innerValue: any = '';

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    // get accessor
    get value(): any {
        return this.innerValue;
    }

    // set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    // Set touched on blur
    onBlur() {
        console.log('onBlur');
        this.onTouchedCallback();
    }

  // From ControlValueAccessor interface
  registerOnChange(fn: any): void {
    console.log('registerOnChange');
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any): void {
    console.log('registerOnTouched');
    this.onTouchedCallback = fn;
  }

  // From ControlValueAccessor interface
  writeValue(value: any): void {
    console.log('writeValue');
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

}
