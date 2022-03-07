import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  mapOptions: google.maps.MapOptions = {
    center: { lat: 1.45097, lng: 103.79169 },
    zoom: 15
  }

  marker = {
    position: {lat: 1.45097, lng: 103.79169}

  }


}
