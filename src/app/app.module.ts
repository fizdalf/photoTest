import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { CameraPreview } from '@ionic-native/camera-preview';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { PhotoPreviewModalPage } from '../pages/photo-preview-modal/photo-preview-modal';
import { PhotoPreviewModalPageModule } from '../pages/photo-preview-modal/photo-preview-modal.module';
import { PhotosProvider } from '../providers/photos/photos';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    PhotoPreviewModalPageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PhotoPreviewModalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    CameraPreview,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PhotosProvider
  ]
})
export class AppModule {
}
