import { SnackbarComponent } from './../snackbar/snackbar.component';
import { Food, WeddingLocation } from './../types';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { food, locations } from '../where/data';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  imports: [CommonModule,  MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private _snackBar = inject(MatSnackBar);
  contactForm: FormGroup;
  options: WeddingLocation[] = locations;
  foodOptions: Food[] = food;
  serviceID = 'service_q8g8vz9';  // Z EmailJS
  templateID = 'wedding_stay';  // Z EmailJS
  publicKey = '5RuZmy2ehfuPkmpdy';
  durationInSeconds = 5;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      selectedOption: ['', Validators.required],
      selectedOptionFood: ['', Validators.required]
    });
  }

  get fullName() {
    return this.contactForm.get('fullName');
  }

  get description() {
    return this.contactForm.get('description');
  }

  get selectedOption() {
    return this.contactForm.get('selectedOption');
  }
  
  get selectedOptionFood() {
    return this.contactForm.get('selectedOptionFood');
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
    });
  }

  public sendEmail() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      const emailParams = {
        from_name: formData.fullName,
        message: formData.description,
        option: formData.selectedOption,
        foodOption: formData.selectedOptionFood
      };
        
    emailjs
      .send(this.serviceID, this.templateID, emailParams, {publicKey: this.publicKey})
      .then(
        () => {
          this.openSnackBar();
          this.contactForm.reset();
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      ); 
  }
}

}
