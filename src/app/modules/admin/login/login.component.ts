import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submit:boolean = false
  passMessage!:string;
  emailMessage!:string;
  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router){}
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")]]
  })
  onSubmit(){
    this.submit = true
    if(this.loginForm.value.email){
      this.loginUser()
    }
  }
  loginUser(){
    this.authService.loginAdmin(this.loginForm.value).subscribe((response)=>{
      console.log(response)
      if(response.emailMatch){
        this.emailMessage = response.emailMatch
      }else if(response.passMatch){
        this.passMessage = response.passMatch
      }else{
        localStorage.setItem('adminToken',response.userToken);
        this.router.navigate(['/admin/users']);
      }
      setTimeout(()=>{
        this.passMessage = "" 
        this.emailMessage = "" ;
      },2000)
    }, (error) => {
      console.log(error)
    })
  }
}
