import mapboxgl from 'mapbox-gl';

export interface MapMarker {
    id: string;
    mapboxMarker: mapboxgl.Marker
}
