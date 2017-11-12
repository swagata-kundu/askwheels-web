app.directive("auctionSeller", function() {
  return {
    templateUrl: "views/seller/auctions.html",
    restrict: "E",
    replace: true,
    scope: {
      vehicle: "=vehicle"
    },
    controller: [
      "$scope",
      "$state",
      "$rootScope",
      function($scope, $state, $rootScope) {
        if ($scope.vehicle) {
        }
      }
    ]
  };
});


app.directive("auctionDealer", function() {
  return {
    templateUrl: "views/dealer/auctions.html",
    restrict: "E",
    replace: true,
    scope: {
      vehicle: "=vehicle"
    },
    controller: [
      "$scope",
      "$state",
      "$rootScope",
      function($scope, $state, $rootScope) {
        if ($scope.vehicle) {
        }
      }
    ]
  };
});
