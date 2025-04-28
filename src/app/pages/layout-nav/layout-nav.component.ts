import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-nav',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout-nav.component.html',
  styleUrl: './layout-nav.component.css'
})
export class LayoutNavComponent {

  constructor(private router:Router) {}  // Inject the Router via constructor

  SignUp(){
    this.router.navigateByUrl('login')
  }
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
