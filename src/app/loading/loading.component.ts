import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';
import { Color } from './loading.model';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  display: string;
  color: Color;
  constructor(private loading: LoadingService) { }
  onLoadingHandled() {
    this.display = 'none';
  }
  ngOnInit() {
    this.loading.loadingOccurred
      .subscribe(
        (loading: Color) => {
          this.color = loading;
          this.display = 'block';
          setTimeout(() => {
            this.onLoadingHandled()
          }, 4000)
        }
      );
  }
}
