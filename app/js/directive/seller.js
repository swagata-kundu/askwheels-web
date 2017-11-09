app.directive("sellerSidemenu", function() {
  return {
    templateUrl: "views/seller/sidemenu.html",
    restrict: "E",
    controller: [
      "$scope",
      "authService",
      "$state",
      "$rootScope",
      function($scope, authService, $state, $rootScope) {}
    ]
  };
});

app.directive("sellerHeader", function() {
  return {
    templateUrl: "views/seller/header.html",
    restrict: "E",
    controller: [
      "$scope",
      "authService",
      "$state",
      "$rootScope",
      function($scope, authService, $state, $rootScope) {
        $scope.logout = function() {
          authService.logout();
        };
      }
    ]
  };
});

app.directive("appFooter", function() {
  return {
    templateUrl: "views/seller/footer.html",
    restrict: "E",
    controller: ["$state", "$rootScope", function($state, $rootScope) {}]
  };
});
