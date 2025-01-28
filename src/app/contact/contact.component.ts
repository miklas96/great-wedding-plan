import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Food, WeddingLocation } from '../types';
import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { food, locations } from '../where/data';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {BehaviorSubject} from "rxjs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-contact',
  imports: [CommonModule,  MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  contactForm!: FormGroup;
  options: WeddingLocation[] = locations;
  foodOptions: Food[] = food;
  serviceID = 'service_q8g8vz9';  // Z EmailJS
  templateID = 'wedding_stay';  // Z EmailJS
  publicKey = '5RuZmy2ehfuPkmpdy';
  durationInSeconds = 5;
  sent$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      selectedOption: ['', Validators.required],
      numberOfPeople: [1, [Validators.required, Validators.min(1)]],
      description: [''],
      selectedOptionFood: this.fb.array([this.fb.control('', Validators.required)]),
    });

    // Inicjalizuj FormArray na podstawie domyślnej liczby osób
    this.updateFoodOptionsArray(this.contactForm.get('numberOfPeople')?.value || 1);

    // Nasłuchuj zmiany liczby osób i aktualizuj FormArray
    this.contactForm.get('numberOfPeople')?.valueChanges.subscribe((count) => {
      this.updateFoodOptionsArray(count);
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

  get numberOfPeople() {
    return this.contactForm.get('numberOfPeople');
  }

  get selectedOptionFoodArray(): FormArray<FormControl> {
    return this.contactForm.get('selectedOptionFood') as FormArray<FormControl>;
  }

  updateFoodOptionsArray(count: number): void {
    const foodArray = this.selectedOptionFoodArray;

    if (!count || count < 0) count = 0; // Obsługa przypadków ujemnych lub pustych

    // Dopasuj długość tablicy do liczby osób
    while (foodArray.length !== count) {
      if (foodArray.length < count) {
        foodArray.push(this.fb.control('', Validators.required)); // Dodanie FormControl
      } else {
        foodArray.removeAt(foodArray.length - 1); // Usunięcie nadmiarowego FormControl
      }
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
    });
  }

  public sendEmail() {
    if (this.contactForm.valid) {
      this.sent$.next(true);
      const formData = this.contactForm.value;
      const emailParams = {
        from_name: formData.fullName,
        message: formData.description,
        option: formData.selectedOption,
        foodOption: Array.isArray(formData.selectedOptionFood)
            ? formData.selectedOptionFood.toString()
            : '',
      };

    emailjs
      .send(this.serviceID, this.templateID, emailParams, {publicKey: this.publicKey})
      .then(
        () => {
          this.openSnackBar();
          this.contactForm.reset({
            fullName: '',
            selectedOption: '',
            numberOfPeople: 1,
            description: '',
            selectedOptionFood: [],
          });

          // Resetowanie dynamicznego FormArray
          this.updateFoodOptionsArray(1);

          this.sent$.next(false);
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
  }
}
}
