app.directive("dealerSidemenu", function () {
  return {
    templateUrl: "views/dealer/sidemenu.html",
    restrict: "E",
    controller: [
      "$scope",
      "authService",
      "$state",
      "$rootScope", "dealerService",
      function ($scope, authService, $state, $rootScope, dealerService) {
        $(document).ready(function () {
          $(".burgerMenu").click(function () {
            $("#SmlMenu").toggle("slide");
          });
        });

        $rootScope.notification = {
          unread: 0,
          data: []
        }
        dealerService.getNotification({}).then(function (result) {
          let notificationText = result.data.data.map(function (d) {
            let text = "";
            if (d.notificationType === 1) {
              text = 'New bid on ' + d.vehicle_name + ', amount ' + d.newBidAmount;
            } else {
              let status = d.vehicle_status === 2 ? 'approved by admin' : d.vehicle_status === 3 ? 'rejected by admin' : 'added';
              text = 'Auction ' + d.vehicle_name + ' has been ' + status;
            }
            return text;
          });
          $rootScope.notification.data = notificationText;
          $rootScope.notification.unread = result.data.unreadCount;
        });
      }
    ]
  };
});

app.directive("dealerHeader", function () {
  return {
    templateUrl: "views/dealer/header.html",
    restrict: "E",
    controller: [
      "$scope",
      "authService",
      "$state",
      "$rootScope",
      function ($scope, authService, $state, $rootScope) {
        $scope.logout = function () {
          authService.logout();
        };
      }
    ]
  };
});