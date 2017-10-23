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
  if($location.$$path === '/edit/' + $routeParams.id) { // an attempt to get recipe data is only made if url is /edit, not /add
    // Two $$ are needed above. NOTE Not sure why?. If only one is used then no recipe call is made.
    dataService.recipeById($routeParams.id, function(response) {
        $scope.recipe = response.data;
        console.log(response.data);
    });
  }

  // call the fooditems method on the dataservice service
  // Make the response data available to the HTML template, as an object called 'fooditems' via the $scope.
  dataService.fooditems(function(response){
    $scope.fooditems = response.data;
  });

  //////////////////////////////////////////////////////
  // NOTE Could these be combined somehow?

  $scope.deleteIngredient = function(recipe, $index) {
    //dataService.deleteRecipe(recipe); // NOTE This line of code utilises the service, which causes a console error. Still to resolve.
    $scope.recipe.ingredients.splice($index, 1); // $scope.recipe refers to the recipe data in the scope
    console.log(recipe); // NOTE This shows the updated object (with items successfully deleted, thus code two lines up not necessary.)
  };

  $scope.deleteStep = function(recipe, $index) {
    //dataService.deleteRecipe(recipe); // NOTE This line of code utilises the service, which causes a console error. Still to resolve.
    $scope.recipe.steps.splice($index, 1); // $scope.recipe refers to the recipe data in the scope
  };
  //////////////////////////////////////////////////////


  //////////////////////////////////////////////////////
  // NOTE Could these be combined somehow?
  $scope.addIngredient = function() {
    var ingredient = {}; // a new blank object on the ingredients array.
    $scope.recipe.ingredients.push(ingredient);
  };

  $scope.addStep = function() {
    var step = {description: "Mind. Blown!"};
    $scope.recipe.steps.push(step);
  };
  //////////////////////////////////////////////////////


  $scope.saveRecipe = function(recipe) {
    console.log(recipe);
    if (recipe._id) { // if the recipe has a ._id (i.e. if you're updating an existing recipe)
      console.log("if fired");
      dataService.updateRecipe(recipe);
      $location.path('/'); // send user back to "Recipes" screen after saving.
    } else {
      console.log("else fired");
      dataService.addNewRecipe(recipe);
      $location.path('/'); // send user back to "Recipes" screen after saving.
    }
  };



}); // End of RecipeDetailController
