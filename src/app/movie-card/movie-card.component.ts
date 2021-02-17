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
  movies: any[] = [];

  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiData2: AddFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      // console.log(resp);
      this.movies = resp;

      // console.log(this.movies);
      return this.movies;
    });
  }

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

  openSynopsisDialog(synopsis: string, image: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { synopsis, image },
      width: '600px',
      height: '530px',
    });
  }

  openGenreDialog(name: string, description: string, image: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description, image },
      width: '580px',
      height: '480px',
    });
  }

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
