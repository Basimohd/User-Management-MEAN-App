import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3000';

  constructor(private http : HttpClient) { }

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
  uploadProfile(imageFile:object, id:string){
      return this.http.post(`${this.apiUrl}/uploadImage?id=${id}`,imageFile)
  }
}
