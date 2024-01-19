import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.authService.register(this.username, this.password).subscribe(
      (response: any) => {
        // Handle successful registration
        console.log(response.message);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
        // Handle registration error
      }
    );
  }
}
