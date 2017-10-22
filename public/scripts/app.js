(function() { // Wrap all of your JavaScript application, controller, and services code in immediately invoked functions in order to prevent from polluting the global namespace.
'use strict';

angular.module("app", ['ngRoute'])

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
