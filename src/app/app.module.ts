import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { TabsPage } from './tabs/tabs.page';
import { LoginPage } from './login/login.page';

import { HttpService } from '../common/service/http-config.service';
import { ThemeChangeService } from '../common/service/theme-change.service';
import { SpeakService } from '../common/service/speak.service';
import { NfcService } from '../common/service/nfc.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';


@NgModule({
  declarations: [
    AppComponent,
    Tab1Page,
    Tab2Page,
    Tab3Page,
    TabsPage,
    LoginPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgZorroAntdMobileModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpService,
    ThemeChangeService,
    SpeakService,
    NfcService,
    AppMinimize,
    TextToSpeech,
    NFC, Ndef
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
