import { Component, OnInit } from '@angular/core';
import { Toon } from '../toon';
import { ToonsService } from '../toons.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  toons: Toon[] = [];
  loading = true;
  constructor(private toonsService: ToonsService) {}

  ngOnInit() {
    this.getOrderedToons();
  }
  getOrderedToons(): void {
    this.loading = true;
    this.toonsService.getToons().subscribe((toons) => {
      this.toons = toons;
      forkJoin(
        toons.map((toon: Toon) =>
          this.toonsService.getToonDetail(
            toon.realm.slug,
            toon.name.toLowerCase()
          )
        )
      ).subscribe((toonsDetails) => {
        toons.forEach((toon, index) => {
          toon.details = toonsDetails[index];
        });
        this.toons = toons.sort(
          (a: Toon, b: Toon) =>
            b.details.profile.averageItemLevel -
            a.details.profile.averageItemLevel
        );
        this.loading = false;
      });
    });
  }
}
