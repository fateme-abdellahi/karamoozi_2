import { Component, OnInit } from '@angular/core';

import { FormCheckService } from 'src/app/services/form-check.service';
import { Router } from '@angular/router';
import { SignService } from 'src/app/services/sign.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  correct: boolean = false;
  message: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  constructor(
    private formCheck: FormCheckService,
    private signService: SignService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onClick(
    event: Event,
    username_email: HTMLInputElement,
    password: HTMLInputElement
  ): void {
    event.preventDefault();

    if (this.formCheck.checkEmail(username_email.value)) {
      this.username = '';
      this.email = username_email.value;
      this.password = password.value;
      this.correct = this.formCheck.checkPassword(this.password);
    } else if (
      (this.correct = this.formCheck.checkUsername(username_email.value))
    ) {
      this.username = username_email.value;
      this.email = '';
      this.password = password.value;
      this.correct = this.formCheck.checkPassword(this.password);
    } else {
      this.correct = false;
    }
    if (this.correct) {
      let userExists: boolean = false;

      this.signService.getData().subscribe({
        next: (res) => {
          if (
            res.findIndex(
              (user) =>
                (this.email && user.email === this.email) ||
                (this.username && user.username === this.username)
            ) !== -1
          ) {
            userExists = true;
            this.message = 'user already exists';
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          if (!userExists) {
            this.signService
              .postData(this.username, this.password, this.email)
              .subscribe(() => {
                this.router.navigate(['/signup-success'], {
                  queryParams: {
                    name: this.username || this.email,
                  },
                });
              });
          }
        },
      });
    } else {
      this.message = 'please fill out the form correctly';
    }
  }
}
