"use strict";

var app = angular.module("askwheels", [
  "ui.router",
  "LocalStorageModule",
  "ui.bootstrap",
  "angularjs-dropdown-multiselect"
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("login", {
      url: "/",
      templateUrl: "views/login.html",
      controller: "loginController",
      resolve: {
        access: [
          "Access",
          function(Access) {
            return Access.isAnonymous();
          }
        ]
      }
    })
    .state("joinus", {
      url: "/join-us",
      templateUrl: "views/joinus.html",
      controller: "joinus",
      resolve: {
        access: [
          "Access",
          function(Access) {
            return Access.isAnonymous();
          }
        ]
      }
    })
    .state("forget", {
      url: "/forget-password",
      templateUrl: "views/forgetpassword.html",
      controller: "forgetpassword",
      resolve: {
        access: [
          "Access",
          function(Access) {
            return Access.isAnonymous();
          }
        ]
      }
    })
    .state("sellerDashboard", {
      url: "/seller/dashboard",
      templateUrl: "views/seller/dashboard.html",
      controller: "sellerDashboard"
    })
    .state("sellerSubSeller", {
      url: "/seller/subusers",
      templateUrl: "views/seller/subseller.html",
      controller: "subsellerListing"
    })
    .state("dealerDashboard", {
      url: "/dealer/dashboard",
      templateUrl: "views/dealer/dashboard.html",
      controller: "dealerDashobard"
    });
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push("interceptorFactory");
});

app.run([
  "$rootScope",
  "authService",
  "$state",
  "Access",
  "$window",
  function($rootScope, authService, $state, Access, $window) {
    authService.loadData();
    $rootScope.$on("$stateChangeError", function(
      event,
      toState,
      toParams,
      fromState,
      fromParams,
      error
    ) {
      if (error == Access.UNAUTHORIZED) {
        $state.go("login", {
          notify: false
        });
      }
      if (error == Access.FORBIDDEN) {
        event.preventDefault();
        if ($rootScope.userProfile.roleId === 4) {
          $window.location.assign("/admin");
        }
        if ($rootScope.userProfile.roleId === 1) {
          $state.go("sellerDashboard");
        }
        if ($rootScope.userProfile.roleId === 1) {
          $state.go("dealerDashboard");
        }
      }
    });
  }
]);
