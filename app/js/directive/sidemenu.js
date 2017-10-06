app.directive('adminSidemenu', function () {
    return {
        templateUrl: '/views/directives/sidemenu.html',
        restrict: 'E',
        controller: ['$scope', 'authService', '$rootScope', 'localStorageService',

        ]
    }
});