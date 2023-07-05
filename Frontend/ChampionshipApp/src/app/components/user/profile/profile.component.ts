import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { Player } from '@app/models/Players';
import { PlayerService } from '@app/services/players.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: any = {};
  constructor(
    private fb: FormBuilder,
    public playerService: PlayerService,
    private actRoute: ActivatedRoute
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id').toString();
    this.playerService.getPlayerById(id).subscribe((res) => {
      this.currentUser = res;
    });
  }

  public editing: boolean = false;

  public formEdit!: FormGroup;

  // private isEditable: boolean = false;

  get f(): any {
    return this.formEdit.controls;
  }

  ngOnInit(): void {
    this.validationEdit();
  }

  // private editButton(): void {
  //   if(this.currentUser.token == this.actRoute.snapshot.paramMap.get('id').toString()){

  //   }
  // }

  public editProfile(): void {
    this.editing = !this.editing;
    if(this.editing){

    }
    this.formEdit.reset();
  }

  public validationEdit(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('Password', 'PasswordConfirm'),
    };

    this.formEdit = this.fb.group(
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
        ImageURL: ['']
      },
      formOptions
    );
  }

  public onSubmit(){
    const updatedPlayer = this.formEdit.value;
    let id = this.actRoute.snapshot.paramMap.get('id').toString();
    this.playerService.updatePlayer(updatedPlayer).subscribe();
  }

}
