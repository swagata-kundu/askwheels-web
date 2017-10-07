app
    .directive('adminHeader', function () {
        return {
            templateUrl: 'views/directives/header.html',
            restrict: 'E',
            controller: [
                '$scope',
                'authService',
                '$state',
                '$rootScope',
                function ($scope, authService, $state, $rootScope) {

                    $scope.showHeader = false;
                    if ($rootScope.userProfile && $rootScope.userProfile.isAuth == true) {
                        $scope.email = $rootScope.userProfile.email;
                        $scope.showHeader = true;
                    }

                    $rootScope
                        .$on('showHideLogOut', function () {
                            if ($rootScope.userProfile.isAuth == true) {
                                $scope.email = $rootScope.userProfile.email;
                                $scope.showHeader = true;
                            }
                        });

                    $scope.logOut = function () {
                        $scope.showHeader = false;
                        authService.logout();
                    };
                }
            ]
        };
    });
