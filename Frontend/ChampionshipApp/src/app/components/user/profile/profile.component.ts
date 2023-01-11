import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  editing: boolean = false;

  public formEdit!: FormGroup;

  get f(): any {
    return this.formEdit.controls;
  }

  ngOnInit(): void {
    this.validationEdit();
  }

  public editProfile(): void{
    this.editing = !this.editing;
    this.formEdit.reset();
  }

  public validationEdit(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('Password', 'PasswordConfirm')
    };

    this.formEdit = this.fb.group({
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
