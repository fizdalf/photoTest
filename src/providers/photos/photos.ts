import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { PhotoItem } from '../../pages/home/home';

/*
  Generated class for the PhotosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhotosProvider {
  private photos: PhotoItem[] = [];

  photosSubject: ReplaySubject<PhotoItem[]> = new ReplaySubject<PhotoItem[]>(1);

  constructor(public http: HttpClient) {
    this.photosSubject.next(this.photos);
  }

  getPhotos() {
    return this.photosSubject.asObservable();
  }

  addPhoto(photo: PhotoItem) {
    this.photos.push(photo);
    this.photosSubject.next(this.photos);
  }

  removePhoto(idx: number) {
    this.photos = this.photos.filter((value, index) => index != idx);
    this.photosSubject.next(this.photos);
  }

  uploadPhotos() {
    return forkJoin(this.photos.map(photoItem => {
      return this.http.post('http://hub.brightonandhoveinventories.com/API/v1.0/photoTestUpload', photoItem);
    }));
  }
}
