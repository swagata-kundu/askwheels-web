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

app.controller("subsellerAdd", [
  "$scope",
  "$state",
  "sellerService",
  function($scope, $state, sellerService) {
    $scope.save = function() {
      if ($scope.addSubUser.$valid) {
        let names = $scope.user.name.split(" ");
        let firstName = names[0];
        let lastName = names.length > 1 ? names[1] : "";

        var requestParams = {
          firstName: firstName,
          lastName: lastName,
          contactNo: $scope.user.contactNo,
          password: $scope.user.password
        };
        sellerService
          .addSubseller(requestParams)
          .then(function(response) {
            bootbox.alert("Sub user added successfully", function() {
              $state.go("sellerSubSeller");
            });
          })
          .catch(function(error) {
            showErrorMessage(error);
          });
      }
    };
  }
]);
