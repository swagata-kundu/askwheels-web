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
    $scope.subsellers = [];
    $scope.subsellerSelections = [];

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
  }
]);
