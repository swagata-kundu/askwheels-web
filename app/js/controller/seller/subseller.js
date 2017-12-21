app.controller("subsellerListing", [
  "$scope",
  "$state",
  "$uibModal",
  "sellerService",
  function($scope, $state, $uibModal, sellerService) {
    $scope.subsellers = [];
    sellerService.subsellerListing({}).then(
      function(result) {
        $scope.subsellers = result.data.data;
      },
      function(error) {
        $scope.subsellers = [];
      }
    );

    $scope.changePassword = function(userId) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: "views/seller/subuserpassword.html",
        controller: "changeSubUserPassword",
        resolve: {
          userId: function() {
            return userId;
          }
        }
      });
      modalInstance.result.then(function() {}, function() {});
    };
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

app.controller("subsellerAuctions", [
  "$scope",
  "$state",
  "sellerService",
  "$q",
  function($scope, $state, sellerService, $q) {
    $scope.auctions = [];
    $scope.params = $state.params;
    $scope.filter = {
      minPrice: "",
      maxPrice: "",
      fuelType: "",
      owner: "",
      transmission: ""
    };

    let auctionParams = {
      auctionType: 0
    };

    let getAuctions = function() {
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

      params.sub_sellers = $scope.params.subsellerId.toString();

      sellerService.getAuctionList(params).then(
        function(result) {
          $scope.auctions = result.data.data;
        },
        function(error) {
          $scope.auctions = [];
        }
      );
    };

    getAuctions();

    $scope.applyFilter = function() {
      getAuctions();
    };

    $scope.resetFilter = function() {
      $scope.filter = {
        minPrice: "",
        maxPrice: "",
        fuelType: "",
        owner: "",
        transmission: ""
      };
      getAuctions();
    };
  }
]);

app.controller("changeSubUserPassword", [
  "$scope",
  "publicUserService",
  "$state",
  "$uibModalInstance",
  "userId",
  function($scope, publicUserService, $state, $uibModalInstance, userId) {
    $scope.user = {};
    var subUserId = userId;
    $scope.cancel = function() {
      $uibModalInstance.dismiss("cancel");
    };

    $scope.changePassword = function() {
      if ($scope.changePasswordFrm.$valid) {
        var requestParams = {
          newPassword: $scope.user.newPassword,
          userId: subUserId
        };
        publicUserService
          .changePassword(requestParams)
          .then(function(response) {
            bootbox.alert(response.data.message, function() {
              $uibModalInstance.close("ok");
            });
          })
          .catch(function(error) {
            $uibModalInstance.dismiss("cancel");
            showErrorMessage(error);
          });
      }
    };
  }
]);
