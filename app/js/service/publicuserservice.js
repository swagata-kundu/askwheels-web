app.service("publicUserService", [
  "$http",
  "serviceURI",
  function ($http, serviceURI) {
    this.changePassword = function (params) {
      var uri = serviceURI.changePasswordPublicUserURI;

      return $http({
        method: "POST",
        url: uri,
        data: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };

    this.editUserProfile = function (profile) {
      var uri = serviceURI.userBase;

      return $http({
        method: "PATCH",
        url: uri,
        data: profile,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
    this.getUserDetail = function (id) {
      var uri = serviceURI.userBase + "/" + id;
      return $http({
        method: "GET",
        url: uri
      });
    };
  }
]);


app.directive("ngDate", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, element, attrs, ctrl) {
      var d = moment().subtract(1, 'days').toDate();
      var toDay = moment().toDate();

      $(element).datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        maxDate: attrs.hasOwnProperty("futuredate") ? d : attrs.hasOwnProperty("todaydate")?toDay:null,
        onSelect: function (date) {
          ctrl.$setViewValue(date);
          scope.$apply();
        }
      });
    }
  };
});