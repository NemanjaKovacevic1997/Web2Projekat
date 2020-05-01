import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var require: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input('longitude') longitude : number;
  @Input('latitude') latitude : number;

  ngOnInit(): void {
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    mapboxgl.accessToken = environment.mapbox.accessToken;
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitude, this.latitude],
      zoom: 11.15,
      attributionControl: false
    });
  }

  
}
