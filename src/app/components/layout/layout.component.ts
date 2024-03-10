import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  menuToggle: boolean = false;
  year: number = new Date().getFullYear();
  constructor(
    private router: Router,
    private cookie: CookieService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }
  logout() {
    this.menuToggle = !this.menuToggle;
    this.cookie.delete('login', '/');
    this.router.navigate(['/']);
  }
}
