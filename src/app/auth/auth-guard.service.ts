import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import {map, take} from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.store.select('auth')
            .pipe(
                take(1),
                map(
                (authState: fromAuth.State) => {
                    return authState.authenticated;
                }
            ));
    }

    constructor(
        private store: Store<fromApp.AppState>) {}
}
