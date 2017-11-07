app.directive("auctionLive", function() {
  return {
    templateUrl: "views/seller/auctionlive.html",
    restrict: "E",
    scope: {
      vehicle: "=vehicle"
    },
    controller: [
      "$scope",
      "$state",
      "$rootScope",
      function($scope, $state, $rootScope) {
        console.log($scope.vehicle);
        
        if ($scope.vehicle) {
        }
      }
    ]
  };
});
