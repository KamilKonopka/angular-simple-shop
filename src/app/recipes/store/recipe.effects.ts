import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';

export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .pipe(
            ofType(RecipeActions.FETCH_RECIPES))
        .pipe(
            switchMap(
                (action: RecipeActions.FetchRecipes) => {
                    return this.http.get<Recipe[]>('https://testing-app-31036.firebaseio.com/recipes.json',
                        {
                            observe: 'body',
                            responseType: 'json'
                        });
                }),
            map(
                (recipes) => {
                    console.log(recipes);
                    for (const recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return {
                        type: RecipeActions.SET_RECIPES,
                        payload: recipes
                    };
                }));

    @Effect({dispatch: false})
    recipeStore = this.actions$
        .pipe(ofType(RecipeActions.STORE_RECIPES))
        .pipe(
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, state]) => {
                const request = new HttpRequest(
                    'PUT',
                    'https://testing-app-31036.firebaseio.com/recipes.json',
                    state.recipes, {reportProgress: true}
                );
                return this.http.request(request);
            })
        );

constructor(private actions$: Actions,
            private http: HttpClient,
            private store: Store<fromRecipe.FeatureState>) {}
}
