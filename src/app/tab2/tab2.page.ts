import { Component } from '@angular/core';
import { ToastService } from 'ng-zorro-antd-mobile';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private _toast: ToastService
  ) {}

  showToast() {
    const toast = ToastService.show('This is a toast tips !!!', 0);
    setTimeout(() => {
      ToastService.hide();
    }, 3000);
  }

  showToastNoMask() {
    const toast = ToastService.info('Toast without mask !!!', 4000, null, false);
  }

  showToastTop() {
    const toast = ToastService.info('Toast position top', 4000, null, false, 'top');
  }

  showToastBottom() {
    const toast = ToastService.info('Toast position top', 4000, null, false, 'bottom');
  }

  showCustomIcon(event) {
    const toast = ToastService.info(event);
  }

  successToast() {
    const toast = ToastService.success('Load success !!!', 3000, () => {
      console.log('success');
    });
  }

  failToast() {
    const toast = ToastService.fail('Load failed !!!', 1000);
  }

  offline() {
    const toast = ToastService.offline('Network connection failed !!!', 1000);
  }

  loadingToast() {
    const toast = ToastService.loading('Loading...', 3000, () => {
      console.log('Load complete !!!');
    });
  }


}
