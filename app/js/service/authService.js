'use strict';


app.service('authService', ['$http', 'serviceURI', 'localStorageService', '$q', '$rootScope', function ($http, serviceURI, localStorageService, $q, $rootScope) {

    var authentication = {
        isAuth: false
    };

    var loadData = function () {
        $rootScope.userProfile = localStorageService.get('userProfile') || authentication;
    }

    var logout = function () {
        authentication = {};
        authentication.isAuth = false;
        localStorageService.remove('userProfile');
        loadData();
        $rootScope.$emit('showHideLogOut');
    }

    this.login = function (loginRequest) {
        var deferred = $q.defer();
        return $http({
            method: "POST",
            url: serviceURI.loginURI,
            data: loginRequest,
            headers: { 'Content-Type': 'application/json' }
        })
            .success(function (data, status, headers, config) {

                authentication.isAuth = true;
                authentication.token = headers('sessionId');
                authentication.userId = data.data.userId;
                authentication.email = data.data.email;
                authentication.firstName = data.data.firstName;
                authentication.lastName = data.data.lastName;
                authentication.contactNo = data.data.contactNo;
                authentication.roleId = data.data.roleId;

                localStorageService.set('userProfile', authentication);

                loadData();

                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                deferred.reject(data);
            });
        return deferred.promise;
    };

    this.signUp = function (requestParams) {
        return $http({
            method: "POST",
            url: serviceURI.signUpURI,
            data: requestParams,
            headers: { 'Content-Type': 'application/json' }
        });
    };

    this.isEmailExist = function (emailId) {

        var urlToService = serviceURI.checkEmailExistsURI + "/" + emailId;

        var deferred = $q.defer();
        $http({
            method: "GET",
            url: urlToService,
            data: '',
            headers: { 'Content-Type': 'application/json' }

        })
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                deferred.reject(data);

            });
        return deferred.promise;
    };

    this.loadData = loadData;

    this.logout = logout;


}]);
