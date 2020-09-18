import { Component, OnInit } from '@angular/core';
import { ToonsService } from '../toons.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loading = false;
  constructor(public toonsService: ToonsService) {}

  ngOnInit() {
  }
}
