import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { Usertype } from '../usertype';

@Component({
  selector: 'app-typeusertable',
  templateUrl: './typeusertable.component.html',
  styleUrls: ['./typeusertable.component.css']
})

export class TypeusertableComponent implements OnInit {
  usersty: Usertype[] = [];
  users: User[] = [];
  sortDirection: 'asc' | 'desc' | '' = '';
  sortColumnName: string = '';
  modalRef: BsModalRef;
  @ViewChild('myModal') myModal!: TemplateRef<any>;

  constructor(private userService: UserService, private router: Router, private modalService: BsModalService) {
    this.modalRef = {} as BsModalRef;
  }

  ngOnInit(): void {
    this.getTypeUserList();
    this.getUsers();
  }

  private getTypeUserList() {
    this.userService.getTypeUserList().subscribe(info => {
      this.usersty = this.getSortedUsers(info);
      if (this.usersty.length === 0) {
        const defaultUserType = new Usertype(0, '');
        this.usersty.push(defaultUserType);
      }
    });
  }

  private getUsers() {
    this.userService.getUserList().subscribe(info => {
      this.users = info;
    });
  }

  sortColumn(columnName: string) {
    if (columnName === this.sortColumnName) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortDirection = 'asc';
      this.sortColumnName = columnName;
    }
    this.getTypeUserList();
  }

  private getSortedUsers(users: Usertype[]): Usertype[] {
    if (!this.sortColumnName || this.sortDirection === '') {
      return users;
    }

    return users.sort((a, b) => {
      const valueA = this.getSortableValue(a, this.sortColumnName);
      const valueB = this.getSortableValue(b, this.sortColumnName);

      return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
  }

  private getSortableValue(user: Usertype, columnName: string): string {
    if (columnName === 'id') {
      return user.id.toString();
    } else if (columnName === 'type_name') {
      return user.type_name;
    }

    return '';
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  typeBeingUsed (UserType: Usertype): Boolean {
    var remove = true;
    if(this.users.length !== 0) {
      for (let i = 0; i < this.users.length; i++) {
        if(this.users[i].usertype.id===UserType.id){
          remove = false;
        }
      }
    }
    return remove;
  }

  removeUserType(UserType: Usertype): void {
    if (this.typeBeingUsed(UserType)) {
      this.userService.removeUserType(UserType.id)
      .subscribe(
        response => {
          console.log(response);
          this.getTypeUserList();
        },
        error => {
          console.error("Error deleting user type:", error);
        }
      );
    } else {
      this.openModal(this.myModal);
    }
  }

  editUserType(userTy: Usertype): void {
    this.router.navigate(['/typeuserform'], { state: { userTy } });
  }
}
