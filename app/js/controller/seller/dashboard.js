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
    $scope.selectedTags = [];
    $scope.auctions = [];
    $scope.subsellers = [];
    $scope.subsellerSelections = [];

    $scope.filter = {
      minPrice: "",
      maxPrice: "",
      fuelType: "",
      owner: 0,
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
      sellerService.getAuctionList(auctionParams).then(
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
      getAuctions();
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
      
    };

    $scope.resetFilter = function() {
      $scope.filter = {
        minPrice: "",
        maxPrice: "",
        fuelType: "",
        owner: "",
        transmission: ""
      };
      $scope.selectedTags = [];
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
  }
]);
