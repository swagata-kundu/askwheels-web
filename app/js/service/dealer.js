app.service("dealerService", [
    "$http",
    "serviceURI",
    function($http, serviceURI) {
      this.getDashboardInfo = function() {
        var uri = serviceURI.getDashBoardInfoDealer;
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
        var uri = serviceURI.auctionListDealer;
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
  