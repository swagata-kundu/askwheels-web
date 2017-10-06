app.directive('nightOutHeader', function () {
    return {
        templateUrl: 'views/header.html',
        restrict: 'E',
        controller: ['$scope', 'authService', '$state', '$rootScope', function ($scope, authService, $state, $rootScope) {


            $scope.showLogout = false;

            if ($rootScope.userProfile.isAuth == true) {
                $scope.showLogout = true;
                $scope.userName = $rootScope.userProfile.firstName;
            }

            $rootScope.$on('showHideLogOut', function () {
                if ($rootScope.userProfile.isAuth == true) {
                    $scope.showLogout = true;
                    $scope.userName = $rootScope.userProfile.firstName;
                } else {
                    $scope.showLogout = false;
                }
            });

            $scope.logOut = function () {
                authService.logout();
            };


        }]
    };
});