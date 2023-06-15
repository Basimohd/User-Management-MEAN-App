import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  submit : boolean = false;
  inCorrect: boolean = false;
  emailUsed!: string;
  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private router:Router){}

  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")]],
    cpassword: ['', [Validators.required]]
  })

  onSubmit(){
    this.submit = true;
    const {username,email,password,cpassword} = this.registerForm.value;
    if(password === cpassword){
      if(username && email && password){
        this.registerUser()
      }
    }else{
      this.inCorrect = true
      setTimeout(() => {
        this.inCorrect = false
      }, 2000)
    }
  }
  registerUser(){
    this.authService.registerUser(this.registerForm.value).subscribe((response)=>{
      if(response.emailUsed){
        this.emailUsed = response.emailUsed
        setTimeout(()=>{
          this.emailUsed = '' 
        },2000)
      }else{
        alert('Registraion Completed!');
        setTimeout(()=>{
          this.router.navigate(['/admin/users'])
        },3000)
      }
    },(error)=>{
      console.log(error)
    })
    
  }
}
