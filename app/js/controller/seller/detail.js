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

    $scope.inspection_report = {};

    function getAuction() {
      auctionService.getAuctionDetail(vehicleId).then(function(result) {
        console.log(result.data.data);
        $scope.auction = result.data.data;
        inspection_report = result.data.data.inspection_report;
        setSlider();
        clockInterval = $interval(calculateTime, 1000);
      });
    }
    getAuction();
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
          getAuction();
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
    case "fpsf": {
      return "Front Passenger Side Fender(FPSF)";
    }
    case "no_cuts_cracks": {
      return "Tyres Are of Free of Any Cuts, Bubbles or Cracks";
    }
    case "thread_worn": {
      return "Tread Worn Evenly (uneven wear indicates alignment and suspension problems)";
    }
    case "spare_tyre": {
      return "Spare Tyre, Jack and Lug Wrench on Car And Fully Functional";
    }
    case "fluid_leaks": {
      return "Free of fluids or oil leaks";
    }
    case "oil_filler": {
      return "Oil Filler Neck Not Coated With Thick, Black Deposits";
    }
    case "battery_terminals_corrision": {
      return "Battery terminal free of corrosion";
    }
    case "no_black_dark_oil": {
      return "Oil dip stick free of dark, black color";
    }
    case "no_odors": {
      return "Free of odors while engine is running";
    }
    case "fluid_clean": {
      return "Transmission Fluid Looks Clean, Not Dirty or Gritty";
    }
    case "no_slips_delays": {
      return "Transmission neither slips nor delay while driving";
    }
    case "grinding_noise": {
      return "Grinding Noises When In Reverse";
    }
    case "cracking_noise": {
      return "When bouncing the vehicle's corners no cracking noises are made";
    }
    case "same_bouncing": {
      return "All corners respond the same when bouncing";
    }
    case "no_drift": {
      return "Vehicle Does Not Drift To One Side Without Prodding";
    }
    case "stable": {
      return "Vehicle is Stable; Any Shaking or Vibrating";
    }
    case "resistance": {
      return "Resistance in The Steering Wheel When Turning";
    }
    case "clunking": {
      return "Clicking or Clunking When Turning";
    }
    case "seats_unworn_no_cracks": {
      return "Seats Unworn and free of cracks";
    }
    case "windshiels_wiper_works": {
      return "Windshield wipers work properly";
    }
    case "wiper_fluid_dispenses_properly": {
      return "Windshield Wiper Fluid Dispenses Properly";
    }
    case "seats_equipped_seatbelt": {
      return "All seats equipped with functional Seats belts";
    }
    case "sunroof_open_close_properly": {
      return "Sunroof opens and closes properly(if Applicable)";
    }
    case "trunk_driver_door_lock_with_key": {
      return "Trunk and driver side door lock and unlock with key";
    }
    case "head_lights_work_properly": {
      return "Headlights, Including Bright, Work Properly";
    }
    case "lacks_air_freshner_scent": {
      return "Lacks a heavy scent of air freshener(may indicate something is being concealed)";
    }
    case "car_manual": {
      return "Car Manual Located In The Glove Compartment";
    }
    default:
      return key;
  }
}

function getHeaderSort(name) {
  switch (name) {
    case "brakes": {
      return 5;
    }
    case "engine": {
      return 2;
    }
    case "exterior": {
      return 0;
    }
    case "frame": {
      return 8;
    }
    case "interior": {
      return 7;
    }
    case "transmission": {
      return 3;
    }
    case "miscellaneous": {
      return 9;
    }
    case "steering": {
      return 6;
    }
    case "suspension": {
      return 4;
    }
    case "tyres": {
      return 1;
    }
    default:
      return 0;
  }
}
