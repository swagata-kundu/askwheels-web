'use strict';

var app = angular.module('myNightOutApp', ['ui.router', 'angular-loading-bar', 'LocalStorageModule', 'ngAnimate', 'ui.bootstrap', 'ngDialog']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('welcome');

    $stateProvider
        .state('home', {
            url: '/welcome',
            templateUrl: 'views/home.html'
        })
        .state('home.login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginController',
            resolve: {
                access: ["Access", function (Access) { return Access.isAnonymous(); }]
            }
        })
         .state('login', {
             url: '/login',
             templateUrl: 'views/login.html',
             controller: 'loginController'
         })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: 'signUp'
        })
        .state('home.signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: 'signUp'
        })
         .state('home.register', {
             url: '/register',
             templateUrl: 'views/authentication/businessOwnerRegistration.html',
             controller: 'businessOwnerManagement'
         })
         .state('changePassword', {
             url: '/changepassword',
             templateUrl: 'views/changePassword.html',
             controller: 'changePassword',
             resolve: {
                 access: ["Access", function (Access) { return Access.isAuthenticated(); }]
             }
         })
         .state('myFavorites', {
             url: '/myfavorites',
             templateUrl: 'views/myFavoriteBusiness.html',
             controller: 'favoriteBusiness',
             resolve: {
                 access: ["Access", function (Access) { return Access.isAuthenticated(); }]
             }
         })
         .state('userProfile', {
             url: '/userprofile',
             templateUrl: 'views/userProfile.html',
             controller: 'userProfile',
             //authenticate: true
             resolve: {
                 access: ["Access", function (Access) { return Access.isAuthenticated(); }]
             }
         })

});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('interceptorFactory');
});

app.run(['$rootScope', 'authService', '$state', 'Access', function ($rootScope, authService, $state, Access) {

    //debugger
    authService.loadData();

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
       // debugger

        if (error == Access.UNAUTHORIZED) {
            event.preventDefault();
            $state.go('login', { notify: false });
        }
        if (error == Access.FORBIDDEN) {
            event.preventDefault();
            $state.go('home', { notify: false });
        }
    });

}]);