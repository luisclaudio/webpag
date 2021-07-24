import { Directive, Input} from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[appConfirmPasswordValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmPasswordValidatorDirective,
        multi: true
    }]
})
export class ConfirmPasswordValidatorDirective implements Validator {

    @Input() inputName: string = '';

    constructor() {}

    validate(control: AbstractControl): { [key: string]: any } | null {
        const controlToCompare = control!.parent!.get(this.inputName);
        if (controlToCompare) {
            // Observa o campo a comparar para atualizar possíveis mudanças.
            const sub: Subscription = controlToCompare.valueChanges
                .subscribe(
                    () => {
                        control.updateValueAndValidity();
                        sub.unsubscribe();
                });
        }
        if (controlToCompare && controlToCompare.value !== control.value) {
            return  { 'differentPasswords': true };
        } else {
            return null;
        }
    }

}
