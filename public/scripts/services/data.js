(function() { // Wrap all of your JavaScript application, controller, and services code in immediately invoked functions in order to prevent from polluting the global namespace.
'use strict';

  angular.module('app') // the second param of [] is not needed here as we're not creating a new module, merely attaching to app.js

  .service('dataService', function($http){

    // GET /api/recipes - Gets all of the recipes.
      // creates a 'recipes' method that makes a call to the recipes API
    this.recipes = function(callback){
      $http.get('/api/recipes')
      .then(callback);
    };

    // GET /api/categories - Gets all of the categories.
    this.categories = function(callback){
      $http.get('/api/categories')
      .then(callback);
    };

    // GET /api/fooditems - Gets all of the food items.
    this.fooditems = function(callback){
      $http.get('/api/fooditems')
      .then(callback);
    };

    // GET all the recipes by a certain category.
    this.recipesByCategory = function(chosenCategory, callback){
      $http.get('/api/recipes?category='+ chosenCategory.name) // pass in the key value to the api
      .then(callback);
    };

    // GET /api/recipes/{id} - Gets the recipe for the specified ID.
    this.recipeById = function(id, callback) {
      $http.get('/api/recipes/' + id)
      .then(callback);
    };

    //POST /api/recipes - Adds a recipe.
    this.addNewRecipe = function (recipe, callback) {
      console.log(recipe);
      $http.post('/api/recipes/', recipe)
      .then(callback);
    };

    // PUT /api/recipes/{id} - Updates the recipe for the specified ID.
    this.updateRecipe = function (recipe) {
      console.log("The " + recipe.name + " recipe has been saved!");
      $http.put('/api/recipes/' + recipe._id, recipe)
      .then(); // NOTE this is not unnecessary!
    };

    // DELETE /api/recipes/{id} - Deletes the recipe for the specified ID.
    this.deleteRecipe = function(recipe) {
      console.log(recipe._id);
      $http.delete('/api/recipes/' + recipe._id);
    };
  });
})(); // end of IIFE
