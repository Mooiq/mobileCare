import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-careof-service-detail',
  templateUrl: './careof-service-detail.page.html',
  styleUrls: ['./careof-service-detail.page.scss'],
})
export class CareofServiceDetailPage implements OnInit {
  public older: any;
  // slide 选项
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    console.error(queryParams);
    this.older = queryParams.info;
  }

  // slide change callback
  segmentChanged(segment,slider){
    slider.slideTo(segment.value);
  }
  slideChange(slider,segment){
    setTimeout(() => {
      slider.getActiveIndex().then(index=>{
        segment.value = index;
      });
    }, 200);
  }

}
