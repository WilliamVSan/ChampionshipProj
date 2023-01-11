import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  public formRegister!: FormGroup;

  get f(): any {
    return this.formRegister.controls;
  }

  ngOnInit(): void {
    this.validationRegister();
  }

  registerForm() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton?.addEventListener('click', () => {
      container?.classList.add('right-panel-active');
    });

    signInButton?.addEventListener('click', () => {
      container?.classList.remove('right-panel-active');
    });
  }

  public validationRegister(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('Password', 'PasswordConfirm')
    };

    this.formRegister = this.fb.group({
      PlayerName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
        ],
      ],
      Email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      PasswordConfirm: ['', Validators.required],
      ImageURL: [''],
    }, formOptions);
  }
}
