app.controller("sellerDashboard", [
  "$scope",
  "$state",
  "sellerService",
  function($scope, $state, sellerService) {
    $scope.tabinfo = {
      liveAuctions: [],
      pendingAuctions: [],
      upcomingAuctions: [],
      rejectedAuctions: []
    };

    $scope.auctions = [];
    $scope.subsellers = [];
    $scope.subsellerSelections = [];

    sellerService.getDashboardInfo().then(
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
      sellerService.getAuctionList(auctionParams).then(
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

    sellerService.subsellerListing({}).then(
      function(result) {
        $scope.subsellers = result.data.data.map(function(user) {
          return {
            id: user.userId,
            label: user.firstName + " " + user.lastName
          };
        });
      },
      function(error) {}
    );
  }
]);
