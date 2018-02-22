app.service("auctionService", [
  "$http",
  "serviceURI",
  "Upload",
  function ($http, serviceURI, Upload) {
    this.getVehicleList = function (params) {
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

    this.changeVehicleStatus = function (params) {
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

    this.getAuctionDetail = function (vehicleId) {
      var uri = serviceURI.vehicle + "/" + vehicleId;
      return $http({
        method: "GET",
        url: uri,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };

    this.uploadFiles = function (files) {
      var uri = serviceURI.upload;

      return Upload.upload({
        url: uri,
        arrayKey: "",
        data: {
          files: files
        }
      });
    };

    this.addAuction = function (params) {
      var uri = serviceURI.addAuction;
      return $http({
        method: "POST",
        url: uri,
        data: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
    this.updateAuction = function (params, vehicleId) {
      var uri = serviceURI.addAuction + '/' + vehicleId;
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