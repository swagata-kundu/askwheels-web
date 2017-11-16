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
        $scope.timings = "";
        if ($scope.vehicle) {
          var vehicle = $scope.vehicle;
          if (vehicle.auction_start_date && vehicle.auctionType <= 2) {
            var startDate = moment(vehicle.auction_start_date);
            var now = moment();
            if (startDate.isBefore(now)) {
              var newStart = startDate.add(1, "d");
              var duration = moment.duration(newStart.diff(now));
              var hour = duration.hours();
              var minutes = duration.minutes();
              $scope.timings = hour.toString() + ":" + minutes.toString();
            } else {
              var duration = moment.duration(startDate.diff(now));
              var hour = duration.hours();
              var minutes = duration.minutes();
              $scope.timings = hour.toString() + ":" + minutes.toString();
            }
          }
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
