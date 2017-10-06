app.service('sellerService', ['$http', 'serviceURI', function ($http, serviceURI) {


    this.getSellerList = function (params) {
        var uri = serviceURI.getSellerList;

        return $http({
            method: "POST",
            url: uri,
            data: params,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.getSubSellerList = function (params) {
        var uri = serviceURI.getSubSellerList;

        return $http({
            method: "POST",
            url: uri,
            data: params,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
}]);