import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoPreviewModalPage } from './photo-preview-modal';

@NgModule({
  declarations: [
    PhotoPreviewModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoPreviewModalPage),
  ],
})
export class PhotoPreviewModalPageModule {}
