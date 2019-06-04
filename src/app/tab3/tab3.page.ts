import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public theme:boolean = false;
  constructor(
    public alertController: AlertController,
    public nav: NavController,
    private storage: Storage
  ) {}

  change(){

    const rootel = document.querySelector(':root');
    console.log(rootel);
    const color = rootel['style'].getPropertyValue('--ion-background-color');
    console.log(color);
    if(color !== 'rgb(54, 69, 79)') rootel['style'].setProperty('--ion-background-color', 'rgb(54, 69, 79)');
    else rootel['style'].setProperty('--ion-background-color', 'rgb(244, 244, 244)');

  }

  async exit() {
    const alert = await this.alertController.create({
      message: '退出当前用户?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            this.storage.set('loginStatus',false).then(()=>{
              this.storage.remove('userINFO').then(()=>{
                this.nav.navigateRoot('/login');
              })
            }).catch(()=>{

            })
          }
        }
      ]
    });
    await alert.present();
  }
}
