"use strict";

var app = angular.module("askwheelsAdmin", [
  "ui.router",
  "angular-loading-bar",
  "LocalStorageModule",
  "ngAnimate",
  "ui.bootstrap",
  "bw.paging",
  "angular-confirm",
  "ngFileUpload"
]);

app.config(function(
  $stateProvider,
  $urlRouterProvider,
  $locationProvider,
  cfpLoadingBarProvider
) {
  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise("/admin");

  $stateProvider
    .state("adminDashBoard", {
      url: "/admin",
      templateUrl: "views/dashboard.html",
      controller: "dashboard",
      resolve: {
        access: [
          "Access",
          function(Access) {
            return Access.hasRole(4);
          }
        ]
      }
    })
    .state("sellerListing", {
      url: "/admin/sellers",
      templateUrl: "views/admin/sellerlisting.html",
      controller: "sellerListing",
      resolve: {
        access: [
          "Access",
          function(Access) {
            return Access.hasRole(4);
          }
        ]
      }
    })
    .state("subSellerListing", {
      url: "/admin/:sellerId/:sellerName/subsellers",
      templateUrl: "views/admin/subsellerlisting.html",
      controller: "subSellerListing",
      resolve: {
        access: [
          "Access",
          function(Access) {
            return Access.hasRole(4);
          }
        ]
      }
    })
    .state("dealerListing", {
      url: "/admin/dealers",
      templateUrl: "views/admin/dealerlisting.html",
      controller: "dealerListing",
      resolve: {
        access: [
          "Access",
          function(Access) {
            return Access.hasRole(4);
          }
        ]
      }
    })
    .state("auctionListing", {
      url: "/admin/auctions",
      templateUrl: "views/admin/auctionlist.html",
      controller: "auctionList",
      resolve: {
        access: [
          "Access",
          function(Access) {
            return Access.hasRole(4);
          }
        ]
      }
    })
    .state("changePassword", {
      url: "/admin/change-password",
      templateUrl: "views/admin/changepassword.html",
      controller: "changePassword",
      resolve: {
        access: [
          "Access",
          function(Access) {
            return Access.isAuthenticated();
          }
        ]
      }
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
      debugger;
      if (error == Access.UNAUTHORIZED) {
        $window.location.assign("/");
      }
      if (error == Access.FORBIDDEN) {
        debugger;
        event.preventDefault();
        $state.go("adminDashBoard", {
          notify: false
        });
      }
    });
  }
]);
