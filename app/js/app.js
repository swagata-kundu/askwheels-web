'use strict';

var app = angular.module('askwheels', ['ui.router', 'angular-loading-bar', 'LocalStorageModule', 'ngAnimate', 'ui.bootstrap']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html'
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

        .state('changePassword', {
            url: '/changepassword',
            templateUrl: 'views/changePassword.html',
            controller: 'changePassword',
            resolve: {
                access: ["Access", function (Access) {
                    return Access.isAuthenticated();
                }]
            }
        })

        .state('userProfile', {
            url: '/userprofile',
            templateUrl: 'views/userProfile.html',
            controller: 'userProfile',
            resolve: {
                access: ["Access", function (Access) {
                    return Access.isAuthenticated();
                }]
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
            $state.go('login', {
                notify: false
            });
        }
        if (error == Access.FORBIDDEN) {
            event.preventDefault();
            $state.go('home', {
                notify: false
            });
        }
    });

}]);