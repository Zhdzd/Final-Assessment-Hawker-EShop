import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hawker } from 'src/app/common/hawker';
import { HawkerListService } from 'src/app/services/hawker-list.service';

@Component({
  selector: 'app-hawker-list',
  templateUrl: './hawker-list.component.html',
  styleUrls: ['./hawker-list.component.css']
})
export class HawkerListComponent implements OnInit {

  hawkerList: Hawker[] = [];

  constructor(private router: Router, private hawkerSvc: HawkerListService) { }

  ngOnInit(): void {
    this.hawkerSvc.getHawkerList().subscribe((hawkerList)=> {

      this.hawkerList = hawkerList.slice(0,6);
    });

  }

}
