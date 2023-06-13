import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { profileSelectorData } from '../../store/user.selector';
import { Observable } from 'rxjs';
import { Profile } from '../../store/user';
import { fetchUserProfileAPI } from '../../store/user.action';
import { faAdd, faPencil } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  faEdit = faAdd;
  isImage: boolean = false;
  Profile!: any;
  profileData!: any;
  profile$!: Observable<Profile>

  constructor(private store: Store,
    private authService:AuthService) { }

  ngOnInit():void {
    this.store.dispatch(fetchUserProfileAPI())
    this.profile$ = this.store.pipe(select(profileSelectorData))
    this.profile$.subscribe((data) => {
      if(data.image){
        this.isImage = true
      }
    })
  }

  onFileSelected(e:any){
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file, file.name);
    const userId = localStorage.getItem('userId');
    this.authService.
  }
}
