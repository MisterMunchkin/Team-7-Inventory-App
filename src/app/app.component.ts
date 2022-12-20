import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Team-7-Inventory-App';
  isMenuOpen: boolean = false;

  constructor(
  private authService: AuthService) {
  }

  onSidenavClick(): void {
    this.isMenuOpen = false;
  }

  signOut() {
    this.authService.logout();
  }
}
