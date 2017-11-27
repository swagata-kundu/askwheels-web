app.controller("sellerAuctionDetail", [
  "$scope",
  "$state",
  "auctionService",
  function($scope, $state, auctionService) {
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
      $(function() {
        $("#accordion .content").hide();
        $("#accordion h3:first")
          .addClass("active")
          .next()
          .slideDown("slow");
        $("#accordion h3").click(function() {
          if (
            $(this)
              .next()
              .is(":hidden")
          ) {
            $("#accordion h3")
              .removeClass("active")
              .next()
              .slideUp("slow");
            $(this)
              .toggleClass("active")
              .next()
              .slideDown("slow");
          }
        });
      });
      $("#viewBid").click(function() {
        if ($(this).text() == "View More Bids") $(this).text("Hide Bid");
        else $(this).text("View More Bids");
        $("#hidden_content").slideToggle("slow");
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
    auctionService.getAuctionDetail(vehicleId).then(function(result) {
      console.log(result.data.data);
      $scope.auction = result.data.data;
      setSlider();
    });
    function setSlider() {
      $("#image-gallery").lightSlider({
        gallery: true,
        item: 1,
        thumbItem: 5,
        slideMargin: 0,
        speed: 500,
        auto: true,
        loop: true,
        onSliderLoad: function() {
          $("#image-gallery").removeClass("cS-hidden");
        }
      });
    }
  }
]);
