app.service("sellerService", [
  "$http",
  "serviceURI",
  function($http, serviceURI) {
    this.getDashboardInfo = function() {
      var uri = serviceURI.getDashBoardInfoSeller;
      return $http({
        method: "POST",
        url: uri,
        data: {},
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
    this.getAuctionList = function(params) {
      var uri = serviceURI.auctionListSeller;
      return $http({
        method: "POST",
        url: uri,
        data: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
  }
]);
