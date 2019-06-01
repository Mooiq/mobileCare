import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'ng-zorro-antd-mobile';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  configUrl = 'assets/ipConfig.json';
  private headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  private baseUrl:String;
  constructor( private http: HttpClient) {}

  initIpConfig(): void {
    let baseurl;
    this.http.get(this.configUrl).subscribe(x=>{
      baseurl = x['baseUrl'];
      this.baseUrl = x['baseUrl'];
    });
  }

  get(url) {
    return fetch(`${this.baseUrl + url}`, {
      method: 'GET',
      headers: this.headers
    }).then(response => {
      return this.handleResponse(`${this.baseUrl + url}`, response);
    }).catch(err => {
      console.error(`Request failed. Url = ${this.baseUrl + url} . Message = ${err}`);
      return {error: {message: 'Request failed.'}};
    })
  }

  post(url, data) {
    return fetch(`${this.baseUrl + url}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(response => {
      return this.handleResponse(`${this.baseUrl + url}`, response);
    }).catch(err => {
      console.error(`Request failed. Url = ${this.baseUrl + url} . Message = ${err}`);
      return {error: {message: 'Request failed.'}};
    })
  }

  handleResponse(url, response) {
    if (response.status < 500) {
      if(response.status === 200){
        return response.json();
      }else{
        response.json().then(data=>{
          const toast = ToastService.fail(data.message, 0);
          setTimeout(() => {
            ToastService.hide();
          }, 3000);
        })
      }
    } else {
      const toast = ToastService.offline('服务器出错啦 !!!', 2000);
      console.error(`Request failed. Url = ${url} . Message = ${response.statusText}`);
      return {error: {message: 'Request failed due to server error '}};
    }
  }


}
