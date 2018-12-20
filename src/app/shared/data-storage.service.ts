import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) {}

    storeRecipes() {
        const token =  this.authService.getToken();
        // return this.http.put(
        //     'https://testing-app-31036.firebaseio.com/recipes.json',
        //     this.recipeService.getRecipes(),
        //     {params: new HttpParams().set('auth', token)}
        // );
        const request = new HttpRequest(
            'PUT',
            'https://testing-app-31036.firebaseio.com/recipes.json',
            this.recipeService.getRecipes(),
            {params: new HttpParams().set('auth', token), reportProgress: true}
        );
        return this.http.request(request);
    }

    getRecipes() {
        const token =  this.authService.getToken();
        this.http.get<Recipe[]>(
            'https://testing-app-31036.firebaseio.com/recipes.json' + token,
            {params: new HttpParams().set('auth', token)})
            .pipe(
                map((recipes) => {
                    for (const recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        } return recipes;
                    }
                })
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}
