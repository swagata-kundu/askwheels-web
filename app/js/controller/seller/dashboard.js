app.controller("sellerDashboard", [
  "$scope",
  "$state",
  "sellerService",
  "$q",
  function($scope, $state, sellerService, $q) {
    $scope.tabinfo = {
      liveAuctions: [],
      pendingAuctions: [],
      upcomingAuctions: [],
      rejectedAuctions: []
    };
    $scope.tags = [];
    $scope.auctions = [];
    $scope.subsellers = [];
    $scope.subsellerSelections = [];

    $scope.loadUser = function() {
      var deferred = $q.defer();
      deferred.resolve($scope.subsellers);

      return deferred.promise;
    };

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
            text: user.firstName + " " + user.lastName
          };
        });
      },
      function(error) {}
    );
  }
]);
