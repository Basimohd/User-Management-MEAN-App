import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router,
    private store:Store){}
  logout(){
    localStorage.removeItem('userToken')
    localStorage.removeItem('userId')
    this.router.navigate(['/login'])
    console.log(localStorage)
  }
}
