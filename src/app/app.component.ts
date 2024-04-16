import { Component,  ViewEncapsulation,  } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { GoogleAnalyticsService } from '../infra/service/google-analytics/google-analytics.service';
import { FacebookPixelService } from '../infra/service/facebook-pixel/facebook-pixel.service';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'analytics'; 

  constructor(
    private router: Router, 
    private googleAnalytics: GoogleAnalyticsService,
    private pixel: FacebookPixelService
  ) {
    this.router.events.forEach(async (item) => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
            event: 'page',
            pageName: item.url
        };

        this.setAnalytics();

      }
    });
  
  }


  setAnalytics() {
    this.googleAnalytics.initialize();
    this.pixel.initialize();
  }
}
