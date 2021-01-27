import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/userModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  apotheker: User = {
    id: 1,
    userType: 'Apotheker',
    username: 'medewerker',
    password: 'goedwachtwoord',
    firstName: 'Jan',
    lastName: 'de Boer',
    authdata: '',
  };

  medewerker: User = {
    id: 2,
    userType: 'Medewerker',
    username: 'medewerker',
    password: 'goedwachtwoord',
    firstName: 'Pieter',
    lastName: 'Klaasen',
    authdata: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}

  login(user: User) {
    this.authenticationService.login(user);
    this.router.navigate(['/']);
  }
}
