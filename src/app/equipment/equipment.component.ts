import { Component, OnInit } from '@angular/core';
import { ToonsService } from '../toons.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  constructor(public toonsService: ToonsService) {
    this.toonsService.retrieveToonsEquipment()
  }

  ngOnInit(): void {}

}
