app.directive("auctionLive", function() {
  return {
    templateUrl: "views/seller/auctionlive.html",
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
