app.controller("sellerDashboard", [
  "$scope",
  "$state",
  "sellerService",
  "$q",
  function($scope, $state, sellerService, $q) {
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
      transmission: ""
    };

    $scope.loadUser = function() {
      var deferred = $q.defer();
      deferred.resolve($scope.subsellers);

      return deferred.promise;
    };

    sellerService.getDashboardInfo().then(
      function(result) {
        $scope.tabinfo = result.data.data;
      },
      function(error) {}
    );

    let auctionParams = {
      auctionType: 1
    };

    let getAuctions = function() {
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
      if ($scope.subsellerSelections.length > 0) {
        let sellerIds = $scope.subsellerSelections.map(function(i) {
          return i.id;
        });
        params.sub_sellers = sellerIds.toString();
      }
      sellerService.getAuctionList(params).then(
        function(result) {
          $scope.auctions = result.data.data;
        },
        function(error) {
          $scope.auctions = [];
        }
      );
    };

    $scope.tabChange = function(auctionType) {
      auctionParams.auctionType = auctionType;
      $scope.resetFilter();
    };

    getAuctions();

    sellerService.subsellerListing({}).then(
      function(result) {
        $scope.subsellers = result.data.data.map(function(user) {
          return {
            id: user.userId,
            text: user.firstName + " " + user.lastName
          };
        });
      },
      function(error) {}
    );
    $scope.applyFilter = function() {
      getAuctions();
    };

    $scope.resetFilter = function() {
      $scope.filter = {
        minPrice: "",
        maxPrice: "",
        fuelType: "",
        owner: "",
        transmission: ""
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
  function($scope, $state, sellerService) {
    $(function() {
      //jQuery time
      var current_fs, next_fs, previous_fs; //fieldsets
      var left, opacity, scale; //fieldset properties which we will animate
      var animating; //flag to prevent quick multi-click glitches

      $(".next").click(function() {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
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
        current_fs.animate(
          {
            opacity: 0
          },
          {
            step: function(now, mx) {
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
            complete: function() {
              current_fs.hide();
              animating = false;
            },
            //this comes from the custom easing plugin
            easing: "easeInOutBack"
          }
        );
      });

      $(".previous").click(function() {
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
        current_fs.animate(
          {
            opacity: 0
          },
          {
            step: function(now, mx) {
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
            complete: function() {
              current_fs.hide();
              animating = false;
            },
            //this comes from the custom easing plugin
            easing: "easeInOutBack"
          }
        );
      });

      $(".submit").click(function() {
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
        },
        inspection_report: {
          breaks: {
            grinding_noise: {},
            pbedf: {},
            vss: {},
            wlaab: {}
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
            chassis_ok: {},
            hole_without_scratches: {},
            no_crumpling_inside_trunk: {}
          },
          interior: {
            ac_works: {},
            all_gauge_works: {},
            car_alarm_works: {},
            doors_open_close_freely: {},
            hazard_lights_function_properly: {},
            head_lights_work_properly: {},
            heater_works: {},
            lacks_air_freshner_scent: {},
            no_warning_light_remian_illuminated: {},
            power_windows_operates_properly: {},
            seats_adjust_properly: {},
            seats_equipped_seatbelt: {},
            seats_unworn_no_cracks: {},
            stereo_works: {},
            sunroof_open_close_properly: {},
            trunk_driver_door_lock_with_key: {},
            trunk_open_close_freely: {},
            windshiels_wiper_works: {},
            wiper_fluid_dispenses_properly: {}
          },
          automatic_tansmission: {
            fluid_clean: {},
            no_slips_delays: {}
          },
          manual_transmission: {
            gear_shifts_smoothly: {},
            grinding_noise: {}
          },
          miscellaneous: {
            car_manual: {},
            instructions: {},
            owner_title: {}
          },
          steering: {
            clunking: {},
            no_drift: {},
            resistance: {},
            stable: {}
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
            }
          }
        }
      }
    };
  }
]);
