app.controller("auctionList", [
  "$scope",
  "$state",
  "$rootScope",
  "auctionService",
  function($scope, $state, $rootScope, auctionService) {
    //pagination variables

    $scope.params = $state.params;

    $scope.sortType = "evaluation_date";
    $scope.sortReverse = false;
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.searchText = "";

    $scope.getVehicleList = function(pageNo, pageSize) {
      var endUserListParams = {
        pageNo: pageNo,
        pageSize: pageSize,
        sortBy: $scope.sortType,
        sortOrder: $scope.sortReverse == true ? "DESC" : "ASC",
        searchText: $scope.searchText,
        sellerId: $scope.params.sellerId ? $scope.params.sellerId : 0,
        subSellerId: $scope.params.subSellerId ? $scope.params.subSellerId : 0
      };
      auctionService.getVehicleList(endUserListParams).then(
        function(endUserSuccess) {
          $scope.vehicles = endUserSuccess.data.data;
          $scope.currentPage = pageNo;
          $scope.totalValues = endUserSuccess.data.count;
        },
        function(endUserError) {
          $scope.vehicles = [];
          $scope.totalValues = 0;
        }
      );
    };

    //bind default list on page load
    $scope.getVehicleList($scope.currentPage, $scope.numPerPage);

    //change vehicle status To block/unblock junior admin
    $scope.changeVehicleStatus = function(id, status) {
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
  function($scope, $state, $rootScope, auctionService) {
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
        createInsPectionReport($scope.addVehicle.inspection_report);

        startTime = moment($scope.addVehicle.auction_start_date);
        $scope.timings = {
          date: startTime.format("YYYY-MM-DD"),
          time: startTime.format("HH:MM")
        };
      },
      function(err) {}
    );

    $scope.reports = [];
    let reports = [];

    function createInsPectionReport(report) {
      _.forEach(report, function(value, key) {
        let obj = {
          header: "",
          subsections: []
        };
        obj.header = _.startCase(_.replace(key, new RegExp("_", "g"), " "));
        _.forEach(value, function(value1, key1) {
          let obj2 = {
            header: "",
            value: "",
            desc: ""
          };
          obj2.header = _.startCase(_.replace(key1, new RegExp("_", "g"), " "));
          obj2.value = value1.value ? value1.value : "NA";
          obj2.desc = value1.description ? value1.description : "NA";
          obj.subsections.push(obj2);
        });
        reports.push(obj);
      });
      $scope.reports = reports;
      console.log(JSON.stringify(reports));
    }
  }
]);
