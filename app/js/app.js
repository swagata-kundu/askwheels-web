'use strict';

var app = angular.module('askwheels', [
    'ui.router',
    'LocalStorageModule'
]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'views/login.html',
            controller: 'loginController',
            resolve: {
                access: ["Access", function (Access) {
                    return Access.isAnonymous();
                }]
            }
        })
        .state('joinus', {
            url: '/join-us',
            templateUrl: 'views/joinus.html',
            controller: 'joinus',
            resolve: {
                access: [
                    "Access",
                    function (Access) {
                        return Access.isAnonymous();
                    }
                ]
            }
        }).state('forget', {
            url: '/forget-password',
            templateUrl: 'views/forgetpassword.html',
            controller: 'forgetpassword',
            resolve: {
                access: [
                    "Access",
                    function (Access) {
                        return Access.isAnonymous();
                    }
                ]
            }
        }).state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: ''
        });
});

app.config(function ($httpProvider) {
    $httpProvider
        .interceptors
        .push('interceptorFactory');
});

app.run([
    '$rootScope',
    'authService',
    '$state',
    'Access',
    function ($rootScope, authService, $state, Access) {

        authService.loadData();
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error == Access.UNAUTHORIZED) {
                $state.go('login', {
                    notify: false
                });
            }
            if (error == Access.FORBIDDEN) {
                event.preventDefault();
                $state.go('sellerListing', {
                    notify: false
                });

            }
        });

    }
]);