import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { routerTransition } from '../../router.animations';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { StoreService } from '../../services/store.service';
import { HttpClient } from '@angular/common/http';


 import * as ol from 'openlayers';

	
//declare var ol: any;

@Component({
    selector: 'app-stores',
    templateUrl: './stores.component.html',
    styleUrls: ['./stores.component.scss'],
    animations: [routerTransition()]
})
export class StoresComponent implements OnInit {
	/*@ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;
  
    constructor() {}

    ngOnInit() {
	  var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	  this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
	}*/

	latitude: number = 31.771959;
  longitude: number = 35.217018;

  map: any;
  markerSource:any;
  stores: any;

  constructor(private storeService: StoreService, private http: HttpClient) {}
  
  ngOnInit() {
	this.fetchData();
	this.markerSource = new ol.source.Vector();
	const markerStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 0.75,
          src: 'https://openlayers.org/en/v4.6.4/examples/data/icon.png'
        }))
      });
	  
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }), 
		new ol.layer.Vector({
		  source: this.markerSource,
          style: markerStyle,
		}),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 13
      })
	  
    });
  }
  
  addMarker(lon, lat) {
	console.log('lon:', lon);
	console.log('lat:', lat);

	var iconFeatures = [];
 
  var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([Number(lon), Number(lat)], 'EPSG:4326',
      'EPSG:3857')),
    name: 'Null Island',
    population: 4000,
    rainfall: 500
  });
  this.CenterMap(lon, lat);
  this.markerSource.addFeature(iconFeature);
  
}

CenterMap(lon, lat) {
    console.log("Long: " + Number(lon) + " Lat: " + Number(lat));
    this.map.getView().setCenter(ol.proj.transform([Number(lon), Number(lat)], 'EPSG:4326', 'EPSG:3857'));
    this.map.getView().setZoom(15);
}

	fetchData() {
		/*let httpOptions = {
			headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
		};*/
		console.log("fetchData stores");
		this.storeService.getStores()
			.subscribe(res => {
			this.stores = res;
			console.log(res);
			}, err => {
			console.log( "No authorized to see stores list");
			});
  
	}
	
	findLocation(lon, lat){
	 /*this.http.get("http://maps.googleapis.com/maps/api/geocode/xml?address="+address).subscribe(resp => {
		console.log(resp);
	  }, 
	  err => {
		console.log("hello location error"+err);
	  });
		*/
	 this.addMarker(lon, lat);
	}




}