import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials, User } from '../models/user';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/users`, {
      responseType: 'json',
    });
  }

  getUser(userId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/users/${userId}`, {
      responseType: 'json',
    });
  }

  update(user: User) {
    return this.http.put<User>(
      `${environment.apiUrl}/api/users/${user._id}`,
      user
    );
  }
}
