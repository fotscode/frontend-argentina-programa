import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenResponse } from '../interface/token-response';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = environment.baseApiUrl + '/api'
  constructor(private http:HttpClient, private router:Router) { }

  logIn(user: User) {
    return this.http.post<TokenResponse>(this.URL + '/login', user)
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('access_token')
  }

  logOut() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    this.router.navigate(['/'])
  }

  getToken() {
    return localStorage.getItem('access_token')
  }
}
