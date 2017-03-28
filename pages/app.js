var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function($routeProvider){
   
    $routeProvider
    .when('/',{
       templateUrl:'home.html',
       controller: 'homeController'     
    })
    
    .when('/forecast', {
       templateUrl:'forecast.html',
       controller: 'forecastController'    
    })
    
    .when('/forecast/:days', {
       templateUrl:'forecast.html',
       controller: 'forecastController'    
    })
});

weatherApp.service('cityService', function(){
   this.city = 'Binghamton, NY' ;
});

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    console.log('Loaded homeController');
    
    $scope.city = cityService.city;
    console.log("City is: "+$scope.city);
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
}]);


weatherApp.controller('forecastController', ['$scope','$resource', '$routeParams','cityService', function($scope, $resource, $routeParams, cityService){
    console.log('Loaded forecastController');
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 2;
    $scope.weatherLink = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{
        callback : "JSON_CALLBACK"}, {get: {method: "JSONP"}});
    
    $scope.weatherResult = $scope.weatherLink.get({ q: $scope.city, cnt : $scope.days,appid:"6263ba661fb69010c1fceb87b78e74de"});
    console.log($scope.weatherResult);
    $scope.convertTemp = function(x){
        return Math.round((1.8 * (x-273)) + 32);
    }
    $scope.convertDate = function(d){
            return new Date(d*1000);
        }
    
    console.log($scope.weatherResult);
}]);