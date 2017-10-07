'use strict';

var app = angular.module('askwheels', [
    'ui.router',
    'angular-loading-bar',
    'LocalStorageModule',
    'ngAnimate',
    'ui.bootstrap',
    'bw.paging',
    'angular-confirm'
]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('login', {
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'loginController',
        resolve: {
            access: [
                "Access",
                function (Access) {
                    return Access.isAnonymous();
                }
            ]
        }
    }).state('changePassword', {
        url: '/changepassword',
        templateUrl: 'views/changePassword.html',
        controller: 'changePassword',
        resolve: {
            access: [
                "Access",
                function (Access) {
                    return Access.isAuthenticated();
                }
            ]
        }
    }).state('userProfile', {
        url: '/userprofile',
        templateUrl: 'views/userProfile.html',
        controller: 'userProfile',
        resolve: {
            access: [
                "Access",
                function (Access) {
                    return Access.isAuthenticated();
                }
            ]
        }
    }).state('adminDashBoard', {
        url: '/admin',
        templateUrl: 'views/admin/dashboard.html',
        controller: '',
        resolve: {
            access: [
                "Access",
                function (Access) {
                    return Access.hasRole(4);
                }
            ]
        }
    }).state('sellerListing', {
        url: '/admin/sellers',
        templateUrl: 'views/admin/sellerlisting.html',
        controller: 'sellerListing',
        resolve: {
            access: [
                "Access",
                function (Access) {
                    return Access.hasRole(4);
                }
            ]
        }
    }).state('subSellerListing', {
        url: '/admin/:sellerId/subsellers',
        templateUrl: 'views/admin/subsellerlisting.html',
        controller: 'subSellerListing',
        resolve: {
            access: [
                "Access",
                function (Access) {
                    return Access.hasRole(4);
                }
            ]
        }
    })

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
                $state.go('login', {notify: false});
            }
            if (error == Access.FORBIDDEN) {
                event.preventDefault();
                $state.go('sellerListing', {notify: false});

            }
        });

    }
]);