import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { MapMarker } from '../../interfaces/map-marker.interface';
import { v4 as UUIDv4 } from 'uuid';
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
    selector: 'markers-page',
    imports: [JsonPipe],
    templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
    divElement = viewChild<ElementRef>('map');
    map = signal<mapboxgl.Map|null>(null);
    markers = signal<MapMarker[]>([]);

    async ngAfterViewInit() {
        if (!this.divElement()?.nativeElement) return;

        await new Promise(resolve => setTimeout(resolve, 80));

        const element = this.divElement()!.nativeElement;

        const map = new mapboxgl.Map({
	        container: element,
	        style: 'mapbox://styles/mapbox/streets-v12',
            center: [-122.3948082, 37.796349],
	        zoom: 14,
        });

        // const marker = new mapboxgl.Marker({ draggable: false, color: 'red', }).setLngLat([-122.3948082, 37.796349]).addTo(map);
        // 
        // marker.on('dragend', event => {
        //     console.log({ event });
        // });

        this.mapListeners(map);
    }

    mapListeners(map: mapboxgl.Map) {
        map.on('click', event => this.onMapClick(event));

        this.map.set(map);
    }

    onMapClick(event: mapboxgl.MapMouseEvent) {
        if (!this.map()) return;

        // console.log(event.lngLat);

        const map = this.map()!;
        const { lng, lat } = event.lngLat;

        const color = '#xxxxxx'.replace(/x/g, (y) =>
            ((Math.random() * 16) | 0).toString(16)
        );

        const marker = new mapboxgl.Marker({ draggable: false, color, }).setLngLat([lng, lat]).addTo(map);

        const newMapMarker: MapMarker = {
            id: UUIDv4(),
            mapboxMarker: marker,
        };

        // this.markers.set([newMapMarker, ...this.markers()]);
        this.markers.update(prev => [newMapMarker, ...prev]);
    }

    flyToMarker(lngLat: LngLatLike) {
        if (!this.map()) return;

        this.map()?.flyTo({ center: lngLat, });
    }
}
