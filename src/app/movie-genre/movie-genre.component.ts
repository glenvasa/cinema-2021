import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-movie-genre",
  templateUrl: "./movie-genre.component.html",
  styleUrls: ["./movie-genre.component.scss"],
})
export class MovieGenreComponent {
   /**
   * called upon creating instance of class
   * injects genre name, description, and image data into class from movie-card component
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      description: string;
      image: string;
    }
  ) {}
}
