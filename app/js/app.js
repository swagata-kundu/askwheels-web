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
            controller: 'loginController',
            resolve: {
                access: ["Access", function (Access) {
                    return Access.isAnonymous();
                }]
            },
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
        .state('adminDashBoard', {
            url: '/admin',
            templateUrl: 'views/admin/dashboard.html',
            controller: '',
            resolve: {
                access: ["Access", function (Access) {
                    return Access.hasRole(4);
                }]
            }
        })

});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('interceptorFactory');
});

app.run(['$rootScope', 'authService', '$state', 'Access', function ($rootScope, authService, $state, Access) {

    authService.loadData();
    console.log('here');
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        if (error == Access.UNAUTHORIZED) {
            $state.go('home', {
                notify: false
            });
        }
        if (error == Access.FORBIDDEN) {

        }
    });

}]);