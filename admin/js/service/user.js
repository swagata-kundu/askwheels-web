app.service("sellerService", [
  "$http",
  "serviceURI",
  function($http, serviceURI) {
    this.getSellerList = function(params) {
      var uri = serviceURI.getSellerList;

      return $http({
        method: "POST",
        url: uri,
        data: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };

    this.getSubSellerList = function(params) {
      var uri = serviceURI.getSubSellerList;

      return $http({
        method: "POST",
        url: uri,
        data: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };

    this.blockUser = function(params) {
      var uri = serviceURI.blockUser;

      return $http({
        method: "POST",
        url: uri,
        data: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };

    this.deleteUser = function(params) {
      var uri = serviceURI.userBase;

      return $http({
        method: "DELETE",
        url: uri,
        data: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
  }
]);

app.service("dealerService", [
  "$http",
  "serviceURI",
  function($http, serviceURI) {
    this.getDealerList = function(params) {
      var uri = serviceURI.getDealerList;

      return $http({
        method: "POST",
        url: uri,
        data: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };

    this.changeDealerStatus = function(params) {
      var uri = serviceURI.changeDealerStatus;
      return $http({
        method: "PUT",
        url: uri,
        data: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
  }
]);

app.service("dashBoardService", [
  "$http",
  "serviceURI",
  function($http, serviceURI) {
    this.getDashBoardInfo = function() {
      var uri = serviceURI.getDashBoardInfo;
      return $http({
        method: "POST",
        url: uri,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
  }
]);
