app
    .directive('adminHeader', function () {
        return {
            templateUrl: 'views/directive/header.html',
            restrict: 'E',
            controller: [
                '$scope',
                'authService',
                '$state',
                '$rootScope',
                function ($scope, authService, $state, $rootScope) {
                    $scope.logout = function () {
                        authService.logout();
                    };
                }
            ]
        };
    });

app.directive('adminFooter', function () {
    return {
        templateUrl: 'views/directive/footer.html',
        restrict: 'E',
        controller: [
            '$scope',
            'authService',
            '$state',
            '$rootScope',
            function ($scope, authService, $state, $rootScope) {}
        ]
    };
});