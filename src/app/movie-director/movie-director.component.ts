import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-movie-director",
  templateUrl: "./movie-director.component.html",
  styleUrls: ["./movie-director.component.scss"],
})
export class MovieDirectorComponent {
   /**
   * called upon creating instance of class
   * injects director name, bio, birth, death, and image data into class \
   * from movie-card component
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
      birth: string;
      death: string;
      image: string;
    }
  ) {}
}
