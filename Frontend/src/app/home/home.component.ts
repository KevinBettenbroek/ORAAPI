import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/userModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private authenticationService: AuthenticationService) {
    this.user = authenticationService.currentUserValue;
  }

  ngOnInit(): void {}
}
