import { Component, OnInit } from '@angular/core';
import { Toon } from '../toon';
import { ToonsService } from '../toons.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  toons: Toon[] = [];

  constructor(private toonsService: ToonsService) {}

  ngOnInit() {
    this.getToons();
  }

  getToons(): void {
    // this.toonsService.getToons().subscribe((toons) => (this.toons = toons));
    this.toonsService.getToons().subscribe((toons) => {
      this.toons = toons;
      toons.forEach((toon, index) => { 
        this.toonsService.getToonDetail(toon.realm.slug, toon.name.toLowerCase()).subscribe(toonDetail => {
          this.toons[index].details = toonDetail
          console.log('toonDetail',toonDetail);
        })
      });
    });
  }
}
