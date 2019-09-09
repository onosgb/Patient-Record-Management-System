import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private loginservice: LoginService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      Password: ['', [Validators.required, Validators.min(6), Validators.maxLength(15)]]
    });
  }

  get l() {
    return this.loginForm.controls;
  }

  // submit method
  onSubmit(formValue: any) {
    this.loading = true;
    this.loginservice.userLogin(formValue).subscribe(user => {
    const userdata = localStorage.setItem('userid', user._id);
    const isAdmin = localStorage.setItem('isAdmin', user.Admin);
    if (user.Admin) {
      this.loading = false;
      this.router.navigate(['/pms/staff']);
    } else {
    this.loading = false;
    this.router.navigate(['/pms/patients']);
    }
    }, catchError => {
      this.snackBar.open(`${catchError.error.message}`, 'Close', {
        duration: 3000,
      });
    } );
    }

}
