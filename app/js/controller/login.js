"use strict";

app.controller("loginController", [
  "$scope",
  "authService",
  "$state",
  "$location",
  "localStorageService",
  "$rootScope",
  "$window",
  function(
    $scope,
    authService,
    $state,
    $location,
    localStorageService,
    $rootScope,
    $window
  ) {
    $scope.forgetData = {};
    $scope.loginData = {};

    $scope.login = function() {
      if ($scope.loginForm.$valid) {
        var loginData = $scope.loginData;
        var loginRequstParams = {
          email: loginData.emailId,
          password: loginData.password
        };

        authService
          .login(loginRequstParams)
          .then(function(response) {
            var returnUrl = $rootScope.returnToUrl;
            $rootScope.returnToUrl = null;
            if (returnUrl != null) {
              $location.path(returnUrl);
            } else {
              if ($rootScope.userProfile.roleId == 4) {
                $window.location.assign("admin/");
              } else if ($rootScope.userProfile.roleId <= 2) {
                $state.go("sellerDashboard");
              }else{
                $state.go("dealerDashboard"); 
              }
            }
          })
          .catch(function(error) {
            showErrorMessage(error);
          });
      }
    };
  }
]);

app.controller("joinus", [
  "$scope",
  "authService",
  "$state",
  "$location",
  "$rootScope",
  function($scope, authService, $state, $location, $rootScope) {
    $scope.user = {};
    $scope.user.roleId = "1";
    $scope.signUp = function() {
      if ($scope.signupForm.$valid) {
        let names = $scope.user.name.split(" ");
        let firstName = names[0];
        let lastName = names.length > 1 ? names[1] : "";

        var requestParams = {
          firstName: firstName,
          lastName: lastName,
          email: $scope.user.email,
          contactNo: $scope.user.contactNo,
          password: $scope.user.password,
          roleId: parseInt($scope.user.roleId),
          address: $scope.user.address
        };

        authService.isEmailExist($scope.user.email).then(function(response) {
          if (response.data.isExists) {
            bootbox.alert("User already registered with this email id");
          } else {
            authService
              .signUp(requestParams)
              .then(function(response) {
                bootbox.alert("Sign up successfully");
                if ($rootScope.userProfile.roleId == 4) {
                } else {
                }
              })
              .catch(function(error) {
                showErrorMessage(error);
              });
          }
        });
      }
    };
  }
]);

app.controller("forgetpassword", [
  "$scope",
  "authService",
  "$state",
  function($scope, authService, $state) {
    $scope.forgetPassword = function() {
      if ($scope.forgetPassForm.$valid) {
        authService.forgetPassword($scope.emailId).then(
          function(response) {
            bootbox.alert("New password sent to your registered email");
            $state.go("login");
          },
          function(error) {
            showErrorMessage(error);
          }
        );
      }
    };
  }
]);
