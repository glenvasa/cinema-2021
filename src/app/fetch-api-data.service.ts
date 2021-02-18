import { Injectable } from "@angular/core";
import { catchError } from "rxjs/internal/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

/**
 * Declaring the api url that will provide data for the client app
 */
const apiUrl = "https://myflix2020.herokuapp.com/";
@Injectable({
  providedIn: "root",
})
export class UserRegistrationService {
  /**
   * Called upon creating instance of class to make HttpClient available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * api call to the user registration endpoint
   * @param userDetails
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + "users", userDetails)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occured:", error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }
}

@Injectable({
  providedIn: "root",
})
export class UserLoginService {
  /**
   * Called upon creating instance of class to make HttpClient available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * api call to the user login endpoint
   * @param userDetails 
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + "login", userDetails)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occured:", error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something bad happened: please try again later.");
  }
}

@Injectable({
  providedIn: "root",
})
export class GetAllMoviesService {
  /**
   * Called upon creating instance of class to make HttpClient available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   *  api call to get all movies data
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies", {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occured:", error.error.message);
    } else {
      console.error(
        `Error Status Code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something bad happened: please try again later.");
  }
}

@Injectable({
  providedIn: "root",
})
export class GetSingleMovieService {
  /**
   * Called upon creating instance of class to make HttpClient available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * api call to get single movie data
   */
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies/:Title", {
        headers: new HttpHeaders({
          Authorization: "Bearer" + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occured:", error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something bad happened: please try again later.");
  }
}

@Injectable({
  providedIn: "root",
})
export class GetDirectorService {
  /**
   * Called upon creating instance of class to make HttpClient available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}

 
  /**
   *  api call to get director data by name
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies/Directors/:Name", {
        headers: new HttpHeaders({
          Authorization: "Bearer" + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occured:", error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is ${error.error}`
      );
    }
    return throwError("Something bad happened: please try again later");
  }
}

@Injectable({
  providedIn: "root",
})
export class GetGenreService {
  /**
   * Called upon creating instance of class to make HttpClient available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}

  
  /**
   * api call to get genre by movie title
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies/Genre/:Title", {
        headers: new HttpHeaders({
          Authorization: "Bearer" + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occured:", error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is ${error.error}`
      );
    }
    return throwError("Something bad happened: please try again later");
  }
}

@Injectable({
  providedIn: "root",
})
export class GetUserService {
  /**
   * Called upon creating instance of class to make HttpClient available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}

  
  /**
   * api call to get user data by Username
   * @param username 
   */
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occured:", error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something bad happened: please try again later.");
  }
}

@Injectable({
  providedIn: "root",
})
export class GetFavoriteMoviesService {
  /**
   * Called upon creating instance of class to make HttpClient available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}

  
  /**
   * api call to get user's favorite movies
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http
      .get(apiUrl + `users/${username}/Movies`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occured:", error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something bad happened: please try again later.");
  }
}

@Injectable({
  providedIn: "root",
})
export class AddFavoriteMovieService {
  /**
   * Called upon creating instance of class to make HttpClient available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}

  
  /**
   * api call to add a favorite movie
   * @param id 
   */
  addFavoriteMovie(id: string): Observable<any> {
    console.log(id);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    console.log(username);
    console.log(token);
    return this.http
      .post(`${apiUrl}users/${username}/Movies/${id}`, id, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occcured:", error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something bad happened: please try again later.");
  }
}

@Injectable({
  providedIn: "root",
})
export class DeleteFavoriteMovieService {
  /**
   * Called upon creating instance of class to make HttpClient available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}

  
  /**
   * api call to delete a favorite movie
   * @param id 
   */
  deleteFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http
      .delete(apiUrl + `users/${username}/Movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occcured:", error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something bad happened: please try again later.");
  }
}

@Injectable({
  providedIn: "root",
})
export class EditUserService {
  /**
   * Called upon creating instance of class to make HttpClient available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}

  
  /**
   * api call to edit the user's information
   * @param userData 
   */
  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http
      .put(apiUrl + `users/${username}`, userData, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occcured:", error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something bad happened: please try again later.");
  }
}

@Injectable({
  providedIn: "root",
})
export class DeleteUserService {
  /**
   * Called upon creating instance of class to make HttpClient available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}

  
  /**
   * api call to delete user
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .delete(apiUrl + "users/:Username", {
        headers: new HttpHeaders({
          Authorization: "Bearer" + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occcured:", error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something bad happened: please try again later.");
  }
}
