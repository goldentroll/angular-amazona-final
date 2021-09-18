import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-users-history',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  loading = true;
  error = false;
  users: User[] = [];
  userService: UserService;
  displayedColumns: string[] = ['_id', 'name', 'email', 'isAdmin', 'action'];

  constructor(
    private titleService: Title,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    userService: UserService,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.userService = userService;
  }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data;

        this.titleService.setTitle(`User History`);
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.error = true;
        this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
      }
    );
  }
}
