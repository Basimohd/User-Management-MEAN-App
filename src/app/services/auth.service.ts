import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../modules/store/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3000';
  id!:string;
  constructor(private http : HttpClient) { }

  setId(id: string) {
    this.id = id;
  }

  registerUser(userData: any):Observable<any> {
    return this.http.post(`${this.apiUrl}/register`,userData)
  }
  loginUser(userData:any):Observable<any> {
    return this.http.post(`${this.apiUrl}/login`,userData);
  }
  fetchUserProfile(userId:string | null):Observable<any> {
    console.log(`Fetching user profile`)
    return this.http.get(`${this.apiUrl}/profile?id=${userId}`)
  }
  uploadProfile(imageFile:object, id:string | null){
      return this.http.post(`${this.apiUrl}/uploadImage?id=${id}`,imageFile)
  }
  deleteProfile(id:string | null){
    return this.http.delete(`${this.apiUrl}/deleteImage?id=${id}`)
  }
  loginAdmin(userData:any):Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/login`,userData);
  }
  fetchAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/admin/users`);
  }
  deleteUser(id:any):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/admin/deleteUser?id=${id}`);
  }
  updateUser(userData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/admin/update`, userData)
  }
}
