import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fetchUsersAPI } from '../../store/user.action';
import { usersSelectorData } from '../../store/user.selector';
import { Observable } from 'rxjs';
import { User } from '../../store/user';
import { AuthService } from 'src/app/services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  users$!:Observable<User[]>
  constructor(private store:Store,private authService:AuthService,private router:Router){}
  ngOnInit():void {
    this.store.dispatch(fetchUsersAPI())
    this.users$ = this.store.pipe(select(usersSelectorData))
  }
  onDelete(id:any){
    const userDelete = confirm("Are you sure you want to delete the user")
    if(userDelete){
      this.authService.deleteUser(id).subscribe((res)=>{
        if(res.message){
          alert(res.message);
          this.store.dispatch(fetchUsersAPI());
        }
      })
    }
  }
  onEdit(id:any){
    this.authService.setId(id);
    this.router.navigate(['/admin/edit'])
  }
}
