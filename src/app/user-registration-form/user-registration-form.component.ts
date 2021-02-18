import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { UserRegistrationService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-user-registration-form",
  templateUrl: "./user-registration-form.component.html",
  styleUrls: ["./user-registration-form.component.scss"],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: "", Password: "", Email: "", Birthdate: "" };

  /**
   * Gets called when creating an instance of the class
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Function responsible for sending the form inputs to the backend to create a new user
   * @retuns an alert to user indicating registration was successful or an error occurred
   */
  registerUser(Username: string): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        this.dialogRef.close(); // This will close the modal on success
        console.log(result);
        this.snackBar.open(`${Username} has successfully registered`, "OK", {
          duration: 2000,
          verticalPosition: "top",
        });
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, "OK", {
          duration: 2000,
        });
      }
    );
  }
}
