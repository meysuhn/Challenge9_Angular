# Single Page App in AngularJS 
## FullStack Tech Degree Project 9

### AngularJS, Node, Express, JavaScript

#### Getting Started

Open a Command Prompt (on Windows) or Terminal (on Mac OS X and Linux) instance and browse to the root project folder and run the following commands:

##### Install dependencies
`npm install` Install dependencies

##### Build the database
`npm run-script db`

##### Run the application
`npm start`

##### View the application
Open your web browser and browse to http://localhost:5000/

![screenshot](https://user-images.githubusercontent.com/15713718/32322657-2eb824b6-bfbd-11e7-8f47-74a64d1c57d0.png)
#### Example Code
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
### By Chris Mason
31st October 2017
