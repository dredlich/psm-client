import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  constructor(private titleService: Title, private route: ActivatedRoute) {}

  private name: any;
  title = 'psm-client';

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.route.queryParams.subscribe(params => {
      this.name = params.name;
    });
  }
}
