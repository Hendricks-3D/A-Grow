import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Feeds } from '../../models/user';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-product-issue',
  templateUrl: 'product-issue.html',
})
export class ProductIssuePage {

  public isEmpty:''
  issue = {} as Feeds;

  constructor(private afDatabase: AngularFireDatabase, private alert: AlertController,
    public navCtrl: NavController, public navParams: NavParams,private camera: Camera) {

   this.isEmpty = this.issue.name;//GET EMPTY FIELD FOR TESTING

  }//END OF CONSTRUCTOR

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductIssuePage');
    
  }

  public openCamera(): void {


    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     //let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.saveImageToFirebase(imageData);
    }).catch((err) => {

     alert(err);
    });


  }//END OF OPEN CAMERA
 



  //Report issue accepts the user input and store it to firebase
  reportIssue(issue = {} as Feeds):void{

    if(this.issue.message!=this.isEmpty || this.issue.parish!=this.isEmpty || this.issue.type!=this.isEmpty)


    {issue.key = issue.message.slice(0,6)+issue.title.slice(0,4);//GENERATE USERID

        
        //SAVE TO DATABASE
        this.afDatabase.object('/Issues/'+issue.key).set(issue).then((result)=>{
          
          
          let alert = this.alert.create({
            subTitle:'report sent',
            buttons:['Ok']
          });
          alert.present();


        }).catch((err)=>{
          let alert = this.alert.create({
            subTitle:err,
            buttons:['Ok']
          });

          alert.present(); 
        });
      
  }else
  {
    this.alert.create({
      subTitle:'Required field cannot be empty',
      buttons:['ok']
    })
  }
    
  }//END OF REPORT ISSUE


  public saveImageToFirebase(imageData:any): void {
    let storageRef = firebase.storage().ref(`/images/${this.uid()}`);

    const uploadTask: firebase.storage.UploadTask = storageRef.putString(imageData,'base64',{contentType:'image/jpeg'});

    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot)=>{
      alert("Upload complete");
      
    this.issue.imageUrl = uploadSnapshot.downloadURL;//Save the user profile pic download url for late use

      alert(this.issue.imageUrl);
    });
    
  }//END OF SAVE IMAGE TO FIREBASE FUNCTION 






  public uid(): string  {
    let d = new Date().getTime();
   let uuid:string = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }


}//END OF PRODUCT ISSUE CLASS
