app.controller("auctionList", [
  "$scope",
  "$state",
  "$rootScope",
  "auctionService",
  function($scope, $state, $rootScope, auctionService) {
    //pagination variables

    $scope.params = $state.params;

    $scope.filter = {
      status: ""
    };

    $scope.sortType = "dateModified";
    $scope.sortReverse = true;
    $scope.numPerPage = 20;
    $scope.currentPage = 1;

    $scope.applyFilters = function() {
      debugger;
      if ($scope.filter.status) {
        $scope.getVehicleList(1, $scope.numPerPage);
      }
    };
    $scope.clearFilters = function() {
      $scope.filter.status = "";
      $scope.currentPage = 1;
      $scope.sortReverse = true;
      $scope.sortType = "dateModified";
      $scope.getVehicleList(1, $scope.numPerPage);
    };

    $scope.getVehicleList = function(pageNo, pageSize) {
      var endUserListParams = {
        pageNo: pageNo,
        pageSize: pageSize,
        status: $scope.filter.status,
        sortBy: $scope.sortType,
        sortOrder: $scope.sortReverse == true ? "DESC" : "ASC",
        searchText: $scope.searchText,
        sellerId: $scope.params.sellerId ? $scope.params.sellerId : 0,
        subSellerId: $scope.params.subSellerId ? $scope.params.subSellerId : 0
      };
      auctionService.getVehicleList(endUserListParams).then(
        function(endUserSuccess) {
          $scope.vehicles = endUserSuccess.data.data.map(function(v) {
            let obj = v;
            obj.status_name = getStatusName(v.vehicle_live_status);
            return obj;
          });
          $scope.currentPage = pageNo;
          $scope.totalValues = endUserSuccess.data.count;
        },
        function(endUserError) {
          $scope.vehicles = [];
          $scope.totalValues = 0;
        }
      );
    };

    $scope.getVehicleList($scope.currentPage, $scope.numPerPage);

    $scope.changeVehicleStatus = function(id, status) {
      debugger;
      if (status === 2) {
        approveVehicle(id, status);
      } else {
        rejectVehicle(id, status);
      }
    };

    var approveVehicle = function(id, status) {
      bootbox.confirm(
        "Are you sure you want to change this vehicle status?",
        function(checked) {
          if (checked) {
            var blockParams = {
              vehicleId: id,
              status: status
            };

            auctionService.changeVehicleStatus(blockParams).then(
              function(response) {
                bootbox.alert(response.data.message);
                var pageNo = $scope.currentPage;
                if ($scope.vehicles.length == 1) {
                  if ($scope.currentPage != 1) {
                    pageNo = pageNo - 1;
                  } else {
                    pageNo = 1;
                  }
                }
                $scope.getVehicleList(pageNo, $scope.numPerPage);
              },
              function(error) {
                showErrorMessage(error);
              }
            );
          }
        }
      );
    };

    var rejectVehicle = function(id, status) {
      bootbox.prompt({
        title: "Please enter the rejection reason.",
        inputType: "textarea",
        callback: function(reason) {
          if (reason) {
            var blockParams = {
              vehicleId: id,
              status: status,
              reason: reason
            };

            auctionService.changeVehicleStatus(blockParams).then(
              function(response) {
                bootbox.alert(response.data.message);
                var pageNo = $scope.currentPage;
                if ($scope.vehicles.length == 1) {
                  if ($scope.currentPage != 1) {
                    pageNo = pageNo - 1;
                  } else {
                    pageNo = 1;
                  }
                }
                $scope.getVehicleList(pageNo, $scope.numPerPage);
              },
              function(error) {
                showErrorMessage(error);
              }
            );
          }
        }
      });
    };
  }
]);

app.controller("auctionDetail", [
  "$scope",
  "$state",
  "$rootScope",
  "auctionService",
  "$uibModal",
  function($scope, $state, $rootScope, auctionService, $uibModal) {
    var auctionId = $state.params.vehicleId;
    var startTime = "";

    $scope.timings = {};

    $scope.vehicleName = $state.params.model;

    $scope.addVehicle = {
      inspection_report: {}
    };
    auctionService.getAuctionDetail(auctionId).then(
      function(data) {
        $scope.addVehicle = data.data.data;
        startTime = moment($scope.addVehicle.auction_start_date);
        $scope.timings = {
          date: startTime.format("YYYY-MM-DD"),
          time: startTime.format("hh:mm")
        };
        console.log($scope.timings);
      },
      function(err) {}
    );

    $scope.viewImage = function(image) {
      var modalInstance = $uibModal.open({
        animation: true,
        template: `<div class="modal-body" style="text-align:center">
        <img ng-src="{{selectedImage}}" />
    </div>`,
        controller: "imageViewer",
        size: "lg",
        windowClass: "custom-modal view-image",
        resolve: {
          image: function() {
            return image;
          }
        }
      });
    };
  }
]);

app.controller("imageViewer", [
  "$scope",
  "$uibModalInstance",
  "image",
  function($scope, $uibModalInstance, image) {
    $scope.cancel = function() {
      $uibModalInstance.dismiss("cancel");
    };
    $scope.selectedImage = "";
    $scope.selectedImage = image;
  }
]);

function getStatusName(vehicle_live_status) {
  let status_name = "";
  switch (vehicle_live_status) {
    case 1: {
      status_name = "Live";
      break;
    }
    case 2: {
      status_name = "Upcoming";
      break;
    }
    case 3: {
      status_name = "New";
      break;
    }
    case 4: {
      status_name = "Rejected";
      break;
    }
    case 5: {
      status_name = "Closed";
      break;
    }
  }
  return status_name;
}
