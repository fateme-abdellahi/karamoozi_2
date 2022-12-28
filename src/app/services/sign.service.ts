import { HttpClient } from '@angular/common/http';
import { IEmail } from '../interfaces/iemails';
import { IUser } from '../interfaces/iuserInfo';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SignService {
  constructor(private http: HttpClient, private router: Router) {}

  getData() {
    return this.http.get<IUser[]>('http://localhost:3000/info');
  }
  postData(username: string, password: string, email: string) {
    return this.http.post<IEmail>(
      'http://localhost:3000/info',
      JSON.stringify({
        id: Math.floor(Math.random() * 1000000),
        username,
        password,
        email,
      }),
      { headers: { 'content-type': 'application/json' } }
    );
  }
  signup(username: string, password: string, email: string) {
    let userExists: boolean = false;
    let errorMessage = '';
    this.http.get<IUser[]>('http://localhost:3000/info').subscribe({
      next: (res) => {
        if (
          res.findIndex(
            (user) =>
              (email && user.email === email) ||
              (username && user.username === username)
          ) !== -1
        ) {
          userExists = true;
          errorMessage = 'user already exists!';
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        if (!userExists) {
          this.http
            .post<IEmail>(
              'http://localhost:3000/info',
              JSON.stringify({
                id: Math.floor(Math.random() * 1000000),
                username,
                password,
                email,
              }),
              { headers: { 'content-type': 'application/json' } }
            )
            .subscribe(() => {
              this.router.navigate(['/signup-success'], {
                queryParams: {
                  name: username || email,
                },
              });
            });
        }
      },
    });
    return errorMessage;
  }
}
