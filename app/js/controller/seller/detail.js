app.controller("sellerAuctionDetail", [
  "$scope",
  "$state",
  "auctionService",
  "$interval",
  "$uibModal",
  "dealerService",
  function(
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
        activate: function(event) {
          // Callback function if tab is switched
          var $tab = $(this);
          var $info = $("#nested-tabInfo");
          var $name = $("span", $info);
          $name.text($tab.text());
          $info.show();
        }
      });
    }
    $(document).ready(function() {
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

    function getAuction() {
      auctionService.getAuctionDetail(vehicleId).then(function(result) {
        console.log(result.data.data);
        $scope.auction = result.data.data;
        createInsPectionReport(result.data.data.inspection_report);
        setSlider();
        clockInterval = $interval(calculateTime, 1000);
      });
    }
    getAuction()
    function setSlider() {
      setTimeout(function() {
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
          onSliderLoad: function() {
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
          var newStart = startDate.add(1, "d");
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

    $scope.toggleViewBid = function() {
      $scope.viewBid = !$scope.viewBid;
    };

    $scope.bidAmount = 0;
    $scope.submitBid = function(bidAmount) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: "views/dealer/bid.html",
        controller: "dealerBid",
        resolve: {
          vehicle: function() {
            return {
              vehicleId: vehicleId
            };
          },
          bidAmount: function() {
            return bidAmount;
          }
        }
      });
      modalInstance.result.then(
        function() {
          $scope.bidAmount = 0;
          getAuction()
        },
        function() {
          $scope.bidAmount = 0;
        }
      );
    };

    $scope.addWatchList = function() {
      dealerService
        .addWishList({
          vehicleId: vehicleId
        })
        .then(function(result) {
          if ($scope.auction.isWatchList == 1) {
            $scope.auction.isWatchList = 0;
          } else {
            $scope.auction.isWatchList = 1;
          }
        });
    };
    $scope.reports = [];
    let reports = [];

    $scope.viewImage = function(index) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: "views/seller/imgviewer.html",
        controller: "imageViewer",
        size: "lg",
        resolve: {
          images: function() {
            return $scope.auction.images;
          },
          index: function() {
            return index;
          }
        }
      });
      modalInstance.result.then(
        function() {
          $scope.bidAmount = 0;
        },
        function() {
          $scope.bidAmount = 0;
        }
      );
    };

    function createInsPectionReport(report) {
      _.forEach(report, function(value, key) {
        let obj = {
          header: "",
          subsections: [],
          sortValue: 0
        };
        obj.header = _.startCase(_.replace(key, new RegExp("_", "g"), " "));
        obj.sortValue = getHeaderSort(key);

        _.forEach(value, function(value1, key1) {
          let obj2 = {
            header: "",
            value: "",
            desc: ""
          };
          let modified_key1 = getProperKey(key1);
          obj2.header =
            modified_key1 == key1
              ? _.startCase(_.replace(key1, new RegExp("_", "g"), " "))
              : modified_key1;
          obj2.value = value1.value ? value1.value : "No data available";
          obj2.desc = value1.description ? value1.description : "";
          obj.subsections.push(obj2);
        });
        reports.push(obj);
      });
      $scope.reports = _.orderBy(reports, ["sortValue"], ["asc"]);
      console.log($scope.reports);
      accordionButtonSet();
    }

    function accordionButtonSet() {
      setTimeout(function() {
        $(".accordionButton").click(function() {
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
          .mouseover(function() {
            $(this).addClass("over");
          })
          .mouseout(function() {
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
  function($scope, $uibModalInstance, images, index) {
    $scope.cancel = function() {
      $uibModalInstance.dismiss("cancel");
    };
    $scope.selectedImage = "";
    $scope.selectedImage = images[index];
  }
]);

function getProperKey(key) {
  switch (key) {
    case "wlaab": {
      return "Wheels Lock When Applying Antilock Brakes";
    }
    case "pbedf": {
      return "Parking Brake Engages and Disengages Freely";
    }
    case "grinding_noise": {
      return "Grinding Noises When Applying";
    }
    case "vss": {
      return "Vehicle Steers Straight And Does Not Pull To One Side When Applying Brakes";
    }
    case "swttahcapa": {
      return "Seams Where The Trunk and Hood Close Are Properly Aligned";
    }
    case "swdafmapa": {
      return "Seams Where Doors and Fenders Meet Are Properly Aligned";
    }
    case "weabff": {
      return "Windshields Wipers and Blades Fully Functional";
    }
    case "hadliaff": {
      return "Headlights and Directional Lights Intact and Full Functional";
    }
    case "exhaust_pipe_emission": {
      return "Exhaust Pipe Emissions Are Neither Blue (Indicates Engine Burns Oil) or Black (Indicate Excessive Oil Consumption)";
    }
    case "instructions": {
      return "Instructions Included For Any Accessories";
    }
    case "service_record": {
      return "Service And Repair Records Available";
    }
    case "fpsf":{
      return "Front Passenger Side Fender(FPSF)";
    }
    default:
      return key;
  }
}

function getHeaderSort(name) {
  console.log(name);
  switch (name) {
    case "brakes": {
      return 7;
    }
    case "engine": {
      return 2;
    }
    case "exterior": {
      return 0;
    }
    case "frame": {
      return 5;
    }
    case "interior": {
      return 4;
    }
    case "transmission": {
      return 6;
    }
    case "miscellaneous": {
      return 9;
    }
    case "steering": {
      return 8;
    }
    case "suspension": {
      return 3;
    }
    case "tyres": {
      return 1;
    }
    default:
      return 0;
  }
}
