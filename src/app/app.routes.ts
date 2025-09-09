import { Routes } from '@angular/router';
import { FullscreenMapPageComponent } from './pages/fullscreen-map-page/fullscreen-map-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { HousesPageComponent } from './pages/houses-page/houses-page.component';

export const routes: Routes = [
    {
        path: 'fullscreen',
        component: FullscreenMapPageComponent,
        title: 'Mapa en Pantalla Completa',
    },
    {
        path: 'markers',
        component: MarkersPageComponent,
        title: 'Marcadores en el Mapa',
    },
    {
        path: 'houses',
        component: HousesPageComponent,
        title: 'Casas Disponibles',
    },
    {
        path: '**',
        redirectTo: 'fullscreen',
    },
];
