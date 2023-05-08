import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {

  beforeEach(async () => {
    TestBed.configureTestingModule({
           imports: [
             HttpClientModule,
             RouterTestingModule.withRoutes(
                 [{path: 'home', component: HomeComponent}]
               )
         ]
     });
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
      HttpClientModule,
      RouterTestingModule.withRoutes(
        [{path: 'home', component: HomeComponent}]
      )
    ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'psm-client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('psm-client');
  });
});
