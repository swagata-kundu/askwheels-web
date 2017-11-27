app.service("auctionService", [
  "$http",
  "serviceURI",
  function($http, serviceURI) {
    this.getVehicleList = function(params) {
      var uri = serviceURI.vehicleListAdmin;

      return $http({
        method: "POST",
        url: uri,
        data: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };

    this.changeVehicleStatus = function(params) {
      var uri = serviceURI.vehicleStatusChange;

      return $http({
        method: "PUT",
        url: uri,
        data: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };

    this.getAuctionDetail = function(vehicleId) {
      var uri = serviceURI.vehicle + "/" + vehicleId;
      return $http({
        method: "GET",
        url: uri,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
  }
]);
