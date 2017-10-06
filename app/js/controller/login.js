'use strict';

app.controller('loginController', ['$scope', 'authService', '$state', '$location', 'localStorageService', '$rootScope', 'siteInfo', function ($scope, authService, $state, $location, localStorageService, $rootScope, siteInfo) {

    $scope.forgetData = {};
    $scope.loginData = {};

    $scope.login = function () {

        if ($scope.loginForm.$valid) {
            var loginData = $scope.loginData;
            var loginRequstParams = {
                "email": loginData.emailId,
                "password": loginData.password
            };

            authService.login(loginRequstParams).then(function (response) {
                    $rootScope.$emit('showHideLogOut');
                    $scope.showErrors = false;
                    var returnUrl = $rootScope.returnToUrl;
                    $rootScope.returnToUrl = null;
                    if (returnUrl != null) {
                        $location.path(returnUrl);
                    } else {
                        if ($rootScope.userProfile.roleId == 2) {
                            $location.path('/businessuserdashboard');
                        } else {
                            $location.path('/');
                        }
                    }
                })
                .catch(function (response) {
                    if (response.status == 400) {
                        $scope.errors = response.data.message;
                        $scope.showErrors = true;
                    }
                    if (response.status == 401) {
                        $scope.errors = response.data.details[0];
                        $scope.showErrors = true;
                    }
                });
        }
    }

    $scope.showForgotPassword = function () {
        if ($scope.showForgotPasswordSection == true)
            $scope.showForgotPasswordSection = false;
        else
            $scope.showForgotPasswordSection = true;
    }

    $scope.forgetPassword = function () {
        if ($scope.forgetPassForm.$valid) {
            authService.isEmailExist($scope.forgetData.email).then(function (response) {
                if (!response.data.isExists) {
                    $scope.forgetPassForm.email.$error.emailExists = true;
                } else {
                    $scope.forgetPassForm.email.$error.emailExists = false;
                }
            });
        }
    }

}]);


app.controller('signUp', ['$scope', 'authService', '$state', function ($scope, authService, $state) {
    $scope.user = {};

    $scope.signUp = function () {

        if ($scope.user.repeatPassword != undefined && $scope.user.password != undefined && $scope.user.repeatPassword.length > 0 && $scope.user.password.length > 0) {
            $scope.signupForm.confirmPass.$error.noMatch = $scope.user.password !== $scope.user.repeatPassword;
            if ($scope.signupForm.confirmPass.$error.noMatch) {
                $scope.signupForm.$valid = false;
            }
        }

        if ($scope.signupForm.$valid) {
            var requestParams = {
                'firstName': $scope.user.firstName,
                'lastName': $scope.user.lastName,
                'email': $scope.user.email,
                'contactNo': $scope.user.contactNo,
                'password': $scope.user.password,
                'userType': 1
            }

            authService.isEmailExist($scope.user.email).then(function (response) {

                if (response.data.isExists) {
                    $scope.signupForm.email.$error.emailExists = true;
                } else {
                    authService.signUp(requestParams).then(function (response) {
                        $state.go('home.login');
                    }, function (response) {

                    });
                }
            });
        }

    }

}]);