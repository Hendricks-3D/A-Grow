import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Feeds } from '../../models/user';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  feedRef$:FirebaseListObservable<Feeds[]>


  constructor(public navCtrl: NavController, private afDatabase: AngularFireDatabase, private auth:AngularFireAuth) {
    this.feedRef$ = this.afDatabase.list('Feeds');
   this.afDatabase.list(`userProfile/${this.auth.auth.currentUser.uid}`);
   
    
  }





}
