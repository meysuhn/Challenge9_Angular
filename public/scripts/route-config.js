
(function() {
  'use strict';

  // The Angular $routeProvider is used to configure routes for your application.

  // Three routes are configured below:
  // 1) The root of the application "/" which serves up the "Recipes" view.
  // 2) The recipe edit route "/edit/:id" which serves up the "Recipe Detail" view.
  // 3) The recipe add route "/add" which also serves up the "Recipe Detail" view.

  // TODO Uncomment this code after you've configured the `app` module.

  angular
    .module('app')
    .config(config);

// Beause the controllers are declared with a template URL here ng-controller declarations in the templates aren't necessary.
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'RecipesController', //The controller for /recipes.html view
        controllerAs: 'vm', // VM represents the View's Model (aka ViewModel).
        templateUrl: 'templates/recipes.html' // this is the template the controller is to apply to.
      })
      .when('/edit/:id', {
        controller: 'RecipeDetailController', //The controller for /recipe-detail.html view
        controllerAs: 'vm',
        templateUrl: 'templates/recipe-detail.html'
      })
      .when('/add', {
        controller: 'RecipeDetailController', //The controller for /recipe-detail.html view
        controllerAs: 'vm',
        templateUrl: 'templates/recipe-detail.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();
