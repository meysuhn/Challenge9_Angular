'use strict';

angular.module('app') // the second param of [] is not needed here as we're not creating a new module, merely attaching to app.js
.controller('RecipeDetailController', function($scope, $location, $routeParams, dataService) {

  // Initiate an empty object & arrays to hold recipe, ingredient and steps data
  $scope.recipe = {};
  $scope.recipe.ingredients = [];
  $scope.recipe.steps = [];

  $scope.changeView2 = function(view){
      $location.path(view);
  };

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


// Delete an ingredient
  $scope.deleteIngredient = function(recipe, $index) {
    //dataService.deleteRecipe(recipe); // NOTE This line of code utilises the service, which causes a console error. Still to resolve.
    $scope.recipe.ingredients.splice($index, 1); // $scope.recipe refers to the recipe data in the scope
    console.log(recipe); // NOTE This shows the updated object (with items successfully deleted, thus code two lines up not necessary.)
  };

// Delete a step
  $scope.deleteStep = function(recipe, $index) {
    //dataService.deleteRecipe(recipe); // NOTE This line of code utilises the service, which causes a console error. Still to resolve.
    $scope.recipe.steps.splice($index, 1); // $scope.recipe refers to the recipe data in the scope
  };

// Add a new ingredient
  // NOTE Could these be combined somehow?
  $scope.addIngredient = function() {
    var ingredient = {}; // a new blank object on the ingredients array.
    $scope.recipe.ingredients.push(ingredient);
  };

// Add a new step
  $scope.addStep = function() {
    var step = {description: "Please add a step..."};
    $scope.recipe.steps.push(step);
  };


// Save Recipe function for both updating a receipe and adding a new one.
  // $scope.saveRecipe = function(recipe) {
  //   console.log(recipe);
  //   if (recipe._id) { // if the recipe has a ._id (i.e. if you're updating an existing recipe)
  //     console.log("if fired");
  //     dataService.updateRecipe(recipe);
  //   } else {
  //     console.log("else fired");
  //     dataService.addNewRecipe(recipe, function(response) {
  //       $scope.recipe = response.data;
  //     });
  //   }
  //   $location.path('/'); // send user back to "Recipes" screen after saving.
  // };

  $scope.saveRecipe = function(recipe) {
  if (recipe._id) { // if the recipe has a ._id it's an update, if not it's a new recipe.
    dataService.updateRecipe(recipe);
  } else {
    dataService.addNewRecipe(recipe, function(response) {
      $scope.recipe = response.data;
    });
  }
  $location.path('/');
};

}); // End of RecipeDetailController
