app.service('auctionService', [
    '$http',
    'serviceURI',
    function ($http, serviceURI) {

        this.getVehicleList = function (params) {
            var uri = serviceURI.vehicleListAdmin;

            return $http({
                method: "POST",
                url: uri,
                data: params,
                headers: {
                    'Content-Type': 'application/json'
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
                    'Content-Type': 'application/json'
                }
            });
        };

    }
]);