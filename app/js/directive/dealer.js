app.directive("dealerSidemenu", function() {
  return {
    templateUrl: "views/dealer/sidemenu.html",
    restrict: "E",
    controller: [
      "$scope",
      "authService",
      "$state",
      "$rootScope",
      function($scope, authService, $state, $rootScope) {
        $(document).ready(function() {
          $(".burgerMenu").click(function() {
            $("#SmlMenu").toggle("slide");
          });
        });
      }
    ]
  };
});

app.directive("dealerHeader", function() {
  return {
    templateUrl: "views/dealer/header.html",
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
