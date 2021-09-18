import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  loading = true;
  error = false;
  numUsers = 0;
  totalSales = 0;
  numOrders = 0;
  orderService: OrderService;
  // bar chart
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLabels: Label[] = [];
  barChartData: ChartDataSets[] = [];

  //pie chart
  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
  };
  pieChartLabels: Label[] = [];
  pieChartData: number[] = [];

  constructor(
    private titleService: Title,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    orderService: OrderService,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.orderService = orderService;
  }

  ngOnInit() {
    this.titleService.setTitle(`Admin Dashboard`);
    this.getOrderSummary();
  }

  private getOrderSummary() {
    this.loading = true;
    this.orderService.getOrderSummary().subscribe(
      (summary) => {
        this.numUsers = summary.users[0].numUsers;
        this.totalSales = summary.orders[0].totalSales;
        this.numOrders = summary.orders[0].numOrders;
        this.barChartLabels = summary.dailyOrders.map((x: any) => x._id);
        this.barChartData = [
          {
            data: summary.dailyOrders.map((x: any) => x.sales),
            label: 'Sales',
          },
          {
            data: summary.dailyOrders.map((x: any) => x.orders),
            label: 'Orders',
          },
        ];
        this.pieChartLabels = summary.productCategories.map((x: any) => x._id);
        (this.pieChartData = summary.productCategories.map(
          (x: any) => x.count
        )),
          (this.loading = false);
      },
      (err) => {
        this.loading = false;
        this.error = true;
        this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
      }
    );
  }
}
