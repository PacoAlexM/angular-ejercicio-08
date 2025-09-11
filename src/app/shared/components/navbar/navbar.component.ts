import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    router = inject(Router);

    routes = routes.map(route => ({
        path: route.path,
        title: `${route.title ?? 'Mapas en Angular'}`,
    })).filter(route => route.path !== '**');

    // pageTitle$ = this.router.events.pipe(
    //     filter(event => event instanceof NavigationEnd),
    //     // tap(event => console.log(event)),
    //     map(event => event.url),
    //     map(route => routes.find(url => `/${url.path}` === route)?.title ?? '')
    // );

    pageTitle = toSignal(this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => event.url),
        map(route => routes.find(url => `/${url.path}` === route)?.title ?? '')
    ));
}
