app.controller("sellerAuctionDetail", [
  "$scope",
  "$state",
  "auctionService",
  "$interval",
  "$uibModal",
  "dealerService",
  function (
    $scope,
    $state,
    auctionService,
    $interval,
    $uibModal,
    dealerService
  ) {
    function setPlugins() {
      $("#parentHorizontalTab").easyResponsiveTabs({
        type: "default", //Types: default, vertical, accordion
        width: "auto", //auto or any width like 600px
        fit: true, // 100% fit in a container
        tabidentify: "hor_1", // The tab groups identifier
        activate: function (event) {
          // Callback function if tab is switched
          var $tab = $(this);
          var $info = $("#nested-tabInfo");
          var $name = $("span", $info);
          $name.text($tab.text());
          $info.show();
        }
      });
    }
    $(document).ready(function () {
      setPlugins();
    });

    let vehicleId = $state.params.vehicleId;
    $scope.auction = {
      images: [],
      bids: []
    };

    $scope.viewBid = false;

    $scope.timings = {
      day: "",
      hour: "",
      min: "",
      sec: ""
    };
    var clockInterval;

    $scope.inspection_report = {};

    function getAuction() {
      auctionService.getAuctionDetail(vehicleId).then(function (result) {
        console.log(result.data.data);
        $scope.auction = result.data.data;
        // $scope.inspection_report = result.data.data.inspection_report;
        setSlider();
        createInsPectionReport(result.data.data.inspection_report);
        accordionButtonSet();
        clockInterval = $interval(calculateTime, 1000);
      });
    }
    getAuction();

    function setSlider() {
      setTimeout(function () {
        $("#content-slider").lightSlider({
          loop: true,
          keyPress: true
        });
        $("#image-gallery").lightSlider({
          gallery: true,
          item: 1,
          thumbItem: $scope.auction.images.length,
          slideMargin: 0,
          speed: 500,
          auto: true,
          loop: true,
          onSliderLoad: function () {
            $("#image-gallery").removeClass("cS-hidden");
          }
        });
      }, 1000);
    }

    function calculateTime() {
      var vehicle = $scope.auction;
      if (vehicle.auction_start_date && vehicle.auctionType <= 2) {
        var startDate = moment(vehicle.auction_start_date);
        var now = moment();
        var duration;
        if (startDate.isBefore(now)) {
          var newStart = startDate.add(2.5, "h");
          duration = moment.duration(newStart.diff(now));
        } else {
          duration = moment.duration(startDate.diff(now));
        }
        if (moment.duration().milliseconds() < 0) {
          $interval.cancel(clockInterval);
        }
        $scope.timings.day = duration.days();
        $scope.timings.hour = duration.hours();
        $scope.timings.min = duration.minutes();
        $scope.timings.sec = duration.seconds();
      }
    }

    $scope.toggleViewBid = function () {
      $scope.viewBid = !$scope.viewBid;
    };

    $scope.bidAmount = 0;
    $scope.submitBid = function (bidAmount) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: "views/dealer/bid.html",
        controller: "dealerBid",
        resolve: {
          vehicle: function () {
            return {
              vehicleId: vehicleId
            };
          },
          bidAmount: function () {
            return bidAmount;
          }
        }
      });
      modalInstance.result.then(
        function () {
          $scope.bidAmount = 0;
          getAuction();
        },
        function () {
          $scope.bidAmount = 0;
        }
      );
    };

    $scope.addWatchList = function () {
      dealerService
        .addWishList({
          vehicleId: vehicleId
        })
        .then(function (result) {
          if ($scope.auction.isWatchList == 1) {
            $scope.auction.isWatchList = 0;
          } else {
            $scope.auction.isWatchList = 1;
          }
        });
    };
    $scope.reports = [];
    let reports = [];

    $scope.viewImage = function (index) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: "views/seller/imgviewer.html",
        controller: "imageViewer",
        size: "lg",
        resolve: {
          images: function () {
            return $scope.auction.images;
          },
          index: function () {
            return index;
          }
        }
      });
      modalInstance.result.then(
        function () {
          $scope.bidAmount = 0;
        },
        function () {
          $scope.bidAmount = 0;
        }
      );
    };

    function createInsPectionReport(report) {
      let obj = {};
      _.forEach(report, function (value, key) {
        obj[key] = {}
        _.forEach(value, function (value2, key2) {
          obj[key][key2] = {
            value: value2.value ? value2.value : 'No Data Available',
            description: value2.description ? value2.description : 'No Data Available',
          }
        })
        console.log(JSON.stringify(obj));
        $scope.inspection_report = obj
      });
    }

    function accordionButtonSet() {
      setTimeout(function () {
        $(".accordionButton").click(function () {
          $(".accordionButton").removeClass("on");
          $(".accordionContent").slideUp("normal");
          if (
            $(this)
              .next()
              .is(":hidden") == true
          ) {
            $(this).addClass("on");
            $(this)
              .next()
              .slideDown("normal");
          }
        });
        $(".accordionButton")
          .mouseover(function () {
            $(this).addClass("over");
          })
          .mouseout(function () {
            $(this).removeClass("over");
          });
        $(".accordionContent").hide();
      }, 1000);
    }
  }
]);

app.controller("imageViewer", [
  "$scope",
  "$uibModalInstance",
  "images",
  "index",
  function ($scope, $uibModalInstance, images, index) {
    $scope.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };
    $scope.selectedImage = "";
    $scope.selectedImage = images[index];
  }
]);