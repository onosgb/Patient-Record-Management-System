import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  userLogin(user: any): Observable<any> {
  return this.http.post(this.url + 'auth', user);
  }
}
