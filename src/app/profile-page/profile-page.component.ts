import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import {
  GetUserService,
  EditUserService,
  GetFavoriteMoviesService,
  DeleteFavoriteMovieService,
  GetAllMoviesService,
  DeleteUserService,
} from "../fetch-api-data.service";
import { MovieDirectorComponent } from "../movie-director/movie-director.component";
import { MovieGenreComponent } from "../movie-genre/movie-genre.component";
import { MovieSynopsisComponent } from "../movie-synopsis/movie-synopsis.component";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent implements OnInit {
  @Input() userData = { Username: "", Password: "", Email: "", Birthdate: "" };

  /**
   * declaration of variables used in functions below
   */
  movies: any[] = [];
  favoriteMovies: any[] = [];
  favoriteMovieIDs: any[] = [];

  /**
   * Called when creating instance of class
   * @param fetchApiData
   * @param fetchApiDataAllMovies
   * @param fetchApiDataUser
   * @param fetchApiDataFavMovies
   * @param fetchApiDataDeleteMovie
   * @param fetchApiDataDeleteUser
   * @param dialog
   * @param snackBar
   */
  constructor(
    public fetchApiData: EditUserService,
    public fetchApiDataAllMovies: GetAllMoviesService,
    public fetchApiDataUser: GetUserService,
    public fetchApiDataFavMovies: GetFavoriteMoviesService,
    public fetchApiDataDeleteMovie: DeleteFavoriteMovieService,
    public fetchApiDataDeleteUser: DeleteUserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    /**
     * called upon page load
     * initially retrieves username from localstorage, requests user object from database to 
     * query users' FavoriteMovies array. If empty array, message indicating "no favorites"
     * will display; If the array contains any movieIds, they are set to this.favoriteMovieIDs. 
     * Then all movies in database are retrieved and those movies that have ids matching this.favoriteMovieIDs 
     * are displayed
     */
    this.getFavoriteMovies();
  }

  /**
   *checks user object to see if any favorite movie ids exist
   *@returns this.favoriteMovieIDs
   */
  getFavoriteMovies(): void {
    const user = localStorage.getItem("user");
    console.log(user);

    this.fetchApiDataUser.getUser(user).subscribe((resp: any) => {
      this.favoriteMovieIDs = resp.FavoriteMovies;
      if (this.favoriteMovieIDs.length === 0) {
        let noFavorites = document.querySelector(".no_favorites");
        noFavorites.innerHTML = `<h3>You haven't chosen any favorite movies yet!</h3>`;
      }

      return this.favoriteMovieIDs;
    });
    setTimeout(() => {
      this.getMovies();
    }, 100);
  }

  /**
   * retrieves all movies from database and checks each to see if the id matches id of movie
   * in this.favoriteMovieIDs. If it does it pushes to new favoriteMovies array
   * @returns this.favoriteMovies
   */
  getMovies(): void {
    this.fetchApiDataAllMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie) => {
        if (this.favoriteMovieIDs.includes(movie._id))
          this.favoriteMovies.push(movie);
      });
      return this.favoriteMovies;
    });
  }

  /**
   * function removes a movie from user's favorite movies list in database and from the DOM and
   * then calls this.checkNoFavorites()
   * @param id 
   * @param i 
   */
  deleteFavoriteMovie(id: string, i: number): void {
    this.fetchApiDataDeleteMovie
      .deleteFavoriteMovie(id)
      .subscribe((resp: any) => {
        let cards = document.querySelectorAll(".card");
        let tempCards = Array.from(cards);
        tempCards[i].classList.remove("active");
        tempCards[i].classList.add("delete");
        this.checkNoFavorites();
      });
  }

  /**
   * called after a movie is deleted. Each time a movie is deleted through deleteFavoriteMovie(),
   * the movie card (div class "card active") has class "active" removed. If the ".container" div holding
   * movie cards has no children with class "active", then there aren't any favovites selected and
   * a message appears to inform user of same
   */
  checkNoFavorites() {
    let container = document.querySelector(".movie_container");
    let noFavorites = document.querySelector(".no_favorites");
    if (container.querySelectorAll(".active").length < 1)
      noFavorites.innerHTML = `<h3>You haven't chosen any favorite movies yet!</h3>`;
  }

  /**
   * function allows user to edit profile information
   */
  editUserData(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result) => {
        console.log(result);
        this.snackBar.open("Your profile was successfully updated!", "OK", {
          duration: 3000,
          verticalPosition: "top",
        });
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, "OK", {
          duration: 5000,
        });
      }
    );
  }

  /**
   * dialog is modal displaying movie synopsis and movie poster image
   * @param synopsis 
   * @param image 
   */
  openSynopsisDialog(synopsis: string, image: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { synopsis, image },
      width: "600px",
      height: "530px",
    });
  }

  /**
   * dialog is modal displaying movie genre name, description, and genre image
   * @param name 
   * @param description 
   * @param image 
   */
  openGenreDialog(name: string, description: string, image: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description, image },
      width: "580px",
      height: "480px",
    });
  }

  /**
   * dialog is modal displaying movie director's name, bio, year of birth, year of death (or n/a if alive), 
   * and a gemeric director image 
   * @param name 
   * @param bio 
   * @param birth 
   * @param death 
   * @param image 
   */
  openDirectorDialog(
    name: string,
    bio: string,
    birth: string,
    death: string,
    image: string
  ): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth, death, image },
      width: "600px",
      height: "620px",
    });
  }
}
