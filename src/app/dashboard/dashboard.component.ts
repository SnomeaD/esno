import { Component, OnInit } from '@angular/core';
import { Toon } from '../toon';
import { ToonsService } from '../toons.service';
import { of, from, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  toons: Toon[] = [];
  loading: boolean = true;
  constructor(private toonsService: ToonsService) {}

  ngOnInit() {
    this.getOrderedToons();
  }
  getOrderedToons() : void {
    this.loading = true;
    this.toonsService.getToons().subscribe(
      (toons) => {
        forkJoin(
          toons.map((toon: Toon) => 
            this.toonsService.getToonDetail(toon.realm.slug, toon.name.toLowerCase())
          )
        ).subscribe(toonsDetails => {
          toons.forEach((toon, index) => {
            toon.details = toonsDetails[index];
          });
          this.toons = toons.sort((a:Toon, b:Toon) => b.details.profile.averageItemLevel - a.details.profile.averageItemLevel);
          this.loading = false;
        });
      }
    )
  }
}
