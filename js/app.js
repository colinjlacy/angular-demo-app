angular.module('nolaTraining', [
    'ngRoute'
])
    /*
We're going to chain our config() and controller() methods together in this example.  You don't have to, and in many cases you'd store them in different files.  I'm just doing it here for ease of reference, and because this application is unrealistically small.
 */
.config(['$routeProvider', function($routeProvider) {
        // let's configure the router
        $routeProvider.
            when('/', {                         // when the URL past the domain name and # is '/'
                templateUrl: 'views/home.html', // use the home template
                controller: 'homeCtrl'          // and use the homeCtrl controller
            }).
            when('/list', {
                templateUrl: 'views/list.html',
                controller: 'listCtrl'
            }).
            when('/form', {
                templateUrl: 'views/form.html',
                controller: 'listCtrl'
            }).
            when('/:id', {
                templateUrl: 'views/item.html',
                controller: 'itemCtrl'
            });
    }])
    .controller('initCrtrl', function($scope, $location) {
        // this is a scope method. it will only exist within this controller's scope.  Fortunately, this controller is at the highest level of the app's template hierarchy.  Therefore, it will persist across all routes.
        $scope.getPage = function(string) {
            return $location.url() === string;
        }
    })
    .controller('homeCtrl', function($scope, apiSrvc) {
        // this is a service call.  See if you can figure out what's going on here...
        apiSrvc.getData('/data/home.mockdata.json').then(function(data) {
            $scope.page = data;
        });
    })
    .controller('listCtrl', function($scope, apiSrvc) {
        apiSrvc.getData('/data/list.mockdata.json').then(function(data) {
            $scope.page = data;
        });
    })
    .controller('itemCtrl', function($scope, $routeParams, apiSrvc) {
        // notice that this API call uses the routeParams object to set the API URL.  What do you think that means?  How do we know what's in $routeParams?
        apiSrvc.getData('/data/'+ $routeParams.id +'.mockdata.json').then(function(data) {
            $scope.item = data;
        });
        // this scope method is only accessible inside this scope. That means it'll only be available to templates that use this controller.
        $scope.isChild = function(object) {
            return object.hasOwnProperty('isChild') && object.isChild === true;
        }
    });
