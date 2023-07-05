import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '@app/services/players.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  public menuStatus: boolean = false;
  public isCollapsed = true;
  public modalRef!: BsModalRef;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}


  ngOnInit(): void {}

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  showLogout(): boolean {
    return this.router.url != '/user/login';
  }

  logout(): void {
    this.modalRef.hide();
    this.playerService.doLogout();
    this.router.navigate(['/user/login']);
    this.toastr.success('Usuário deslogado com sucesso.', 'Success');
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
}
