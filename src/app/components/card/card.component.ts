import { Component, Input } from '@angular/core';
import { iPhoto } from '../../interfaces/iPhoto';
import { PhotosService } from '../../photos.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() image!: iPhoto;

  constructor(private photosSvc: PhotosService) {}

  delete(image: iPhoto) {
    this.photosSvc.deletePhoto(image);
    this.photosSvc.photoArr = this.photosSvc.photoArr.filter(
      (photo) => photo.id !== image.id
    );
  }
  addToFav() {
    this.photosSvc.addToFav();
  }
}
