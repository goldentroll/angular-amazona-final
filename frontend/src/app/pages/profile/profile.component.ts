import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: [''],
      repeatPassword: [''],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => {
      if (!x) {
        return;
      }
      this.form.patchValue({ name: x.name });
      this.form.patchValue({ email: x.email });
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    const { name, email, password } = this.form.controls;
    this.loading = true;
    this.authService.update(name.value, email.value, password.value).subscribe(
      (data) => {
        this.snackBar.open('Profile updated successfully', '', {
          panelClass: 'success-snackbar',
        });
        this.loading = false;
      },
      (error) => {
        this.snackBar.open(error, '', { panelClass: 'error-snackbar' });
        this.loading = false;
      }
    );
  }
}
