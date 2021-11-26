import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | undefined
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | undefined

  i:number=0
  currentpositionTemp:currentposition
  /////////////////////////////
  currentPos: google.maps.LatLngLiteral = {
    lat: 17.5169,
    lng: 78.3428
  };
  
  tmpPoints: google.maps.LatLngLiteral[] = [
    
    {
      lat: 17.5170,
      lng: 78.3528
    },
    {
      lat: 17.5171,
      lng: 78.3628
    },
    {
      lat: 17.5172,
      lng: 78.3728
    },
    {
      lat: 17.5173,
      lng: 78.3928
    },
    {
      lat: 18.5174,
      lng: 78.4000
    }
  ]
  /////////////////////////////
  markerTemp:MapMarker
  zoom = 9
  center: google.maps.LatLngLiteral = {
    lat: 17.5169,
    lng: 78.3428
  };
//   markersymbol: google.maps.Symbol = {
//     path: 'car.svg',
//     fillColor: '#FF0000',
//     fillOpacity: .6,
//     anchor: new google.maps.Point(0,0),
//     strokeWeight: 0,
//     scale: 1
// }

icon = {
  //url: 'https://img.icons8.com/plasticine/100/000000/car--v1.png',
  url: 'https://img.icons8.com/color/48/000000/car--v1.png',
  size: new google.maps.Size(90, 90),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(90, 90)
};

  
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 15,
    minZoom: 8,
    backgroundColor: "white"
  }
  markers = []
  marker:any
  infoContent = ''
  
 
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: 17.5169,
        lng: 78.3428,
      }

    });

    
    /* Working code comment start */
    
    /*
    this.marker = {
      position: {
        lat: this.center.lat,
        lng: this.center.lng,
      },
      // label: {
      //   color: 'blue',
      //   text: 'SaiRamayya!!! ' + (this.markers.length + 1),
      // },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
       // animation: google.maps.Animation.BOUNCE,
      },
      icon: this.icon
    }
    this.markers.push(this.marker);
    */

    /* Working code comment end   */
  }

  constructor(private http: HttpClient) { }



  addMarker() {

    this.markers.pop();
    
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      // label: {
      //   color: 'blue',
      //   text: 'SaiRamayya!!! ' + (this.markers.length + 1),
      // },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
       // animation: google.maps.Animation.BOUNCE,
      },
      icon: this.icon
     
    })
  }

  // trackCab()
  // {
  //   let i = 0;
  //   const obs = Observable.interval(1000)
  //     .takeWhile((v) =>  i < this.tmpPoints.length)
  //     .subscribe(() => {
  //       const pos = this.tmpPoints[i];
  //       this.marker = {
  //         position: {
  //           lat: pos.lat,
  //           lng: pos.lng,
  //         },
  //         // label: {
  //         //   color: 'blue',
  //         //   text: 'SaiRamayya!!! ' + (this.markers.length + 1),
  //         // },
  //         title: 'Marker title ' + (this.markers.length + 1),
  //         info: 'Marker info ' + (this.markers.length + 1),
  //         options: {
  //          // animation: google.maps.Animation.BOUNCE,
  //         },
  //         icon: this.icon
  //       }

  //       i++;
  //       if(i < this.tmpPoints.length)
  //       this.markers.pop();
        
  //       this.markers.push(this.marker);
        
  //     })

    
  // }

 

  trackCabHttp()
  {
    Observable.interval(1000).subscribe(()=>
    this.http.get<currentposition>('http://localhost:8080/currentlocation').subscribe(data => {
        this.currentpositionTemp = data;
        console.log("Cab number is "+this.currentpositionTemp.cabnumber);
        console.log("Latitude is "+this.currentpositionTemp.latitude);
        console.log("Longitude is "+this.currentpositionTemp.longitude);

        this.marker = {
          position: {
            lat: this.currentpositionTemp.latitude,
            lng: this.currentpositionTemp.longitude,
          },
          icon: this.icon
        }
        this.markers.pop();
        
        this.markers.push(this.marker);
    }))

    
  }




}

interface currentposition {
  cabnumber: string;
  latitude: number;
  longitude: number;
}