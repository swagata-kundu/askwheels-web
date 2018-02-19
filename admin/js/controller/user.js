"use strict";

app.controller("sellerListing", [
  "$scope",
  "authService",
  "$state",
  "$rootScope",
  "$uibModal",
  "sellerService",
  function ($scope, authService, $state, $rootScope,
    $uibModal,
    sellerService) {
    $scope.admin = {};
    $scope.admin.allEndUsers = [];

    //pagination variables
    $scope.sortType = "firstName";
    $scope.sortReverse = false;
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.searchText = "";

    $scope.getSellerList = function (pageNo, pageSize) {
      var endUserListParams = {
        pageNo: pageNo,
        pageSize: pageSize,
        sortBy: $scope.sortType,
        sortOrder: $scope.sortReverse == true ? "DESC" : "ASC",
        searchText: $scope.searchText
      };
      sellerService.getSellerList(endUserListParams).then(
        function (endUserSuccess) {
          $scope.admin.allEndUsers = endUserSuccess.data.data;
          $scope.currentPage = pageNo;
          $scope.totalValues = endUserSuccess.data.count;
        },
        function (endUserError) {
          $scope.admin.allEndUsers = [];
          $scope.totalValues = 0;
        }
      );
    };

    //bind default list on page load
    $scope.getSellerList($scope.currentPage, $scope.numPerPage);

    $scope.blockUnblockEndUser = function (id, status) {
      bootbox.confirm("Change user status ?", function (checked) {
        if (checked) {
          var blockParams = {
            userId: parseInt(id),
            flag: status == 0 ? false : true
          };

          sellerService.blockUser(blockParams).then(
            function (response) {
              bootbox.alert(response.data.message);
              var pageNo = $scope.currentPage;
              if ($scope.admin.allEndUsers.length == 1) {
                if ($scope.currentPage != 1) {
                  pageNo = pageNo - 1;
                } else {
                  pageNo = 1;
                }
              }
              $scope.getSellerList(pageNo, $scope.numPerPage);
            },
            function (error) {}
          );
        }
      });
    };

    $scope.deleteEndUser = function (id) {
      bootbox.confirm("Are you sure you want to delete this user?", function (
        checked
      ) {
        if (checked) {
          var delParams = {
            userId: parseInt(id)
          };
          sellerService.deleteUser(delParams).then(
            function (response) {
              bootbox.alert(response.data.message);
              var pageNo = $scope.currentPage;
              if ($scope.admin.allEndUsers.length == 1) {
                if ($scope.currentPage != 1) {
                  pageNo = pageNo - 1;
                } else {
                  pageNo = 1;
                }
              }
              $scope.getSellerList(pageNo, $scope.numPerPage);
            },
            function (error) {}
          );
        }
      });
    };

    //Searh on filters
    $scope.searchByInputText = function () {
      if ($scope.searchText) {
        $scope.getSellerList(1, $scope.numPerPage);
      }
    };

    // To clear filters.
    $scope.clearFilters = function () {
      $scope.searchText = "";
      $scope.currentPage = 1;
      $scope.sortReverse = false;
      $scope.sortType = "firstName";
      $scope.getSellerList($scope.currentPage, $scope.numPerPage);
    };


    $scope.changePassword = function (userId) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: "views/admin/userpassword.html",
        controller: "changeUserPassword",
        windowClass: 'custom-modal',
        resolve: {
          userId: function () {
            return userId;
          }
        }
      });
      modalInstance.result.then(function () {}, function () {});
    };

  }
]);

app.controller("subSellerListing", [
  "$scope",
  "authService",
  "$state",
  "$rootScope",
  "sellerService", "$uibModal",
  function ($scope, authService, $state, $rootScope, sellerService, $uibModal) {
    var sellerId = $state.params.sellerId;

    $scope.sellerName = $state.params.sellerName;
    $scope.admin = {};
    $scope.admin.allEndUsers = [];

    //pagination variables
    $scope.sortType = "firstName";
    $scope.sortReverse = false;
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.searchText = "";

    $scope.getSellerList = function (pageNo, pageSize) {
      var endUserListParams = {
        pageNo: pageNo,
        pageSize: pageSize,
        sortBy: $scope.sortType,
        sortOrder: $scope.sortReverse == true ? "DESC" : "ASC",
        searchText: $scope.searchText,
        sellerId: sellerId
      };
      sellerService.getSubSellerList(endUserListParams).then(
        function (endUserSuccess) {
          $scope.admin.allEndUsers = endUserSuccess.data.data;
          $scope.currentPage = pageNo;
          $scope.totalValues = endUserSuccess.data.count;
        },
        function (endUserError) {
          $scope.admin.allEndUsers = [];
          $scope.totalValues = 0;
        }
      );
    };

    //bind default list on page load
    $scope.getSellerList($scope.currentPage, $scope.numPerPage);

    $scope.blockUnblockEndUser = function (id, status) {
      bootbox.confirm("Change user status ?", function (checked) {
        if (checked) {
          var blockParams = {
            userId: parseInt(id),
            flag: status == 0 ? false : true
          };

          sellerService.blockUser(blockParams).then(
            function (response) {
              bootbox.alert(response.data.message);
              var pageNo = $scope.currentPage;
              if ($scope.admin.allEndUsers.length == 1) {
                if ($scope.currentPage != 1) {
                  pageNo = pageNo - 1;
                } else {
                  pageNo = 1;
                }
              }
              $scope.getSellerList(pageNo, $scope.numPerPage);
            },
            function (error) {}
          );
        }
      });
    };

    $scope.deleteEndUser = function (id) {
      bootbox.confirm("Are you sure you want to delete this user?", function (
        checked
      ) {
        if (checked) {
          var delParams = {
            userId: parseInt(id)
          };
          sellerService.deleteUser(delParams).then(
            function (response) {
              bootbox.alert(response.data.message);
              var pageNo = $scope.currentPage;
              if ($scope.admin.allEndUsers.length == 1) {
                if ($scope.currentPage != 1) {
                  pageNo = pageNo - 1;
                } else {
                  pageNo = 1;
                }
              }
              $scope.getSellerList(pageNo, $scope.numPerPage);
            },
            function (error) {}
          );
        }
      });
    };

    //Searh on filters
    $scope.searchByInputText = function () {
      if ($scope.searchText) {
        $scope.getSellerList(1, $scope.numPerPage);
      }
    };

    // To clear filters.
    $scope.clearFilters = function () {
      $scope.searchText = "";
      $scope.currentPage = 1;
      $scope.sortReverse = false;
      $scope.sortType = "firstName";
      $scope.getSellerList($scope.currentPage, $scope.numPerPage);
    };

    $scope.changePassword = function (userId) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: "views/admin/userpassword.html",
        controller: "changeUserPassword",
        windowClass: 'custom-modal',
        resolve: {
          userId: function () {
            return userId;
          }
        }
      });
      modalInstance.result.then(function () {}, function () {});
    };

  }
]);

app.controller("dealerListing", [
  "$scope",
  "authService",
  "$state",
  "$rootScope",
  "dealerService",
  "sellerService",
  "$uibModal",
  function (
    $scope,
    authService,
    $state,
    $rootScope,
    dealerService,
    sellerService,
    $uibModal
  ) {
    var sellerId = $state.params.sellerId;

    $scope.sellerName = $state.params.sellerName;
    $scope.admin = {};
    $scope.admin.allEndUsers = [];

    //pagination variables
    $scope.sortType = "firstName";
    $scope.sortReverse = false;
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.searchText = "";

    $scope.getSellerList = function (pageNo, pageSize) {
      var endUserListParams = {
        pageNo: pageNo,
        pageSize: pageSize,
        sortBy: $scope.sortType,
        sortOrder: $scope.sortReverse == true ? "DESC" : "ASC",
        searchText: $scope.searchText,
        sellerId: sellerId
      };
      dealerService.getDealerList(endUserListParams).then(
        function (endUserSuccess) {
          $scope.admin.allEndUsers = endUserSuccess.data.data;
          $scope.currentPage = pageNo;
          $scope.totalValues = endUserSuccess.data.count;
        },
        function (endUserError) {
          $scope.admin.allEndUsers = [];
          $scope.totalValues = 0;
        }
      );
    };

    //bind default list on page load
    $scope.getSellerList($scope.currentPage, $scope.numPerPage);

    $scope.selectedDealer = {};
    $scope.changeDealerStatus = function (user) {
      $scope.selectedDealer = user;
      var modal = angular.element(document).find("#confirmmodal");
      modal.modal();
    };

    $scope.changeStatus = function () {
      var blockParams = {
        dealerId: $scope.selectedDealer.userId,
        status: $scope.selectedDealer.status == 0 ? true : false,
        biddingLimit: $scope.selectedDealer.biddingLimit
      };

      dealerService.changeDealerStatus(blockParams).then(
        function (response) {
          bootbox.alert(response.data.message);
          var pageNo = $scope.currentPage;
          if ($scope.admin.allEndUsers.length == 1) {
            if ($scope.currentPage != 1) {
              pageNo = pageNo - 1;
            } else {
              pageNo = 1;
            }
          }
          $scope.getSellerList(pageNo, $scope.numPerPage);
        },
        function (error) {}
      );
    };

    $scope.deleteEndUser = function (id) {
      bootbox.confirm("Are you sure you want to delete this user?", function (
        checked
      ) {
        if (checked) {
          var delParams = {
            userId: parseInt(id)
          };
          sellerService.deleteUser(delParams).then(
            function (response) {
              bootbox.alert(response.data.message);
              var pageNo = $scope.currentPage;
              if ($scope.admin.allEndUsers.length == 1) {
                if ($scope.currentPage != 1) {
                  pageNo = pageNo - 1;
                } else {
                  pageNo = 1;
                }
              }
              $scope.getSellerList(pageNo, $scope.numPerPage);
            },
            function (error) {}
          );
        }
      });
      var parentElem = angular.element($document[0].querySelector("#modalDiv"));
    };

    //Searh on filters
    $scope.searchByInputText = function () {
      if ($scope.searchText) {
        $scope.getSellerList(1, $scope.numPerPage);
      }
    };

    // To clear filters.
    $scope.clearFilters = function () {
      $scope.searchText = "";
      $scope.currentPage = 1;
      $scope.sortReverse = false;
      $scope.sortType = "firstName";
      $scope.getSellerList($scope.currentPage, $scope.numPerPage);
    };
    $scope.changePassword = function (userId) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: "views/admin/userpassword.html",
        controller: "changeUserPassword",
        windowClass: 'custom-modal',
        resolve: {
          userId: function () {
            return userId;
          }
        }
      });
      modalInstance.result.then(function () {}, function () {});
    };

  }
]);

app.controller("changePassword", [
  "$scope",
  "publicUserService",
  function ($scope, publicUserService) {
    $scope.user = {};

    $scope.changePassword = function () {
      if ($scope.changePasswordFrm.$valid) {
        var requestParams = {
          oldPassword: $scope.user.oldPassword,
          newPassword: $scope.user.newPassword
        };

        publicUserService
          .changePassword(requestParams)
          .then(function (response) {
            bootbox.alert(response.data.message);
          })
          .catch(function (error) {
            showErrorMessage(error);
          });
      }
    };
  }
]);

app.controller("dashboard", [
  "$scope",
  "dashBoardService",
  function ($scope, dashBoardService) {
    $scope.info = {
      pendingAuctions: 0,
      pendingSellers: 0,
      pendingDealers: 0
    };

    dashBoardService.getDashBoardInfo().then(function (response) {
      $scope.info = response.data.data;
      console.log($scope.info);
    });
  }
]);


app.controller("payments", [
  "$scope",
  "$rootScope",
  "sellerService",
  function (
    $scope,
    $rootScope,
    sellerService
  ) {
    $scope.payments = [];
    $scope.filter = {
      startDate: "",
      endDate: ""
    }

    function loadDate() {
      sellerService.getPayments($scope.filter).then(function (result) {
        $scope.payments = result.data.data;
        $scope.totalValues = result.data.count;
      });
    }

    loadDate();

    $scope.applyFilter = function () {
      loadDate();
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
])


app.controller("changeUserPassword", [
  "$scope",
  "publicUserService",
  "$state",
  "$uibModalInstance",
  "userId",
  function ($scope, publicUserService, $state, $uibModalInstance, userId) {
    $scope.user = {};
    var subUserId = userId;
    $scope.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };

    $scope.changePassword = function () {
      if ($scope.changePasswordFrm.$valid) {
        var requestParams = {
          newPassword: $scope.user.newPassword,
          userId: subUserId
        };
        publicUserService
          .changePassword(requestParams)
          .then(function (response) {
            bootbox.alert(response.data.message, function () {
              $uibModalInstance.close("ok");
            });
          })
          .catch(function (error) {
            $uibModalInstance.dismiss("cancel");
            showErrorMessage(error);
          });
      }
    };
  }
]);