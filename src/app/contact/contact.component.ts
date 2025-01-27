import { WeddingLocation } from './../types';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { locations } from '../where/data';

@Component({
  selector: 'app-contact',
  imports: [CommonModule,  MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  contactForm: FormGroup;
  options: WeddingLocation[] = locations;
  serviceID = 'service_q8g8vz9';  // Z EmailJS
  templateID = 'wedding_stay';  // Z EmailJS
  publicKey = '5RuZmy2ehfuPkmpdy';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      selectedOption: ['', Validators.required],
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

  public sendEmail() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      const emailParams = {
        from_name: formData.fullName,
        message: formData.description,
        option: formData.selectedOption,
      };

    emailjs
      .send(this.serviceID, this.templateID, emailParams, {publicKey: this.publicKey})
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
  }
}

}
