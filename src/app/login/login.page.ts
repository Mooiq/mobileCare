import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastService } from 'ng-zorro-antd-mobile';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading = false;
  user = {
    username: 'test',
    password: '123456'
  };
  constructor(
    private toast: ToastService,
    public nav: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  formSubmit() {
    this.loading = true;
    this.storage.set('userINFO',this.user);
    this.storage.set('loginStatus',true);
    const toast = ToastService.loading('登陆中...', 1000, () => {
      this.nav.navigateRoot('/tabs/tab2');
      this.loading = false;
    });
    
    
  }



}
