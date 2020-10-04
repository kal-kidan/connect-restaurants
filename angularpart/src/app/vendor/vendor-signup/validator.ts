import {AbstractControl} from '@angular/forms';
export function passwordValidator (control: AbstractControl) {
              if (control.get('password').pristine || control.get('confirmpassword').pristine) {
                        return null;
              }
              else {
                return control.get('password').value !== control.get('confirmpassword').value? {'notMatch':true}: null;
              }
}
