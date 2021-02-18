import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-movie-synopsis",
  templateUrl: "./movie-synopsis.component.html",
  styleUrls: ["./movie-synopsis.component.scss"],
})
export class MovieSynopsisComponent {
  /**
   * called upon creating instance of class
   * injects synopsis and movie poster image data into class from movie-card component
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      synopsis: string;
      image: string;
    }
  ) {}
}
