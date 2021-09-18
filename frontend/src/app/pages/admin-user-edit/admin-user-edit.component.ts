import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css'],
})
export class AdminUserEditComponent implements OnInit {
  form: FormGroup;
  user: User = {
    _id: '',
    name: '',
    isAdmin: false,
  };
  loading = false;
  error = false;

  submitted = false;
  returnUrl: string;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      isAdmin: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userId = routeParams.get('id');
    if (userId) {
      this.userService.getUser(userId).subscribe(
        (user: User) => {
          this.user = user;
          this.loading = false;
          this.form.patchValue({ name: user.name });
          this.form.patchValue({ isAdmin: user.isAdmin });
          this.titleService.setTitle(`Admin Edit User ${user._id}`);
        },
        (err: any) => {
          this.error = true;
          this.snackBar.open(err, '', {
            panelClass: 'error-snackbar',
          });
        }
      );
    } else {
      this.snackBar.open('User Not Found', '', {
        panelClass: 'error-snackbar',
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    const { name, isAdmin } = this.form.controls;
    this.loading = true;
    this.userService
      .update({
        _id: this.user._id,
        name: name.value,
        isAdmin: isAdmin.value,
      })
      .subscribe(
        () => {
          this.snackBar.open('User updated successfully', '', {
            panelClass: 'success-snackbar',
          });
          this.loading = false;
          this.router.navigate(['/admin/users']);
        },
        (err: any) => {
          this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
          this.loading = false;
        }
      );
  }
}
