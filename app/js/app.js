"use strict";

var app = angular.module("askwheels", [
  "ui.router",
  "LocalStorageModule",
  "ui.bootstrap",
  "ngTagsInput",
  "ngFileUpload"
]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
          function (Access) {
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
          function (Access) {
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
          function (Access) {
            return Access.isAnonymous();
          }
        ]
      }
    })
    .state("userProfile", {
      url: "/profile",
      templateUrl: "views/profile.html",
      controller: "userProfile",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.isAuthenticated();
          }
        ]
      }
    })
    .state("changeUserPassword", {
      url: "/profile/changepassword",
      templateUrl: "views/changepassword.html",
      controller: "changePassword",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.isAuthenticated();
          }
        ]
      }
    })
    .state("sellerDashboard", {
      url: "/seller/dashboard",
      templateUrl: "views/seller/dashboard.html",
      controller: "sellerDashboard",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasAnyRole([1, 2]);
          }
        ]
      }
    })
    .state("subsellerAuctions", {
      url: "/seller/subuser/{subsellerId:int}/{name}/auctions",
      templateUrl: "views/seller/subsellerauctions.html",
      controller: "subsellerAuctions",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasRole(1);
          }
        ]
      }
    })
    .state("sellerSubSeller", {
      url: "/seller/subusers",
      templateUrl: "views/seller/subseller.html",
      controller: "subsellerListing",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasAnyRole([1, 2]);
          }
        ]
      }
    })
    .state("sellerAddAuction", {
      url: "/seller/auction",
      templateUrl: "views/seller/addvehicle.html",
      controller: "sellerAddAuction",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasAnyRole([1, 2]);
          }
        ]
      }
    })
    .state("sellerAddSubseller", {
      url: "/seller/subuser/:id",
      templateUrl: "views/seller/addsubseller.html",
      controller: "subsellerAdd",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasAnyRole([1, 2]);
          }
        ]
      }
    })
    .state("dealerDashboard", {
      url: "/dealer/dashboard",
      templateUrl: "views/dealer/dashboard.html",
      controller: "dealerDashobard",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasRole(3);
          }
        ]
      }
    })
    .state("sellerAuctionDetail", {
      url: "/seller/auction/{vehicleId:int}/{model}",
      templateUrl: "views/seller/vehicledetail.html",
      controller: "sellerAuctionDetail",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasAnyRole([1, 2]);
          }
        ]
      }
    })
    .state("dealerAuctionDetail", {
      url: "/dealer/auction/{vehicleId:int}/{model}",
      templateUrl: "views/seller/vehicledetail.html",
      controller: "sellerAuctionDetail",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasRole(3);
          }
        ]
      }
    })
    .state("dealerWatchList", {
      url: "/dealer/watch",
      templateUrl: "views/dealer/wishlist.html",
      controller: "dealerWatchList",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasRole(3);
          }
        ]
      }
    }).state("dealerWins", {
      url: "/dealer/wins",
      templateUrl: "views/dealer/wins.html",
      controller: "dealerWins",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasRole(3);
          }
        ]
      }
    })
    .state("dealerBidList", {
      url: "/dealer/bids",
      templateUrl: "views/dealer/bids.html",
      controller: "dealerBids",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasRole(3);
          }
        ]
      }
    })
    .state("sellerBids", {
      url: "/seller/bids",
      templateUrl: "views/seller/bids.html",
      controller: "sellerBids",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasAnyRole([1, 2]);
          }
        ]
      }
    })
    .state("sellerNotification", {
      url: "/seller/notifications",
      templateUrl: "views/seller/notification.html",
      controller: "sellerNotification",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasAnyRole([1, 2]);
          }
        ]
      }
    }).state("sellerClosedDeals", {
      url: "/seller/closed-bids",
      templateUrl: "views/seller/closeddeals.html",
      controller: "sellerClosedDeals",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasAnyRole([1, 2]);
          }
        ]
      }
    })
    .state("sellerPayments", {
      url: "/seller/payments",
      templateUrl: "views/seller/payments.html",
      controller: "sellerPayments",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasAnyRole([1, 2]);
          }
        ]
      }
    })
    .state("dealerNotification", {
      url: "/dealer/notifications",
      templateUrl: "views/dealer/notification.html",
      controller: "dealerNotification",
      resolve: {
        access: [
          "Access",
          function (Access) {
            return Access.hasRole(3);
          }
        ]
      }
    })

    .state("help", {
      url: "/help",
      templateUrl: "views/help.html"
    })
    .state("terms", {
      url: "/terms",
      templateUrl: "views/terms.html"
    });
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push("interceptorFactory");
});

app.run([
  "$rootScope",
  "authService",
  "$state",
  "Access",
  "$window",
  function ($rootScope, authService, $state, Access, $window) {
    authService.loadData();
    $rootScope.$on("$stateChangeError", function (
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
        if ($rootScope.userProfile.roleId === 3) {
          $state.go("dealerDashboard");
        }
      }
    });
  }
]);