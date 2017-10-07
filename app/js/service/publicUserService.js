app.service('publicUserService', ['$http', 'serviceURI', 'localStorageService', '$q', '$rootScope', function ($http, serviceURI, localStorageService, $q, $rootScope) {

    this.changePassword = function (params) {
        var uri = serviceURI.changePasswordPublicUserURI;

        return $http({
            method: "POST",
            url: uri,
            data: params,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.editUserProfile = function (profile) {
        var uri = serviceURI.userBase;

        return $http({
            method: "PATCH",
            url: uri,
            data: profile,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

}]);