'use strict';

app.service('authService', [
    '$http',
    'serviceURI',
    'localStorageService',
    '$q',
    '$rootScope',
    '$state',
    '$window',
    function ($http, serviceURI, localStorageService, $q, $rootScope, $state, $window) {

        var authentication = {
            isAuth: false
        };

        var loadData = function () {
            $rootScope.userProfile = localStorageService.get('userProfile') || authentication;
        };

        var logout = function () {
            authentication = {};
            authentication.isAuth = false;
            localStorageService.remove('userProfile');
            loadData();
            $rootScope.$emit('showHideLogOut');
            $window
                .location
                .assign('/');
        };

        this.login = function (loginRequest) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                url: serviceURI.loginURI,
                data: loginRequest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function ({
                data,
                headers
            }) {
                saveSession(data, headers);
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.signUp = function (requestParams) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                url: serviceURI.signUpURI,
                data: requestParams,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function ({
                data,
                headers
            }) {
                // saveSession(data, headers);
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.isEmailExist = function (emailId) {

            var urlToService = serviceURI.checkEmailExistsURI + "/" + emailId;
            return $http({
                method: "GET",
                url: urlToService,
                data: '',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };

        this.forgetPassword = function (emailId) {

            var urlToService = serviceURI.forgetPassword;
            return $http({
                method: "POST",
                url: urlToService,
                data: {
                    email: emailId
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };

        this.loadData = loadData;

        this.logout = logout;

        function saveSession(data, headers) {
            authentication.isAuth = true;
            authentication.token = headers('sessionId');
            authentication.userId = data.data.userId;
            authentication.email = data.data.email;
            authentication.firstName = data.data.firstName;
            authentication.lastName = data.data.lastName;
            authentication.contactNo = data.data.contactNo;
            authentication.roleId = data.data.roleId;
            localStorageService.set('userProfile', authentication);
            $rootScope.$emit('showHideLogOut');
            loadData();
        }

    }
]);