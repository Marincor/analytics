import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { GoogleTagManagerModule, GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'analytics'; 

  constructor(private router: Router, private gtmService: GoogleTagManagerService,
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


  async setAnalytics() {
    try {
      console.log(this.gtmService.googleTagManagerId)
      const resp = await this.gtmService.addGtmToDom();

      console.log("resp", resp);
     } catch(e) {
      console.log(e);
     }
  }
}
