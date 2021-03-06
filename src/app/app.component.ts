import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Team-7-Inventory-App';
  isMenuOpen: boolean = false;

  onSidenavClick(): void {
    this.isMenuOpen = false;
  }
}
