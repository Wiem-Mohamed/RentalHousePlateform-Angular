import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  constructor(private httpclt:HttpClient) { }
  
  registerUser(usr:User):Observable<User> {
    return this.httpclt.post<User>(this.apiUrl +"/users",usr)
  }

  signin(email: string, password: string): Observable<any | null> {
    return this.httpclt.get<any[]>(`${this.apiUrl}/users?email=${email}&password=${password}`)
      .pipe(
        map((users: any[]) => {
          if (users.length > 0) {
            return users[0]; // Return the first user found
          }
          return null; // Return null if no user is found
        })
      );
  }

  userExists(email: string): Observable<boolean> {
    return this.httpclt.get<any[]>(this.apiUrl+"/users")
      .pipe(
        map((res: any[]) => {
          const user = res.find((a: any) => a.email === email);
          return !!user; 
        })
      );
  }
  saveUser(user:User) {
    sessionStorage.setItem("user",JSON.stringify(user))

  }
  logout()  {
    sessionStorage.clear()
  }
  getUserId(): number{
    const userData = sessionStorage.getItem("user");
    
    if (userData) {
      const userObject = JSON.parse(userData) as { id: number };
      
      if (userObject && typeof userObject.id === "number") {
        return userObject.id;
      }
    }
    return -1;
  }
  getUserById(userId: number): Observable<User> { 
    const url = this.apiUrl + '/users/' + userId;
    return this.httpclt.get<User>(url); 
  }
  isConnected() {
    if (sessionStorage.getItem("user"))  {
      return true;
    }
    else  {
      return false
    }
  }
  userConnected():any{
    return sessionStorage.getItem("user");
  }
  updateUser(userId: number, updatedUser: any): Observable<any> {
    const url = this.apiUrl + '/users/' + userId;
    return this.httpclt.put(url, updatedUser);
  }
  deleteUserById(userId: number): Observable<void> {
    const url = this.apiUrl + '/users/' + userId;
    return this.httpclt.delete<void>(url);
  }
  updatePass(userId: number, updatedUser: any): Observable<any> {
    const url = this.apiUrl + '/users/' + userId;
    return this.httpclt.put(url, updatedUser);
  }

}
