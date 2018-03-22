import { Component } from '@angular/core';
import { Camera, DestinationType } from '@ionic-native/camera';
import { CameraPreview } from '@ionic-native/camera-preview';
import { ModalController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { PhotosProvider } from '../../providers/photos/photos';
import { PhotoPreviewModalPage } from '../photo-preview-modal/photo-preview-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  width = 1024;
  height = 1024;
  quality = 50;
  plugin = 'native';
  private photos$: Observable<PhotoItem[]>;


  constructor(public navCtrl: NavController,
              private camera: Camera,
              private cameraPreview: CameraPreview,
              private modalCtrl: ModalController,
              private photosSvc: PhotosProvider) {

    this.photos$ = this.photosSvc.getPhotos();
  }

  takePhoto() {
    switch (this.plugin) {
      case 'native':
        this.camera.getPicture({
          destinationType: DestinationType.DATA_URL,
          quality: this.quality,
          targetHeight: this.height,
          targetWidth: this.width
        }).then(
          value => {
            this.photosSvc.addPhoto({
              width: this.width,
              height: this.height,
              data: value,
              plugin: this.plugin,
              quality: this.quality,
              timestamp: new Date()
            });
          }
        );
        break;
      case 'preview':
        const modal = this.modalCtrl.create(PhotoPreviewModalPage, {
          width: this.width,
          height: this.height,
          quality: this.quality
        });
        modal.present();

    }
  }
}

export interface PhotoItem {
  width: number;
  height: number;
  quality: number;
  plugin: string;
  data: string
  timestamp: Date
}
