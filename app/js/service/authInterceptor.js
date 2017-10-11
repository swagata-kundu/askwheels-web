app.factory('interceptorFactory', ['$q', '$rootScope', 'localStorageService', '$injector', '$location', function ($q, $rootScope, localStorageService, $injector, $location) {


    var buffer = [];
    var interceptorFactory = {};
    var flagShowMessage = true;

    var _request = function (config) {
        if ($rootScope.isAuth == true || $rootScope.userProfile != null) {
            config.headers.sessionId = $rootScope.userProfile.token;
        }

        config.headers = config.headers || {};
        return config;
    };

    var _responseError = function (response) {

        if (response.status == 500) {
            alert('Internal server error');
        }

        if (response.status == 401) {
            localStorageService.remove('userProfile');
            _authentication = {
                email: '',
                token: '',
                isAuth: false
            };

            localStorageService.set('userProfile', _authentication);
            $rootScope.userProfile = _authentication;
            $rootScope.returnToUrl = $location.path();
            $rootScope.$emit('showHideLogOut');
            var stateService = $injector.get('$state');
            stateService.go('login');

        }
        return $q.reject(response);
    };

    var _response = function (response) {
        return response;
    };

    interceptorFactory.request = _request;
    interceptorFactory.responseError = _responseError;
    return interceptorFactory;
}]);