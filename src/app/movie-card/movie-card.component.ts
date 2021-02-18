import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  AddFavoriteMovieService,
  GetAllMoviesService,
} from '../fetch-api-data.service';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /**
   * movies array to be set after getMovies() call
   */
  movies: any[] = [];

  /**
   * Called upon creating instance of class
   * @param fetchApiData 
   * @param fetchApiData2 
   * @param dialog 
   * @param snackBar 
   */
  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiData2: AddFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    /**
     * call on page load to retrieve all movies from database
     */
    this.getMovies();
  }

  /**
   * retrieves all movies from database
   * @returns this.movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * function adds a movie to user's FavoriteMovies array
   * @param id 
   * @param title 
   */
  addToFavorites(id: string, title: string) {
    this.fetchApiData2.addFavoriteMovie(id).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `"${title}" added to your Favorite Movies List`,
        'OK',
        {
          duration: 1500,
          verticalPosition: 'top',
        }
      );
    });
  }

  /**
   * dialog displays a modal containing movie synopsis and poster image
   * @param synopsis 
   * @param image 
   */
  openSynopsisDialog(synopsis: string, image: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { synopsis, image },
      width: '600px',
      height: '530px',
    });
  }

  /**
   * dialog diplays modal of movie genre name, description and generic genre image
   * @param name 
   * @param description 
   * @param image 
   */
  openGenreDialog(name: string, description: string, image: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description, image },
      width: '580px',
      height: '480px',
    });
  }

  /**
   * dialog displays movie director name, bio, year of birth, year of death (or n/a if alive), 
   * and generic director image
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
      width: '600px',
      height: '620px',
    });
  }
}
