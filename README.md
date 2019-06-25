## 项目运行环境
- Ionic:
  - Ionic CLI                     : 5.0.0
  - Ionic Framework               : @ionic/angular 4.4.2
  - @angular-devkit/build-angular : 0.13.9
  - @angular-devkit/schematics    : 7.3.9
  - @angular/cli                  : 7.3.9
  - @ionic/angular-toolkit        : 1.5.1

- Cordova:
  - Cordova CLI       : 9.0.0 (cordova-lib@9.0.1)
  - Cordova Platforms : android 8.0.0
  - Cordova Plugins   : cordova-plugin-ionic-keyboard 2.1.3, cordova-plugin-ionic-webview 4.0.1, (and 8 other plugins)

- Utility:
  - cordova-res : 0.3.0
  - native-run  : not installed

- System:
  - NodeJS            : v8.12.0 
  - npm               : 6.9.0
  - OS                : Windows 10
  
## 项目树
├─ e2e        
├─ resources      
├─ src     
│  ├─ app                            > 页面     
│  │  ├─ tab1      
│  │  ├─ tab2       
│  │  ├─ tab3       
│  │  ├─ tabs       
│  │  ├─ app-routing.module.ts       
│  │  ├─ app.component.html       
│  │  ├─ app.component.spec.ts       
│  │  ├─ app.component.ts       
│  │  ├─ app.module.ts       
│  │  └─ app.scss       
│  ├─ assets                         > 静态资源       
│  │  ├─ icon       
│  │  │  └─ favicon.png       
│  │  ├─ ipConfig.json               > http请求ip地址        
│  │  └─ shapes.svg       
│  ├─ common                         > 全局方法       
│  │  └─ service       
│  │     └─ http-config.service.ts   > http请求方法       
│  ├─ environments       
│  │  ├─ environment.prod.ts       
│  │  └─ environment.ts       
│  ├─ theme                          > 全局css样式       
│  │  └─ variables.scss       
│  ├─ global.scss       
│  ├─ index.html       
│  ├─ karma.conf.js       
│  ├─ main.ts       
│  ├─ polyfills.ts       
│  ├─ test.ts       
│  ├─ tsconfig.app.json       
│  ├─ tsconfig.spec.json       
│  ├─ tslint.json       
│  └─ zone-flags.ts       
├─ .gitignore       
├─ README.md       
├─ angular.json       
├─ config.xml       
├─ ionic.config.json       
├─ package-lock.json       
├─ package.json    
├─ tsconfig.json    
└─ tslint.json    

