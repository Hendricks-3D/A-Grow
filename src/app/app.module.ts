import { HomePage } from './../pages/home/home';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductIssuePage } from '../pages/product-issue/product-issue';
import { RegistrationPage } from '../pages/registration/registration';
import { LoginPage } from '../pages/login/login';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Camera } from '@ionic-native/camera';

export const FIREBASE_CONFIG =  {
  apiKey: "AIzaSyCmejmVLlYcN__TSDQgEG8rt7QIxiQ3gTs",
  authDomain: "agrow-a6949.firebaseapp.com",
  databaseURL: "https://agrow-a6949.firebaseio.com",
  projectId: "agrow-a6949",
  storageBucket: "gs://agrow-a6949.appspot.com",
  messagingSenderId: "1043071075945"
};

@NgModule({
  declarations: [
   
    MyApp,
    HomePage, 
    LoginPage,
    TabsPage,
    RegistrationPage,
    ProductIssuePage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    LoginPage,
    TabsPage,
    RegistrationPage,
    ProductIssuePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabaseModule,
    AngularFireDatabase,
    Camera
  ]
})
export class AppModule {}
