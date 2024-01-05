import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Usertype } from '../usertype';


@Component({
  selector: 'app-typeuserform',
  templateUrl: './typeuserform.component.html',
  styleUrl: './typeuserform.component.css'
})

export class TypeuserformComponent implements OnInit {
  typeuserForm: FormGroup = this.fb.group({
    id: [''],  
    type_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern(/^[a-zA-Z]+$/)]]
  });

  usersty: Usertype[] = [];

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getTypeUserList();

    if (typeof window !== 'undefined' && window.history.state) {
      const userFormType = window.history.state.userTy;

      if (userFormType) {
        console.log(userFormType);
        this.fillFormWithTypeUserData(userFormType);
      }
    }
  }

  private getTypeUserList() {
    this.userService.getTypeUserList().subscribe(info => {
      this.usersty = info;
    });
  }
  
  private fillFormWithTypeUserData(usertype: Usertype): void {
    console.log(usertype)
    this.typeuserForm.patchValue({
      id: usertype.id,
      type_name: usertype.type_name,
    });
  }

  submitForm(): void {
    if (this.typeuserForm.valid) {
      const formData = this.typeuserForm.value;
      console.log(formData);
      if (formData.id) {
        this.userService.updateUserType(formData.id, formData).subscribe(
          response => {
            if (response && response.status === 200) {
              try {
                const responseData = JSON.parse(response.body);
                console.log(responseData);
              } catch (e) {
                console.log(response.body);
                console.error("Error after analyzing the response:", e);
              }
            } else {
              this.router.navigate(['/typeusertable']);
              console.error("Unexpected response:", response);
            }
          },
          error => {
            console.error("Error during HTTP request:", error);
          }
        );
      } else {
        this.userService.createUserType(formData).subscribe(
          response => {
            if (response.status === 200) {
              try {
                const responseData = JSON.parse(response.body);
                console.log(responseData);
              } catch (e) {
                console.log(response.body);
                console.error("Error after analyzing the response:", e);
              }
            } else {
              console.error("Unexpected status code:", response.status);
            }
          },
          error => {
            this.router.navigate(['/typeusertable']);
            console.error("Error on the HTTP solicitation:", error);
          }
        );
      }
    }
  }
}