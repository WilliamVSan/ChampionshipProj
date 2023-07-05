import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { Player } from '@app/models/Players';
import { PlayerService } from '@app/services/players.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  public formRegister!: FormGroup;
  public formLogin!: FormGroup;

  get f(): any {
    return this.formRegister.controls;
  }

  public ngOnInit(): void {
    this.validationRegister();
    this.validationLogin();
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
      validators: ValidatorField.MustMatch('Password', 'PasswordConfirm'),
    };

    this.formRegister = this.fb.group(
      {
        PlayerName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16),
          ],
        ],
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(6)]],
        PasswordConfirm: ['', Validators.required],
        ImageURL: [''],
      },
      formOptions
    );
  }
  public validationLogin(): void {
    this.formLogin = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
    });
  }

  public login() {
    this.playerService.login(this.formLogin.value);
  }

  public registerUser() {
    this.playerService.signUp(this.formRegister.value).subscribe({
      next: (response) => {
        if (response) {
          this.toastr.success('Usuário registrado com sucesso.', 'Success');
          setTimeout(() => {window.location.reload()}, 2700);
        }
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('Houve um erro ao registrar o usuário.', 'Error');
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }
}
