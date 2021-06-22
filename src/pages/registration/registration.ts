import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireDatabase} from 'angularfire2/database-deprecated'
import {AngularFireAuth} from 'angularfire2/auth'
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  userProfile= {} as User;


  constructor(private afDatabase:AngularFireDatabase, private auth: AngularFireAuth, private alert: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }


  createAccount(user={} as User): void
  {
      this.auth.auth.createUserWithEmailAndPassword(user.email,user.password).then((result)=>{

          this.auth.authState.subscribe((auth)=>{
            user.key = auth.uid;

            this.afDatabase.object(`userProfile/${user.key}`).set(user).then(()=>{

               //ALERT DIALOG
          let alert = this.alert.create({
              message:'Registration was successful',
              buttons:['OK']
               });
               alert.present();

               this.navCtrl.setRoot(LoginPage);//NAVIGATE TO LOGIN page

            }).catch((err)=>{
              //ALERT DIALOG
              let alert = this.alert.create({
                title:'Registraion failed.',
                subTitle:err,
                buttons:['OK']
                });
                alert.present();
            });

          })

      }).catch((err)=>{
        console.log("Error: "+err);

            let alert = this.alert.create({
              message:err,
              buttons:['Ok']
            })
            
            alert.present();
        
          });
      }//END OF REGISTRATION
  

}
