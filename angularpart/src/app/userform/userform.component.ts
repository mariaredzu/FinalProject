import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { Usertype } from '../usertype';


@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})

export class UserFormComponent implements OnInit {
  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern(/^[a-zA-Z]+$/)]],
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern(/^[a-zA-Z]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    usertype: [null, Validators.required]
  });

  usersty: Usertype[] = [];

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.main();
  }

  private getTypeUserList() {
    this.userService.getTypeUserList().subscribe(info => {
      this.usersty = info;
      console.log(info)
    });
  }

  async main() {
    await this.firstPartCode();

    if (typeof window !== 'undefined' && window.history.state) {
      const userFormType = window.history.state.user;
      if (userFormType) {
        console.log(userFormType);
        this.fillFormWithUserData(userFormType);
      }
    }
  }

  private async firstPartCode() {
    this.getTypeUserList();
    await this.SimulatedAsyncOperation();
  }

  private async SimulatedAsyncOperation() {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        console.log('Operation completed');
        resolve();
      }, 30);
    });
  }

  private fillFormWithUserData(user: User): void {
    this.userForm.patchValue({
      name: user.name,
      firstName: user.firstName,
      email: user.email,
      usertype: this.findUsertypeById(user.usertype.id)
    });
  }

  private findUsertypeById(usertypeId: number): Usertype | null {
    return this.usersty.find(ut => ut.id === usertypeId) || null;
  }

  submitForm(): void {     
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      if (typeof window !== 'undefined' && window.history.state) {
        const userFromState = window.history.state.user;
        if (userFromState && userFromState.id) {
          this.updateUser(userFromState.id, formData);
        } else {
          this.createUser(formData);
        }
      }
    }
  }

  private updateUser(userId: number, formData: any): void {
    this.userService.updateUser(userId, formData).subscribe(
      () => {
        console.log("User updated successfully");
        this.router.navigate(['/usertable']);
      },
      error => {
        console.error("Error during HTTP request:", error);
      }
    );
  }

  private createUser(formData: any): void {
    this.userService.createUser(formData).subscribe(
      response => {
        console.log("Response from createUser:", response);
        if (response && response.includes("User created successfully")) {
          console.log("User created successfully");
        } else {
          console.error("Unexpected response:", response);
        }
      },
      error => {
        this.router.navigate(['/usertable']);
        console.error("Error on the HTTP request:", error);
      }
    );
  }
}