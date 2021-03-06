import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectForm: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      // control names are passed as strings to prevent potential name mangling during minification
      'projectName': new FormControl(null, Validators.required, this.makeForbiddenValuesAsyncValidator(['Test'])),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  makeForbiddenValuesValidator(disallowedValues: string[]): (control: FormControl) => (ValidationErrors | null) {
    const forbiddenValuesValidator = function (control: FormControl): ValidationErrors | null {
      if (disallowedValues.includes(control.value)) {
        return {'valueIsForbidden': true};
      } else {
        return null;
      }
    };
    return forbiddenValuesValidator;
  }

  makeForbiddenValuesAsyncValidator(disallowedValues: string[]):
    (control: FormControl) => (Promise<ValidationErrors | null> | Observable<ValidationErrors | null>) {
    const forbiddenValuesAsyncValidator = function (control: FormControl):
      Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (disallowedValues.includes(control.value)) {
            resolve({'valueIsForbidden': true});
          } else {
            resolve(null);
          }
        }, 2000);
      });
    };
    return forbiddenValuesAsyncValidator;
  }
}
