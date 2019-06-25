import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpService } from '../common/service/http-config.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public nav: NavController,
    private minimize: AppMinimize,
    public router: Router,
    private ipconfig: HttpService,
    private storage: Storage
  ) {
    this.initializeApp();
    // 处理安卓返回按钮事件，更多情况请看 tabs.page.ts
    this.platform.backButton.subscribe(() => {
      if (this.router.url === '/login') {
        this.minimize.minimize();
      }
      if (Keyboard.isVisible) {
        Keyboard.hide();
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      // this.statusBar.overlaysWebView(false);
      this.statusBar.styleLightContent();
      this.ipconfig.initIpConfig();
      this.storage.get('loginStatus').then(val=>{
        if (!val) {
          this.nav.navigateRoot('/login');
        } else {
          this.nav.navigateRoot('/tabs/tab2');
        }
      });
    });
  }
}
