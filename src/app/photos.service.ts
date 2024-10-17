import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iPhoto } from './interfaces/iPhoto';
import { catchError, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  apiUrl: string = 'https://jsonplaceholder.typicode.com/photos';
  constructor(private http: HttpClient) {}

  photo$ = new Subject<iPhoto>();
  photoArr: iPhoto[] = [];
  preferiti$ = new Subject<number>();

  getAllPhotos(): Observable<iPhoto[]> {
    return this.http.get<iPhoto[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.log(error);

        return throwError(() => {
          let message = '';
          if (error.status === 404) {
            message = 'Not found';
          } else if (error.status === 500) {
            message = 'Errore nella richiesta';
          } else {
            message = 'così va?';
          }
          return message;
        });
      })
    );
  }
  deletePhoto(photo: iPhoto) {
    this.photo$.next(photo);
    return this.http.get<iPhoto>(`${this.apiUrl}/${photo.id}`);
  }

  addToFav() {
    this.preferiti$.next(1);
  }
}
