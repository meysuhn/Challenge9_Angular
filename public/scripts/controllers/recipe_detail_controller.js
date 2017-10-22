'use strict';

angular.module('app') // the second param of [] is not needed here as we're not creating a new module, merely attaching to app.js
.controller('RecipeDetailController', function($scope, $location, $routeParams, dataService) {

  $scope.changeView2 = function(view){
      $location.path(view);
  };

  // NOTE this is a duplicate of the method in the above controller. Can they not be combined somehow?
  dataService.categories(function(response){
    $scope.categories = response.data;
  });

// if user clicks on edit page then get the data for that recipe and populate the fields
  dataService.recipeById($routeParams.id, function(response) {
      $scope.recipe = response.data;
      console.log(response.data);
  });

// call the fooditems method on the dataservice service
// Make the response data available to the HTML template, as an object called 'fooditems' via the $scope.
  dataService.fooditems(function(response){
    $scope.fooditems = response.data;
  });

  //////////////////////////////////////////////////////
  // NOTE Could these be combined somehow?

  //NOTE play with this for deleting items
  $scope.deleteIngredient = function(recipe, $index) {
    dataService.deleteRecipe(recipe);
    $scope.recipe.ingredients.splice($index, 1);
    //TODO $scope.recipe I think needs to refer to recipe on line 17 above, as that is what holds the recipe data in the scope
  };

  //NOTE play with this for deleting items
  $scope.deleteStep = function(recipe, $index) {
    dataService.deleteRecipe(recipe);
    $scope.recipe.steps.splice($index, 1);
    //TODO $scope.recipe I think needs to refer to recipe on line 17 above, as that is what holds the recipe data in the scope
  };
  //////////////////////////////////////////////////////


  //////////////////////////////////////////////////////
  // NOTE Could these be combined somehow?
  $scope.addStep = function() {
    var step = {description: "Mind, blown!"};
    $scope.recipe.steps.push(step);
  };

  $scope.addIngredient = function() {
    var ingredient = {description: "Mind, blown!"};
    $scope.recipe.ingredients.push(ingredient);
  };
  //////////////////////////////////////////////////////


  $scope.saveRecipe = function(recipe) {
    dataService.saveRecipe(recipe);
  };

}); // End of RecipeDetailController
