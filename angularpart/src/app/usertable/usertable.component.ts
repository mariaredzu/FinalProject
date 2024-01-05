import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Usertype } from '../usertype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrl: './usertable.component.css'
})
export class UsertableComponent implements OnInit {

  users: User[] = [];
  sortDirection: 'asc' | 'desc' | '' = '';
  sortColumnName: string = '';

  constructor(private userService: UserService, private router: Router) {}

  reloadPage(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUserList().subscribe(info => {
      this.users = this.getSortedUsers(info);
      if (this.users.length === 0) {
        const defaultUser = new User(0, '', '', '', new Usertype(0, ''));
        this.users.push(defaultUser);
      }
    });
  }

  sortColumn(columnName: string) {
    if (columnName === this.sortColumnName) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortDirection = 'asc';
      this.sortColumnName = columnName;
    }
    this.getUsers();
  }

  private getSortedUsers(users: User[]): User[] {
    if (!this.sortColumnName || this.sortDirection === '') {
      return users;
    }

    return users.sort((a, b) => {
      const valueA = this.getSortableValue(a, this.sortColumnName);
      const valueB = this.getSortableValue(b, this.sortColumnName);

      return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
  }

  private getSortableValue(user: User, columnName: string): string {
    if (columnName === 'type_name') {
      return user.usertype.type_name;
    } else if (columnName === 'name') {
      return user.name;
    } else if (columnName === 'firstName') {
      return user.firstName;
    } else if (columnName === 'email') {
      return user.email;
    }

    return '';
  }

  removeUser(userId: number): void {
    this.userService.removeUser(userId)
    .subscribe(
      response => {
        this.getUsers();
      },
      error => {
        console.error("Error deleting user:", error);
      }
    );
  }

  editUser(user: User): void {
    this.router.navigate(['/userform'], { state: { user } });
  }
}