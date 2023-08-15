import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  constructor(private titleService: Title) {}
  title = 'psm-client';
   ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
