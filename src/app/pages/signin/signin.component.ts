import { Component, OnInit } from '@angular/core';

import { FormCheckService } from 'src/app/services/form-check.service';
import { Router } from '@angular/router';
import { SignService } from 'src/app/services/sign.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  correct: boolean = false;
  message: string = '';
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(
    private formCheck: FormCheckService,
    private router: Router,
    private signService: SignService
  ) {}

  ngOnInit(): void {}

  onClick(
    event: Event,
    username_email: HTMLInputElement,
    password: HTMLInputElement
  ) {
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
      const res = this.signService.getData().subscribe((res) => {
        const result = res.findIndex((user) =>
          this.username
            ? user.username === this.username && user.password === this.password
            : user.email === this.email && user.password !== this.password
        );
        result === -1
        if(result===-1){
          this.message = 'user does not exist'
        }else{
          this.router.navigate(['/login-success'],{queryParams:{
            name:this.username||this.email
          }});
        }
      });
    } else {
      this.message = 'please fill out the form correctly';
    }
  }
}
