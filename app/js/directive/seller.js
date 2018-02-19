app.directive("sellerSidemenu", function () {
  return {
    templateUrl: "views/seller/sidemenu.html",
    restrict: "E",
    controller: [
      "$scope",
      "authService",
      "$state",
      "$rootScope",
      "sellerService",
      function ($scope, authService, $state, $rootScope, sellerService) {
        $(document).ready(function () {
          $(".burgerMenu").click(function () {
            $("#SmlMenu").toggle("slide");
          });
        });
        $rootScope.notification = {
          unread: 0,
          data: []
        }
        sellerService.getNotification({}).then(function (result) {
          let notificationText = result.data.data.map(function (d) {
            let text = "";
            if (d.notificationType === 1) {
              text = 'New bid on ' + d.vehicle_name + ', amount ' + d.bidAmount;
            } else {
              let status = d.vehicle_status === 2 ? 'approved by admin' : d.vehicle_status === 3 ? 'rejected by admin' : 'added';
              text = 'Auction ' + d.vehicle_name + ' has been ' + status;
            }
            return text;
          })
          $rootScope.notification.data = notificationText;
          $rootScope.notification.unread = result.data.unreadCount;
        });
      }
    ]
  };
});

app.directive("sellerHeader", function () {
  return {
    templateUrl: "views/seller/header.html",
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

app.directive("appFooter", function () {
  return {
    templateUrl: "views/seller/footer.html",
    restrict: "E",
    controller: ["$state", "$rootScope", function ($state, $rootScope) {}]
  };
});