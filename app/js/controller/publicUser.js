
app.controller('changePassword', ['$scope', 'publicUserService', '$state', function ($scope, publicUserService, $state) {
    $scope.user = {};

    $scope.changePassword = function () {
      
        var newPassword = $scope.user.newPassword;
        var confirmPassword = $scope.user.confirmNewPassword; 

        if ((confirmPassword != undefined && newPassword != undefined) && (confirmPassword.length > 0 && newPassword.length > 0))
        {
            $scope.changePasswordFrm.confirmPass.$error.noMatch = newPassword !== confirmPassword;
            if ($scope.changePasswordFrm.confirmPass.$error.noMatch) {
                $scope.changePasswordFrm.$valid = false;
            }
        }

        if ($scope.changePasswordFrm.$valid) {       

            var requestParams = {
                "oldPassword": $scope.user.oldPassword,
                "newPassword": $scope.user.newPassword
            }
          
            publicUserService.changePassword(requestParams).then(function (response) {
                debugger             
                $scope.errors = "Password successfully changed";
                $scope.showErrors = true;
            }).catch(function (response) {
                debugger
              
                if (response.status = 404) {
                    $scope.errors = response.data.details[0];
                    $scope.showErrors = true;
                }
            });

        }

    }

}]);

app.controller('userProfile', ['$scope', 'publicUserService', '$state', 'localStorageService', function ($scope, publicUserService, $state, localStorageService) {

    $scope.user = {};
    //var userProfileData = localStorageService.get('userProfile');

    var fillUserProfileData = function (userProfileData) {
        $scope.user.firstName = userProfileData.firstName;
        $scope.user.lastName = userProfileData.lastName;
        $scope.user.contactNo = userProfileData.contactNo;
    }

    var updateLocalStorage = function (updatedProfile) {
        debugger
        var ls = localStorageService.get('userProfile');
        ls.firstName = updatedProfile.firstName;
        ls.lastName = updatedProfile.lastName;
        ls.contactNo = updatedProfile.contactNo;
        // localStorageService.remove('userProfile');
        localStorageService.set('userProfile', ls);
    }
        
    fillUserProfileData(localStorageService.get('userProfile'));

    $scope.editProfile = function () {
        if ($scope.editProfileForm.$valid) {           

            publicUserService.editUserProfile($scope.user).then(function (response) {                
                debugger
                var updatedProfile = {
                    firstName: $scope.user.firstName,
                    lastName : $scope.user.lastName,
                    contactNo: $scope.user.contactNo
                }
                updateLocalStorage(updatedProfile);
                alert("Profile Updated Successfully");
            },
            function (response) {               
            });
        }
    }    

}]);