import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { MatDialogRef } from '../../../node_modules/@angular/material';
import { LoginComponent } from '../Components/login/login.component';

export interface User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  exp: number;
  iat: number;
  role: string;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  location: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;
  private dialogRef: MatDialogRef<LoginComponent>;

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  // method to save token in localStorage.
  private saveToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  // method to retrieve token.
  private getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  // logout method.
  public logout() {
    this.token = '';
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }

  // method to parse user details from JWT token.
  public getUser() {
    const token = this.getToken();
    let payLoad;

    if (token) {
      payLoad = token.split('.')[1];
      payLoad = window.atob(payLoad);
      return JSON.parse(payLoad);
    } else {
      return null;
    }
  }

  // check whether the user is logged in
  public isLoggedIn() {
    const user = this.getUser();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  // generalized method to make http requests to server
  private request(method: 'post' | 'get', type: 'login' | 'signup' | 'updateProfile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post' && type === 'login') {
      base = this.httpClient.post('http://localhost:4241/auth/', user);
    } else if (method === 'post' && type === 'signup') {
      base = this.httpClient.post('http://localhost:4241/users/', user);
    } else {
      base = this.httpClient.get('http://localhost:4241/auth/${type}', { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

    const request = base.pipe(map(
      (data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        debugger;
        return data;
      }
    ));
    return request;
  }

  // login method
  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  // signup method
  public signup(user: TokenPayload): Observable<any> {
    return this.request('post', 'signup', user);
  }

  // activation method
  public activate(code) {
    return this.httpClient.get(
      'http://localhost:4241/activate/' + code,
      {
        responseType: 'json'
      }
    );
  }

  // setter method for dialog reference
  public setDialogRef(dialogRef) {
    this.dialogRef = dialogRef;
  }

  // getter method for dialog reference
  public getDialogRef() {
    return this.dialogRef;
  }


}
