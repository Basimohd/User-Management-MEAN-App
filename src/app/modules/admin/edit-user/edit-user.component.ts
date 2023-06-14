import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { profileSelectorData, usersSelectorData } from '../../store/user.selector';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  id!:string;
  name!: string;
  email!: string;
  submit:boolean = false;
  emailUsed!:string;

  constructor(private store:Store,private authService:AuthService,private fb: FormBuilder,private router:Router){}
  
  ngOnInit(): void {
    this.id = this.authService.id;
    this.store.pipe(select(usersSelectorData)).subscribe((data)=>{
      const values = data.filter((obj)=>obj._id == this.id)
      this.name = values[0].name;
      this.email = values[0].email;
    })
  }

  editForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
  })
  
  onSubmit(){
    this.submit = true
    const { name, email } = this.editForm.value
    if (name && email) {
      const sure = confirm("Are you sure! ")
      if (sure) {
        this.updateUser()
      }
    }
  }
  updateUser(): void {
    this.authService.updateUser(this.editForm.value).subscribe(
      (response) => {
        if (response.emailUsed) {
          this.emailUsed = response.emailUsed
          setTimeout(() => {
            this.emailUsed = ''
          }, 2000)
        } else {
          this.router.navigate(['/admin/users'])
          alert(response.message);
        }
      }, (error) => {
        console.log(error)
      })
  }
}
