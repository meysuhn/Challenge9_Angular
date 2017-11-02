# FullStack Tech Degree Project 9 - Single Page App in AngularJS

# Angular JS, Node, Express, JavaScript, HTML5, CSS3


## Getting Started

#### Open a Command Prompt (on Windows) or Terminal (on Mac OS X and Linux) instance and browse to the root project folder and run the following commands:

##### Install dependencies
`npm install`

##### Build the database
`npm run-script db`

##### Run the application
`npm start`

##### View the application
Open your web browser and browse to http://localhost:5000/

![screenshot](https://user-images.githubusercontent.com/15713718/32322657-2eb824b6-bfbd-11e7-8f47-74a64d1c57d0.png)

```Javascript
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

```

## Lessons Learnt

// Controllers are the glue that hold Anglular applications together.
  // It seems like Controllers are the link between the API/Services and the UI (HTML). They talk via the controller.
  // Controllers control the data of Angular applications
  // They are regular JS objects.
  // Angular apps are 'controlled' by controllers.
  // The controller allows us to establish data-binding between the model (the data) and the view (html)
  // Scope glues our controller and template together into a dynamic view.
  // Multiple controllers can use a service so long as they define the service as a dependency.
    // Any methods declared in the service are available to any controller that declares the service as a dependency.

// Services allow you to create a reusable set of functions and values that can be passed across the application.
  // Methods inside the service are available to any controller that declares the service as a dependency
  // A Service is a function or object that is available for, and limited to, your AngularJS application
  // There are ~30 built in services. Custom services can be created too.
  // Services are good for saving, deleting and editing data.

// Directives
  // Angular directives are extended HTML attributes with the prefix
  // the 'ng-app' directive in the HTML initialises an Angular application
    //  It bootsraps the new app, (e.g. ng-app="app">) here called app, into the index.html file.

// Routes
  // To navigate to different pages in an application but to keep it single page with no reloading you can use the ngRoute module
  // ngRoute module routes your application to different pages without reloading the entire application.

// Bindings
  // {{ double curly brackets represents a binding in Angular }}
  // The binding tells angular that it should evaluate an expression & insert the result into the DOM in place of the binding.

// When an angularJS directive is defined camelCase must be used. But when using it in the view (html) kebab-case needs to be used.
 // HTML attributes are not case sensitive, meaning that "someName" and "somename" is the same attribute. So the best style is to use "kebab-case" notation to separate words in attribute name. That's why we use "attribute-name" syntax for HTML attributes and tag names.
 // see https://stackoverflow.com/questions/33460274/angularjs-directive-naming-conventions
