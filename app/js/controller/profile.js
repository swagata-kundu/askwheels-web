app.controller("changePassword", [
  "$scope",
  "publicUserService",
  "$state",
  function($scope, publicUserService, $state) {
    $scope.user = {};

    $scope.changePassword = function() {
      if ($scope.changePasswordFrm.$valid) {
        var requestParams = {
          oldPassword: $scope.user.oldPassword,
          newPassword: $scope.user.newPassword
        };

        publicUserService
          .changePassword(requestParams)
          .then(function(response) {
            bootbox.alert(response.data.message, function() {
              $state.go("userProfile");
            });
          })
          .catch(function(error) {
            showErrorMessage(error);
          });
      }
    };
  }
]);

app.controller("userProfile", [
  "$scope",
  "publicUserService",
  "$state",
  "localStorageService",
  function($scope, publicUserService, $state, localStorageService) {
    $scope.user = {};

    $scope.isEditEnabled = false;

    var fillUserProfileData = function(userProfileData) {
      $scope.user.name =
        userProfileData.firstName + " " + userProfileData.lastName;
      $scope.user.contactNo = userProfileData.contactNo;
      $scope.user.address = userProfileData.address;
    };

    var updateLocalStorage = function(updatedProfile) {
      var ls = localStorageService.get("userProfile");
      ls.firstName = updatedProfile.firstName;
      ls.lastName = updatedProfile.lastName;
      ls.address = updatedProfile.address;
      ls.contactNo = updatedProfile.contactNo;
      localStorageService.set("userProfile", ls);
    };

    fillUserProfileData(localStorageService.get("userProfile"));

    $scope.editProfile = function() {
      if ($scope.editProfileForm.$valid) {
        let names = $scope.user.name.split(" ");
        let firstName = names[0];
        let lastName = names.length > 1 ? names[1] : "";
        var updatedProfile = {
          firstName: firstName,
          lastName: lastName,
          address: $scope.user.address
        };

        publicUserService.editUserProfile(updatedProfile).then(
          function(response) {
            updatedProfile.contactNo = $scope.user.contactNo;
            updateLocalStorage(updatedProfile);
            bootbox.alert("Profile Updated Successfully");
            $scope.changeProfileFlag();
          },
          function(error) {
            showErrorMessage(error);
          }
        );
      }
    };

    $scope.changeProfileFlag = function() {
      $scope.isEditEnabled = !$scope.isEditEnabled;
    };
  }
]);
