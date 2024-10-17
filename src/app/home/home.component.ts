import { Component } from '@angular/core';
import { PhotosService } from '../photos.service';
import { iPhoto } from '../interfaces/iPhoto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  photoArr!: iPhoto[];
  favoriti: number = 0;
  errMessage: string = '';

  constructor(private photosSvc: PhotosService) {}

  ngOnInit() {
    this.photosSvc.getAllPhotos().subscribe({
      next: (photos) => {
        this.photoArr = photos.splice(0, 100);
        this.photosSvc.photoArr = this.photoArr;
      },
      error: (errormessage) => {
        this.errMessage = errormessage;
        console.log('Errore del componente', errormessage);
      },
    });
    this.photosSvc.photo$.subscribe((photo) => {
      this.photoArr = this.photoArr.filter((p) => p.id !== photo.id);
    });
    this.photosSvc.preferiti$.subscribe((n) => {
      this.favoriti += n;
    });
  }
  log() {
    console.log(this.photoArr);
    console.log(this.photosSvc.photoArr);
  }
}
