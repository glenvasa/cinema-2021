import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /**
   * Gets called when creating an instance of the class
   * @param dialog
   */
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * Function that will open a registration dialog when the "register" button is clicked
   * @returns UserRegistrationFormComponent in dialog with inputs for username, password, email, and birthdate
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  /**
   * Function that will open a user dialog when the "login" button is clicked
   * @returns LoginFormComponent in dialog with inputs for username and password
   */
  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '280px',
      height: '350px',
    });
  }
}
