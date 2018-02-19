app.controller("sellerDashboard", [
  "$scope",
  "$state",
  "sellerService",
  "$q",
  function ($scope, $state, sellerService, $q) {
    $scope.tabinfo = {
      liveAuctions: [],
      pendingAuctions: [],
      upcomingAuctions: [],
      rejectedAuctions: []
    };

    $scope.auctions = [];
    $scope.subsellers = [];
    $scope.subsellerSelections = [];

    $scope.filter = {
      minPrice: "",
      maxPrice: "",
      fuelType: "",
      owner: "",
      transmission: "",
      sortBy: ""
    };

    $scope.loadUser = function () {
      var deferred = $q.defer();
      deferred.resolve($scope.subsellers);

      return deferred.promise;
    };

    sellerService.getDashboardInfo().then(
      function (result) {
        $scope.tabinfo = result.data.data;
      },
      function (error) {}
    );

    let auctionParams = {
      auctionType: 1
    };

    let getAuctions = function () {
      $scope.auctions = [];
      let params = {};

      params.auctionType = auctionParams.auctionType;

      if ($scope.filter.minPrice) {
        params.minPrice = parseInt($scope.filter.minPrice);
      }
      if ($scope.filter.maxPrice) {
        params.maxPrice = parseInt($scope.filter.maxPrice);
      }
      if ($scope.filter.fuelType) {
        params.fuel_type = $scope.filter.fuelType;
      }
      if ($scope.filter.owner) {
        params.owner_type = parseInt($scope.filter.owner);
      }
      if ($scope.filter.transmission) {
        params.transmission_type = $scope.filter.transmission;
      }
      params.sortBy = $scope.filter.sortBy;
      let sellerIds = [];
      if ($scope.subsellerSelections.length > 0) {
        sellerIds = $scope.subsellerSelections.map(function (i) {
          return i.id;
        });
        params.sub_sellers = sellerIds.toString();
      }
      sellerService.getAuctionList(params).then(
        function (result) {
          $scope.auctions = result.data.data;
        },
        function (error) {
          $scope.auctions = [];
        }
      );
    };

    $scope.tabChange = function (auctionType) {
      auctionParams.auctionType = auctionType;
      $scope.resetFilter();
    };

    getAuctions();

    sellerService.subsellerListing({}).then(
      function (result) {
        $scope.subsellers = result.data.data.map(function (user) {
          return {
            id: user.userId,
            text: user.firstName + " " + user.lastName
          };
        });
      },
      function (error) {}
    );
    $scope.applyFilter = function () {
      getAuctions();
    };

    $scope.resetFilter = function () {
      $scope.filter = {
        minPrice: "",
        maxPrice: "",
        fuelType: "",
        owner: "",
        transmission: "",
        sortBy: ""
      };
      $scope.subsellerSelections = [];
      getAuctions();
    };
  }
]);

app.controller("sellerAddAuction", [
  "$scope",
  "$state",
  "sellerService",
  "auctionService",
  function ($scope, $state, sellerService, auctionService) {
    $(function () {
      //jQuery time
      var current_fs, next_fs, previous_fs; //fieldsets
      var left, opacity, scale; //fieldset properties which we will animate
      var animating; //flag to prevent quick multi-click glitches

      $(".next").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        debugger;
        next_fs = $(this)
          .parent()
          .next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li")
          .eq($("fieldset").index(next_fs))
          .addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
          opacity: 0
        }, {
          step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = now * 50 + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
              transform: "scale(" + scale + ")"
            });
            next_fs.css({
              left: left,
              opacity: opacity
            });
          },
          duration: 800,
          complete: function () {
            current_fs.hide();
            animating = false;
          },
          //this comes from the custom easing plugin
          easing: "easeInOutBack"
        });
      });

      $(".previous").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        previous_fs = $(this)
          .parent()
          .prev();

        //de-activate current step on progressbar
        $("#progressbar li")
          .eq($("fieldset").index(current_fs))
          .removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
          opacity: 0
        }, {
          step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = (1 - now) * 50 + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
              left: left
            });
            previous_fs.css({
              transform: "scale(" + scale + ")",
              opacity: opacity
            });
          },
          duration: 800,
          complete: function () {
            current_fs.hide();
            animating = false;
          },
          //this comes from the custom easing plugin
          easing: "easeInOutBack"
        });
      });

      $(".submit").click(function () {
        return false;
      });
    });

    $scope.addVehicle = {
      basic_info: {
        start_bid: 0,
        vehicle_name: "",
        reg_date: "",
        vin_number: "",
        engine_number: "",
        fuel_type: "petrol",
        color: "",
        model: "",
        variant: "",
        evaluation_date: "",
        manufacturing_year: "",
        rc_status: "",
        location: "",
        passengers: 2,
        transition_type: "manual",
        distance_travelled: 0,
        insurance_policy: {
          hpa_status: "Yes",
          insurance_type: "",
          insurance_validation: ""
        }
      },
      inspection_report: {
        breaks: {
          grinding_noise: {
            description: "",
            value: ""
          },
          pbedf: {
            description: "",
            value: ""
          },
          vss: {
            description: "",
            value: ""
          },
          wlaab: {
            description: "",
            value: ""
          }
        },
        engine: {
          battery_terminals_corrision: {
            description: "",
            value: ""
          },
          exhaust_pipe_emission: {
            description: "",
            value: ""
          },
          fluid_leaks: {
            description: "",
            value: ""
          },
          no_black_dark_oil: {
            description: "",
            value: ""
          },
          no_odors: {
            description: "",
            value: ""
          },
          oil_filler: {
            description: "",
            value: ""
          }
        },
        exterior: {
          body_type: {
            description: "",
            value: ""
          },
          boot_bumper: {
            description: "",
            value: ""
          },
          bpiller_driver_side: {
            description: "",
            value: ""
          },
          bpiller_passanger_side: {
            description: "",
            value: ""
          },
          door_fender_aligned: {
            description: "",
            value: ""
          },
          driver_side_apron: {
            description: "",
            value: ""
          },
          front_bumper: {
            description: "",
            value: ""
          },
          front_driver_side_door: {
            description: "",
            value: ""
          },
          front_driver_side_fender: {
            description: "",
            value: ""
          },
          front_passanger_side_fender: {
            description: "",
            value: ""
          },
          front_passanger_side_piller: {
            description: "",
            value: ""
          },
          front_driver_side_piller: {
            description: "",
            value: ""
          },
          hood: {
            description: "",
            value: ""
          },
          lights_functional: {
            description: "",
            value: ""
          },
          roof: {
            description: "",
            value: ""
          },
          passanger_side_apron: {
            description: "",
            value: ""
          },
          rear_door_driver_side: {
            description: "",
            value: ""
          },
          rear_door_passanger_side: {
            description: "",
            value: ""
          },
          rear_driver_side_quarter_paner: {
            description: "",
            value: ""
          },
          rear_passanger_side_quarter_paner: {
            description: "",
            value: ""
          },
          trunk_boot: {
            description: "",
            value: ""
          },
          trunk_hood_aligned: {
            description: "",
            value: ""
          },
          windshield_no_cracks: {
            description: "",
            value: ""
          },
          wiper_blades_functional: {
            description: "",
            value: ""
          }
        },
        frame: {
          chassis_ok: {
            description: "",
            value: ""
          },
          hole_without_scratches: {
            description: "",
            value: ""
          },
          no_crumpling_inside_trunk: {
            description: "",
            value: ""
          }
        },
        interior: {
          ac_works: {
            description: "",
            value: ""
          },
          all_gauge_works: {
            description: "",
            value: ""
          },
          car_alarm_works: {
            description: "",
            value: ""
          },
          doors_open_close_freely: {
            description: "",
            value: ""
          },
          hazard_lights_function_properly: {
            description: "",
            value: ""
          },
          head_lights_work_properly: {
            description: "",
            value: ""
          },
          heater_works: {
            description: "",
            value: ""
          },
          lacks_air_freshner_scent: {
            description: "",
            value: ""
          },
          no_warning_light_remian_illuminated: {
            description: "",
            value: ""
          },
          power_windows_operates_properly: {
            description: "",
            value: ""
          },
          seats_adjust_properly: {
            description: "",
            value: ""
          },
          seats_equipped_seatbelt: {
            description: "",
            value: ""
          },
          seats_unworn_no_cracks: {
            description: "",
            value: ""
          },
          stereo_works: {
            description: "",
            value: ""
          },
          sunroof_open_close_properly: {
            description: "",
            value: ""
          },
          trunk_driver_door_lock_with_key: {
            description: "",
            value: ""
          },
          trunk_open_close_freely: {
            description: "",
            value: ""
          },
          windshiels_wiper_works: {
            description: "",
            value: ""
          },
          wiper_fluid_dispenses_properly: {
            description: "",
            value: ""
          },
          keys_available: {
            description: "",
            value: ""
          }
        },
        transmission: {
          fluid_clean: {
            description: "",
            value: ""
          },
          no_slips_delays: {
            description: "",
            value: ""
          },
          gear_shifts_smoothly: {
            description: "",
            value: ""
          },
          grinding_noise: {
            description: "",
            value: ""
          },
          clatch_working: {
            description: "",
            value: ""
          }
        },
        miscellaneous: {
          car_manual: {
            description: "",
            value: ""
          },
          instructions: {
            description: "",
            value: ""
          },
          owner_title: {
            description: "",
            value: ""
          }
        },
        steering: {
          clunking: {
            description: "",
            value: ""
          },
          no_drift: {
            description: "",
            value: ""
          },
          resistance: {
            description: "",
            value: ""
          },
          stable: {
            description: "",
            value: ""
          }
        },
        suspension: {
          cracking_noise: {
            description: "",
            value: ""
          },
          same_bouncing: {
            description: "",
            value: ""
          },
          vehicle_rest_levelly: {
            description: "",
            value: ""
          }
        },
        tyres: {
          no_cuts_cracks: {
            description: "",
            value: ""
          },
          same_make: {
            description: "",
            value: ""
          },
          spare_tyre: {
            description: "",
            value: ""
          },
          spare_tyre_inflated: {
            description: "",
            value: ""
          },
          thread_worn: {
            description: "",
            value: ""
          },
          percentage_tyre: {
            description: "",
            value: ""
          }
        }
      }
    };
    $scope.timings = {
      date: "",
      time: new Date(1970, 0, 1, 0, 0, 0)
    };
    $scope.selectedFiles = [];

    $scope.uploadFiles = function (files) {
      angular.forEach(files, function (file) {
        $scope.selectedFiles.push(file);
      });
    };

    $scope.removeFile = function (index) {
      $scope.selectedFiles = [
        ...$scope.selectedFiles.slice(0, index),
        ...$scope.selectedFiles.slice(index + 1)
      ];
    };

    $scope.saveVehicle = function () {
      if (!$scope.addVehicleForm.$valid) {
        bootbox.alert("Please fill all required information");
        return;
      }

      var images = [];
      async.series(
        [
          function (cb) {
            if ($scope.selectedFiles.length == 0) {
              return cb("No vehicle image is selected");
            }
            auctionService.uploadFiles($scope.selectedFiles).then(
              function (result) {
                images = result.data.data;
                return cb(null);
              },
              function (error) {
                return cb("Error occoured while uploading image");
              }
            );
          },
          function (cb) {
            var vehicleObject = {};
            vehicleObject = angular.copy($scope.addVehicle);
            vehicleObject.basic_info.images = images;
            vehicleObject.basic_info.auction_start_date =
              $scope.timings.date +
              " " +
              $scope.timings.time.getHours() +
              ":" +
              $scope.timings.time.getMinutes();
            auctionService.addAuction(vehicleObject).then(
              function (result) {
                return cb(null);
              },
              function (error) {
                return cb("Error occoured while adding new vehicle");
              }
            );
          }
        ],
        function (err) {
          if (err) {
            bootbox.alert(err);
          } else {
            bootbox.alert("Vehicle added successfully");
            $state.go("sellerDashboard");
          }
        }
      );
    };
  }
]);

app.controller("sellerNotification", [
  "$scope",
  "$state",
  "sellerService",
  function ($scope, $state, sellerService) {
    $scope.notifications = [];
    sellerService.getNotification({
      markRead: true
    }).then(function (result) {
      $scope.notifications = result.data.data;
    });
  }
]);

app.controller("sellerBids", [
  "$scope",
  "$state",
  "sellerService",
  function ($scope, $state, sellerService) {
    $scope.bids = [];
    sellerService.getBids({}).then(function (result) {
      $scope.bids = result.data.data;
    });
  }
]);

app.controller("sellerClosedDeals", [
  "$scope",
  "$state",
  "sellerService",
  function ($scope, $state, sellerService) {
    $scope.notifications = [];
    sellerService.getClosedBids({}).then(function (result) {
      $scope.notifications = result.data.data;
    });
  }
]);

app.controller("sellerPayments", [
  "$scope",
  "$state",
  "sellerService", "$q",
  function ($scope, $state, sellerService, $q) {
    $scope.payments = [];
    $scope.subsellers = [];
    $scope.subsellerSelections = [];

    $scope.filter = {
      startDate: "",
      endDate: ""
    }

    function loadDate() {
      let params = {};

      angular.copy($scope.filter, params);

      let sellerIds = [];
      if ($scope.subsellerSelections.length > 0) {
        sellerIds = $scope.subsellerSelections.map(function (i) {
          return i.id;
        });
      }
      params.subSellers = sellerIds;

      sellerService.getPayments(params).then(function (result) {
        $scope.payments = result.data.data;
      });
    }

    loadDate()

    sellerService.subsellerListing({}).then(
      function (result) {
        $scope.subsellers = result.data.data.map(function (user) {
          return {
            id: user.userId,
            text: user.firstName + " " + user.lastName
          };
        });
      },
      function (error) {}
    );
    $scope.loadUser = function () {
      var deferred = $q.defer();
      deferred.resolve($scope.subsellers);

      return deferred.promise;
    };

    $scope.applyFlter = function () {
      loadDate()
    }

    $scope.resetFilter = function () {
      $scope.filter = {
        startDate: "",
        endDate: ""
      }
      $scope.subsellerSelections = [];
      loadDate()
    }

  }
]);