import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Authentication } from '../services/authentication';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{

  constructor(
    private authenticationService: Authentication){

    }

  ngOnInit(){
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public onLogOut(): void {
    return this.authenticationService.logout();
  }

}
