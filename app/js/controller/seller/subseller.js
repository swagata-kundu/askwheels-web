app.controller("subsellerListing", [
  "$scope",
  "$state",
  "sellerService",
  function($scope, $state, sellerService) {
    $scope.subsellers = [];
    sellerService.subsellerListing({}).then(
      function(result) {
        $scope.subsellers = result.data.data;
      },
      function(error) {
        $scope.subsellers = [];
      }
    );
  }
]);
