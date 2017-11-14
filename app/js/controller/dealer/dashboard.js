app.controller("dealerDashobard", [
  "$scope",
  "$state",
  "dealerService",
  function($scope, $state, dealerService) {
    $scope.tabinfo = {
      liveAuctions: [],
      upcomingAuctions: []
    };

    $scope.auctions = [];
    $scope.filter = {
      minPrice: "",
      maxPrice: "",
      fuelType: "",
      owner: 0,
      transmission: ""
    };

    dealerService.getDashboardInfo().then(
      function(result) {
        $scope.tabinfo = result.data.data;
      },
      function(error) {}
    );

    let auctionParams = {
      auctionType: 1
    };

    let getAuctions = function() {
      $scope.auctions = [];
      dealerService.getAuctionList(auctionParams).then(
        function(result) {
          $scope.auctions = result.data.data;
        },
        function(error) {
          $scope.auctions = [];
        }
      );
    };

    $scope.tabChange = function(auctionType) {
      auctionParams.auctionType = auctionType;
      getAuctions();
    };

    getAuctions();

    $scope.applyFilter = function() {};

    $scope.resetFilter = function() {
      $scope.filter = {
        minPrice: "",
        maxPrice: "",
        fuelType: "",
        owner: "",
        transmission: ""
      };
    };
  }
]);
