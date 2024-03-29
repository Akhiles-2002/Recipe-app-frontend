import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isRegister: boolean = true;

  constructor(public authService: AuthServiceService){}

  registrationForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  loginForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  handleRegister() {
    console.log('Register', this.registrationForm.value);
    this.authService.loginAction(this.registrationForm.value).subscribe(
      {
        next:(response)=>{
          localStorage.setItem("jwt", response.jwt);
          this.authService.getUserProfile().subscribe();
          console.log("signup success", response);
        }
      }
    )
  }

  handleLogin() {
    console.log('Login', this.loginForm.value);
    this.authService.loginAction(this.loginForm.value).subscribe(
      {
        next:(response)=>{
          localStorage.setItem("jwt", response.jwt);
          this.authService.getUserProfile().subscribe();
          console.log("login success", response);
        }
      }
    ) 
  }

  togglePanel(){
    this.isRegister = ! this.isRegister;
  }

}
