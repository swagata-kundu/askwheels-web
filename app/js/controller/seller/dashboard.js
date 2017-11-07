app.controller("sellerDashboard", [
  "$scope",
  "$state",
  "sellerService",
  function($scope, $state, sellerService) {
    $scope.tabinfo = {
      liveAuctions: [],
      pendingAuctions: [],
      upcomingAuctions: []
    };

    $scope.auctions = [];

    $scope.example1data = [
      { id: 1, label: "David" },
      { id: 2, label: "Jhon" },
      { id: 3, label: "Danny" }
    ];
    $scope.example1model = [];

    sellerService.getDashboardInfo().then(
      function(result) {
        console.log(result.data.data);
        $scope.tabinfo = result.data.data;
      },
      function(error) {}
    );

    sellerService.getAuctionList().then(
      function(result) {
        $scope.auctions = result.data.data;
      },
      function(error) {}
    );
  }
]);
