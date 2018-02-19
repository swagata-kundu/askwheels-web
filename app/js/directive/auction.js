app.directive("auctionSeller", function () {
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
      function ($scope, $state, $rootScope) {
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

app.directive("auctionDealer", function () {
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
      "dealerService",
      "$uibModal",
      function ($scope, $state, $rootScope, dealerService, $uibModal) {
        $scope.stateName = $state.current.name;
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

        $scope.addWatchList = function () {
          dealerService
            .addWishList({
              vehicleId: $scope.vehicle.vehicleId
            })
            .then(function (result) {
              $scope.$emit("resetWishList");
              if ($scope.vehicle.isWatchList == 1) {
                $scope.vehicle.isWatchList = 0;
              } else {
                $scope.vehicle.isWatchList = 1;
              }
            });
        };

        $scope.bidAmount = 0;
        $scope.submitBid = function (bidAmount) {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "views/dealer/bid.html",
            controller: "dealerBid",
            resolve: {
              vehicle: function () {
                return $scope.vehicle;
              },
              bidAmount: function () {
                return bidAmount;
              }
            }
          });
          modalInstance.result.then(
            function () {
              $scope.$emit("resetDealerList");
              $scope.bidAmount = 0;
            },
            function () {
              $scope.bidAmount = 0;
            }
          );
        };
      }
    ]
  };
});