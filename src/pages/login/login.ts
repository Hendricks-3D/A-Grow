import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth'
import { User } from '../../models/user';
import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user ={} as User;
  constructor( private auth: AngularFireAuth, private alert: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login(user= {} as User):void
  {
      this.auth.auth.signInWithEmailAndPassword(user.email,user.password).then(()=>{
        this.navCtrl.setRoot(TabsPage);
      }).catch((error)=>{
        let alert= this.alert.create({
          title:'login Error',
         subTitle:error,
          buttons:['Ok']
        })
        alert.present();
      });


  }//END OF LOGIN PAGE

  register():void{this.navCtrl.push(RegistrationPage)}

}//end of main class
