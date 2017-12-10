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
    this.addWishList = function(params) {
      var uri = serviceURI.wishlist;
      return $http({
        method: "PUT",
        url: uri,
        data: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
    this.getWishList = function() {
      var uri = serviceURI.wishlist;
      return $http({
        method: "GET",
        url: uri,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
    this.submitBid = function(params) {
      var uri = serviceURI.submitBid;
      return $http({
        method: "POST",
        url: uri,
        data: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
    this.dealerBidList = function() {
      var uri = serviceURI.dealerBid;
      return $http({
        method: "POST",
        url: uri,
        data: {},
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
    this.getNotification = function(params) {
      var uri = serviceURI.dealerNotification;
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
