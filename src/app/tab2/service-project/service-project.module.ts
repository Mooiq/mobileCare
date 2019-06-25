import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

import { IonicModule } from '@ionic/angular';

import { ServiceProjectPage } from './service-project.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceProjectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgZorroAntdMobileModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServiceProjectPage]
})
export class ServiceProjectPageModule {}
