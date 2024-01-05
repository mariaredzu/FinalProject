import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { Usertype } from './usertype';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private httpClient: HttpClient) {}

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`);
  }

  createUser(userData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/createus`, userData);
  }

  removeUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/removeus/${userId}`;
    return this.httpClient.delete(url);
  }

  updateUser(userId: number, userData: User): Observable<any> {
    const url = `${this.apiUrl}/updateus/${userId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.put(url, userData, httpOptions);
  }

  getTypeUserList(): Observable<Usertype[]> {
    return this.httpClient.get<Usertype[]>(`${this.apiUrl}/typeusers`);
  }

  createUserType(userData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/createty`, userData);
  }

  removeUserType(userId: number): Observable<any> {
    const url = `${this.apiUrl}/removety/${userId}`;
    return this.httpClient.delete(url);
  }

  updateUserType(userId: number, userData: Usertype): Observable<any> {
    const url = `${this.apiUrl}/updatety/${userId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.put(url, userData, httpOptions);
  }
}