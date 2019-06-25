import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CareofServiceDetailPage } from './careof-service-detail.page';
import { PlanDayComponent } from './plan-day/plan-day.component';
import { PlanWeekComponent } from './plan-week/plan-week.component';
import { PlanMonthComponent } from './plan-month/plan-month.component';
import { PlanImmediateComponent } from './plan-immediate/plan-immediate.component';

const routes: Routes = [
  {
    path: '',
    component: CareofServiceDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CareofServiceDetailPage,
    PlanDayComponent,
    PlanWeekComponent,
    PlanMonthComponent,
    PlanImmediateComponent,
  ]
})
export class CareofServiceDetailPageModule {}
