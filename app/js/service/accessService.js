'use strict';

app.factory("Access", ["$q", "$rootScope", function ($q, $rootScope) {    

    var Access = {
        OK: 200,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,

        hasRole: function (role) {
           
            var deferred = $q.defer();
            if ($rootScope.userProfile != undefined && $rootScope.userProfile.isAuth && $rootScope.userProfile.roleId == role) {
                deferred.resolve(Access.OK);
            } else {
                deferred.reject(Access.UNAUTHORIZED);
            }

            return deferred.promise;
        },

        hasAnyRole: function (roles) {
            var deferred = $q.defer();
            if ($rootScope.userProfile != undefined && $rootScope.userProfile.isAuth && roles.find(function (n) { return n == $rootScope.userProfile.roleId }) != undefined) {
                deferred.resolve(Access.OK);
            } else {
                deferred.reject(Access.UNAUTHORIZED);
            } 
              
            return deferred.promise;
        },

        //$rootScope.userProfile.roleId

        isAnonymous: function () {
            var deferred = $q.defer();
            debugger;
            if ($rootScope.userProfile != undefined && !$rootScope.userProfile.isAuth) {
                deferred.resolve(Access.OK);
            } else {
                deferred.reject(Access.FORBIDDEN);
            }
            return deferred.promise;
        },

        isAuthenticated: function () {
           
            var deferred = $q.defer();
            if ($rootScope.userProfile != undefined && $rootScope.userProfile.isAuth) {
                deferred.resolve(Access.OK);
            } else {
                deferred.reject(Access.UNAUTHORIZED);
            }
            return deferred.promise;
        },

    };

    return Access;
    
}]);

