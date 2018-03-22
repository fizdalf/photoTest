import { Component, ViewChild } from '@angular/core';
import { CameraPreview } from '@ionic-native/camera-preview';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PhotosProvider } from '../../providers/photos/photos';

/**
 * Generated class for the PhotoPreviewModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo-preview-modal',
  templateUrl: 'photo-preview-modal.html',
})
export class PhotoPreviewModalPage {

  width;
  height;
  quality;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cameraPreview: CameraPreview,
              private photosSvc: PhotosProvider,
              private viewCtrl: ViewController) {
    this.width = this.navParams.get('width');
    this.height = this.navParams.get('height');
    this.quality = this.navParams.get('quality');
  }

  @ViewChild('preview') photoPreview;

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoPreviewModalPage');

    const rect = this.photoPreview.nativeElement.getBoundingClientRect();
    const options = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      camera: 'back',
      tapPhoto: false
    };

    this.cameraPreview.startCamera(options);

  }

  takePhoto() {
    this.cameraPreview.takePicture({ height: this.height, width: this.width, quality: this.quality })
      .then(photo => {
        this.photosSvc.addPhoto({
          width: this.width,
          height: this.height,
          quality: this.quality,
          data: photo,
          plugin: 'preview',
          timestamp: new Date()
        });
        this.viewCtrl.dismiss();
        this.cameraPreview.stopCamera();
      });

  }

}
