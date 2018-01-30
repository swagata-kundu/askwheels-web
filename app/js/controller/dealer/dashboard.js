app.controller("dealerDashobard", [
  "$scope",
  "$state",
  "dealerService",
  function ($scope, $state, dealerService) {
    $scope.tabinfo = {
      liveAuctions: [],
      upcomingAuctions: []
    };

    $scope.auctions = [];
    $scope.filter = {
      minPrice: "",
      maxPrice: "",
      fuelType: "",
      owner: "",
      transmission: ""
    };

    dealerService.getDashboardInfo().then(
      function (result) {
        $scope.tabinfo = result.data.data;
      },
      function (error) {}
    );

    let auctionParams = {
      auctionType: 1
    };

    let getAuctions = function () {
      $scope.auctions = [];
      let params = {};
      params.auctionType = auctionParams.auctionType;
      if ($scope.filter.minPrice) {
        params.minPrice = parseInt($scope.filter.minPrice);
      }
      if ($scope.filter.maxPrice) {
        params.maxPrice = parseInt($scope.filter.maxPrice);
      }
      if ($scope.filter.fuelType) {
        params.fuel_type = $scope.filter.fuelType;
      }
      if ($scope.filter.owner) {
        params.owner_type = parseInt($scope.filter.owner);
      }
      if ($scope.filter.transmission) {
        params.transmission_type = $scope.filter.transmission;
      }

      dealerService.getAuctionList(params).then(
        function (result) {
          $scope.auctions = result.data.data;
        },
        function (error) {
          $scope.auctions = [];
        }
      );
    };

    $scope.tabChange = function (auctionType) {
      auctionParams.auctionType = auctionType;
      $scope.resetFilter();
    };

    getAuctions();

    $scope.applyFilter = function () {
      getAuctions();
    };

    $scope.resetFilter = function () {
      $scope.filter = {
        minPrice: "",
        maxPrice: "",
        fuelType: "",
        owner: "",
        transmission: ""
      };
      getAuctions();
    };

    $scope.$on("resetDealerList", function () {
      getAuctions();
    });
  }
]);

app.controller("dealerWatchList", [
  "$scope",
  "$state",
  "dealerService",
  function ($scope, $state, dealerService) {
    $scope.auctions = [];
    var getWishList = function () {
      dealerService.getWishList().then(function (result) {
        $scope.auctions = result.data.data;
      });
    };
    getWishList();
    $scope.$on("resetWishList", function () {
      getWishList();
    });
  }
]);

app.controller("dealerBids", [
  "$scope",
  "$state",
  "dealerService",
  function ($scope, $state, dealerService) {
    $scope.auctions = [];
    dealerService.dealerBidList().then(function (result) {
      $scope.auctions = result.data.data;
    });
  }
]);

app.controller("dealerBid", [
  "$scope",
  "$state",
  "dealerService",
  "$uibModalInstance",
  "vehicle",
  "bidAmount",
  function (
    $scope,
    $state,
    dealerService,
    $uibModalInstance,
    vehicle,
    bidAmount
  ) {
    $scope.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };
    $scope.submitBid = function () {
      dealerService
        .submitBid({
          vehicleId: vehicle.vehicleId,
          amount: bidAmount
        })
        .then(
          function (response) {
            $uibModalInstance.close("ok");
            bootbox.alert(response.data.message);
          },
          function (error) {
            $uibModalInstance.dismiss("cancel");
            showErrorMessage(error);
          }
        );
    };
  }
]);

app.controller("dealerNotification", [
  "$scope",
  "$state",
  "dealerService",
  function ($scope, $state, dealerService) {
    $scope.notifications = [];
    dealerService.getNotification({}).then(function (result) {
      $scope.notifications = result.data.data;
    });
  }
]);

app.controller("dealerWins", [
  "$scope",
  "$state",
  "dealerService",
  function ($scope, $state, dealerService) {
    $scope.auctions = [];
    var getWins = function () {
      dealerService.getWins().then(function (result) {
        $scope.auctions = result.data.data;
      });
    };
    getWins();
  }
]);