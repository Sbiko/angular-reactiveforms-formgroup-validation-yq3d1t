import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

// validates the address group 
const addressRequired = (control: AbstractControl) => {
  const street = control.get('street');
  const zipcode = control.get('zipCode');

  const values = [
    street.value,
    zipcode.value
  ];

  if(values.every(x => x === '') || values.every(x => x !== '')) {
    return null
  } else {
    return { addressIncomplete: true };
  }
}

@Component({
  selector: 'person-edit',
  template: `
    <h2>Person Editing</h2>
    <form [formGroup]="form">
      <div>
        Firstname: <input type="text" formControlName="firstname" />
      </div>
      <div>
        Surname: <input type="text" formControlName="surname" [required]="require.value == 'required'" />
      </div>
       <select formControlName="require">
      <option value="required">Is Required</option>
      <option value="optional">Not Required</option>
    </select>
    </form>
    <hr />
    <strong>Form value</strong>
    <pre>{{ form.value | json }}</pre>
    <pre>Form valid? {{ form.valid }}</pre>
   
    <p>{{text}}</p>
  `
})
export class PersonEditComponent {
  form;
  text = 'empty';

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      firstname: '',
      surname: '',
      require: ''
    });


    this.form.valueChanges.subscribe((newValue) => {
      if(this.form.get('require').value == 'required') {
       //this.text = 'required';
       // this.form.get('surname').setValidators(Validators.required);
      } else {
        //this.text='not required';
        //this.form.get('surname').setValidators(null);
      }
     //this.form.get('surname').updateValueAndValidity();
      this.text = (!this.form.get('surname').invalid)+'';
    });

  // form = new FormGroup({
  //   firstname: new FormControl(),
  //   surname: new FormControl(),
  //   age: new FormControl(),
  //   address: new FormGroup({
  //     street: new FormControl(),
  //     zipCode: new FormControl()
  //   })
  // });
  }


  get require() {
    return this.form.get('require');
  }
}