'use strict';

app.controller('loginController', [
    '$scope',
    'authService',
    '$state',
    '$location',
    'localStorageService',
    '$rootScope',
    function ($scope, authService, $state, $location, localStorageService, $rootScope) {

        $scope.forgetData = {};
        $scope.loginData = {};

        $scope.login = function () {

            if ($scope.loginForm.$valid) {
                var loginData = $scope.loginData;
                var loginRequstParams = {
                    "email": loginData.emailId,
                    "password": loginData.password
                };

                authService
                    .login(loginRequstParams)
                    .then(function (response) {
                        var returnUrl = $rootScope.returnToUrl;
                        $rootScope.returnToUrl = null;
                        if (returnUrl != null) {
                            $location.path(returnUrl);
                        } else {
                            if ($rootScope.userProfile.roleId == 4) {
                                $location.path('/admin/sellers');
                            } else {
                                $location.path('/');
                            }
                        }
                    })
                    .catch(function (error) {
                        showErrorMessage(error);
                    });
            }
        };

        $scope.showForgotPassword = function () {
            if ($scope.showForgotPasswordSection == true) 
                $scope.showForgotPasswordSection = false;
            else 
                $scope.showForgotPasswordSection = true;
            }
        
        $scope.forgetPassword = function () {
            if ($scope.forgetPassForm.$valid) {
                authService
                    .forgetPassword($scope.forgetData.email)
                    .then(function (response) {
                        bootbox.alert('New password sent to your registered email');
                    }, function (error) {
                        showErrorMessage(error);
                    });
            }
        };

    }
]);

app.controller('joinus', [
    '$scope',
    'authService',
    '$state',
    '$location',
    '$rootScope',
    function ($scope, authService, $state, $location, $rootScope) {
        $scope.user = {};

        $scope.signUp = function () {

            // if ($scope.user.repeatPassword != undefined && $scope.user.password !=
            // undefined && $scope.user.repeatPassword.length > 0 &&
            // $scope.user.password.length > 0) {
            // $scope.signupForm.confirmPass.$error.noMatch = $scope.user.password !==
            // $scope.user.repeatPassword;     if
            // ($scope.signupForm.confirmPass.$error.noMatch) { $scope.signupForm.$valid =
            // false;     } }

            if ($scope.signupForm.$valid) {
                let names = $scope
                    .user
                    .name
                    .split(' ');
                let firstName = names[0];
                let lastName = names.length > 1
                    ? names[1]
                    : '';

                var requestParams = {
                    'firstName': firstName,
                    'lastName': lastName,
                    'email': $scope.user.email,
                    'contactNo': $scope.user.contactNo,
                    'password': $scope.user.password,
                    'roleId': parseInt($scope.user.roleId),
                    'address': $scope.user.address
                };

                authService
                    .isEmailExist($scope.user.email)
                    .then(function (response) {

                        if (response.data.isExists) {} else {
                            authService
                                .signUp(requestParams)
                                .then(function (response) {
                                    if ($rootScope.userProfile.roleId == 4) {
                                        $location.path('/admin/sellers');
                                    } else {
                                        $location.path('/');
                                    }
                                })
                                .catch(function (error) {
                                    showErrorMessage(error);
                                });
                        }
                    });
            }

        };

    }
]);