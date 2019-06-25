import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { LoginPage } from './login/login.page';

const routes: Routes = [
  { path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            component: Tab1Page
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            component: Tab2Page
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            component: Tab3Page
          }
        ]
      }
    ]
  },
  { path: 'login', component: LoginPage },
  // tab1
  { path: 'careof-service', loadChildren: './tab1/careof-service/careof-service.module#CareofServicePageModule' },
  { path: 'careof-overview', loadChildren: './tab1/careof-overview/careof-overview.module#CareofOverviewPageModule' },
  { path: 'careof-service/careof-service-detail', loadChildren: './tab1/careof-service/careof-service-detail/careof-service-detail.module#CareofServiceDetailPageModule' },
  { path: 'careof-service/careof-service-detail/project-detail', loadChildren: './tab1/careof-service/careof-service-detail/project-detail/project-detail.module#ProjectDetailPageModule' },

  // tab2
  { path: 'service-project', loadChildren: './tab2/service-project/service-project.module#ServiceProjectPageModule' },

  // tab3
  { path: 'concern', loadChildren: './tab3/concern/concern.module#ConcernPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
