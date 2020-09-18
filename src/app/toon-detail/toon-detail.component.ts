import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toon } from '../toon';
import { ToonsService } from '../toons.service';

@Component({
  selector: 'app-toon-detail',
  templateUrl: './toon-detail.component.html',
  styleUrls: ['./toon-detail.component.css'],
})
export class ToonDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private toonsService: ToonsService
  ) {}
  realmSlug = this.route.snapshot.paramMap.get('realmSlug');
  toonName = this.route.snapshot.paramMap.get('toonName');
  toon: Toon;

  ngOnInit(): void {
    this.toon = this.toonsService.getToon(this.realmSlug, this.toonName.toLowerCase());
  }
}
