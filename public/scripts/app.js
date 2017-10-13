(function() { // Wrap all of your JavaScript application, controller, and services code in immediately invoked functions in order to prevent from polluting the global namespace.
'use strict';

angular.module("app", ['ngRoute'])

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

// NOTE why start with scope? not just dataService?
$scope.recipesByCategory = function(chosenCategory) {
            if (chosenCategory === "All Categories") {
                dataService.recipes(function(response) {
                $scope.recipes = response.data;
                });
            } else {
                dataService.recipesByCategory(chosenCategory, function(response){
                  console.log(response.data);
                  console.log("fired");
                  $scope.recipes = response.data;
                });
            }
        };
// both $scopes in the if else must return data as 'recipes' to the HTML in order for the ng-repeat to work.


// Small test functions. Delete later.
  $scope.learningNgChange=function(chosenCategory){
    console.log("HTML logging" + chosenCategory.name);
  };

// Small test functions. Delete later.
  $scope.helloWorld=function(){
    console.log("hello hello");
  };

  // This test gets the id of the clicked recipe.
  $scope.fullRecipe=function(recipeID){
    console.log(recipeID);
  };

}) // End of RecipesController

.controller('RecipeDetailController', function($scope, $location, $routeParams, dataService) {

  $scope.changeView2 = function(view){
      $location.path(view);
  };

// if user clicks on edit page then get the data for that recipe and populate the fields
    //NOTE NOTE NOTE if($location.$$path === '/edit/' + $routeParams.id) {
        dataService.recipeById($routeParams.id, function(response) {
            $scope.recipe = response.data;
            console.log(response.data);
        });
    //}


}) // End of RecipeDetailController


// Services allow you to create a reusable set of functions and values that can be passed across the application.
// Methods inside the service are available to any controller that declares the service as a dependency
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

  this.recipesByCategory = function(chosenCategory, callback){
    $http.get('/api/recipes?category='+ chosenCategory.name) // pass in the key value to the api
    .then(callback);
};
  // NOTE This below never worked and could be a total mess.
  // GET /api/recipes/{id} - Gets the recipe for the specified ID.
  this.recipeById = function(id, callback) {
    $http.get('/api/recipes/' + id)
    .then(callback);
  };
    // PUT /api/recipes/{id} - Updates the recipe for the specified ID.
    // POST /api/recipes - Adds a recipe.
    // DELETE /api/recipes/{id} - Deletes the recipe for the specified ID.

});




})(); // end of IIFE

// LESSONS LEARNT
// All the services match up with a route in the src/api folder.

// Notes from the tutorial:
// the controller is in charge of the DOM sub-tree under (and including) the <body> element.
// The expressions in curly braces ({{phone.name}} and {{phone.snippet}}) denote bindings, which are referring to our application model, which is set up in our PhoneListController controller.
// The PhoneListController controller attaches the phone data to the $scope that was injected into our controller function. This scope is a prototypal descendant of the root scope that was created when the application was defined. This controller scope is available to all bindings located within the <body ng-controller="PhoneListController"> tag.
//The concept of a scope in AngularJS is crucial. A scope can be seen as the glue which allows the template, model, and controller to work together. AngularJS uses scopes, along with the information contained in the template, data model, and controller, to keep models and views separate, but in sync
// One Feature per File
//It might be tempting, for the sake of simplicity, to put everything in one file, or have one file per type; e.g. all controllers in one file, all components in another file, all services in a third file, and so on. This might seem to work well in the beginning, but as our application grows it becomes a burden to maintain. As we add more and more features, our files will get bigger and bigger and it will be difficult to navigate and find the code we are looking for.
// Instead we should put each feature/entity in its own file. Each stand-alone controller will be defined in its own file, each component will be defined in its own file, etc.
