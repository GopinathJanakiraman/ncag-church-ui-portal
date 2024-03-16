import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterViewInit {
  menuToggle: boolean = false;
  year: number = new Date().getFullYear();
  currentUrl!: string;
  constructor(
    private router: Router,
    private cookie: CookieService,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.url;
      }
    })


  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  logout() {
    this.menuToggle = !this.menuToggle;
    this.cookie.delete('login', '/');
    this.router.navigate(['/']);
  }
}
