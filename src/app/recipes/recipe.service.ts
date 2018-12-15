import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is a simply test',
            'https://api.norecipes.com/wp-content/uploads/2018/08/teriyaki-chicken-recipe_007.jpg'),
        new Recipe('Another Test Recipe', 'This is a simply test',
            'https://api.norecipes.com/wp-content/uploads/2018/08/teriyaki-chicken-recipe_007.jpg')
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}
