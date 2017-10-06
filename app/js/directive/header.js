app.directive('appHeader', function () {
    return {
        templateUrl: 'views/directives/header.html',
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

app.directive('adminHeader', function () {
    return {
        templateUrl: '/views/directives/adminheader.html',
        restrict: 'E',
        controller: ['$scope', 'authService', '$rootScope', 'localStorageService',
            function ($scope, authService, $rootScope, localStorageService) {

                $scope.adminName = $rootScope.userProfile.firstName;
                $scope.adminImage = $rootScope.userProfile.imgUrl ? $rootScope.userProfile.imgUrl : 'app/img/moon_NightOut.png';

                $scope.toggleClass = function () {
                    angular.element('body').toggleClass('sidebar-collapse sidebar-open');
                };

                $rootScope.$on('changeUserProfilePic', function () {
                    authService.loadData();
                    $scope.adminImage = $rootScope.userProfile.imgUrl == "" ? 'app/img/moon_NightOut.png' : $rootScope.userProfile.imgUrl;
                    $scope.adminName = $rootScope.userProfile.firstName;
                });



                $scope.logOut = function () {
                    authService.logout();
                    $window.location.assign('/');
                };


            }
        ]
    }
});