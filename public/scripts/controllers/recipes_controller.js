'use strict';

angular.module('app') // the second param of [] is not needed here as we're not creating a new module, merely attaching to app.js
// Controllers are the glue that hold Anglular applications together.
 // It seems like Controllers are the link between the API/Services and the UI (HTML). They talk via the controller.
.controller('RecipesController', function($scope, $location, $routeParams, dataService) {

// call the recipes method on the dataservice service
// Make the response data available to the HTML template, as an object called 'recipes' via the $scope.
  dataService.recipes(function(response){
    $scope.recipes = response.data;
  });

// call the categories method on the dataservice service
// Make the response data available to the HTML template, as an object called 'categories' via the $scope.
  dataService.categories(function(response){
    $scope.categories = response.data;
  });

  // Changes the view when 'add' clicked.
    // NOTE identical function used in RecipeDetailController. Can these be combined somehow via prototypal inheritance?

//an ng-click directive under the RecipesController scope fires changeView() passing in the url snippet as the parameter
// the $location service works it's magic and alters the url/view.
  $scope.changeView = function(view){
      $location.path(view);
  };

// NOTE clarify the difference between starting with scope or dataService.
// both $scopes in the if else must return data as 'recipes' to the HTML in order for the ng-repeat to work.
$scope.recipesByCategory = function(chosenCategory) {
            if (chosenCategory === null) { // NOTE This doesn't seem like good practice.
                dataService.recipes(function(response) {
                $scope.recipes = response.data;
                });
            } else {
                dataService.recipesByCategory(chosenCategory, function(response){
                $scope.recipes = response.data;
                });
            }
        };


$scope.deleteRecipe = function(recipe, $index) {
  console.log(recipe);
  dataService.deleteRecipe(recipe);
  $scope.recipes.splice($index, 1); //recipes here is the recipes left in the scope from recipesByCategory above
      // $scope.recipes.splice($index, 1) by itself will remove the recipe without going through the service. But the action won't persist. Changing screens (without a refresh) will bring the recipe back.
};


}); // End of RecipesController
