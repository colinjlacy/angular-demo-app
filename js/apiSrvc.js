/*
Welcome to your first Angular service!

What's a service you might ask?  A service in Angular is very much like a service in Java.  It's a collection of functions that you're going to call throughout your application.  Think of it as modular code that you can separate out of your application into bits that are only called where you need them to be.

This particular service is going to be used to make API calls.
 */
angular.module('nolaTraining')
.service('apiSrvc', function($http, $q) {

        /*
        Any time you reference a service in a controller, it will be pulled in as an object, instead of a function (which it clearly is). Thus, below you're returning the contents of that object, which are callable functions - essentially methods.
         */
        return {

            // creating the GET call
            getData: function (url) {
                // this creates an object that will be expecting a set of asynchronous data
                var returnData = $q.defer();

                // here, we make the call to the database
                $http({
                    url: url,
                    method: 'GET'
                })
                    // the success method fires if the backend successfully returned data
                    .success(function (data) {
                        // we'll set the data that's returned to the object expecting asynchronous data.
                        returnData.resolve(data);
                    })
                    // if the backend returned an error, we pass the error to the client instead.
                    .error(function (error) {
                        console.log(error);
                        returnData.reject();
                    });
                // now we return the promise of the API call - whether successful or not
                return returnData.promise;
            }
        }
    });