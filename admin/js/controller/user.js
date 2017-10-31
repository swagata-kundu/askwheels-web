'use strict';

app.controller('sellerListing', [
    '$scope',
    'authService',
    '$state',
    '$rootScope',
    'sellerService',
    function ($scope, authService, $state, $rootScope, sellerService) {
        $scope.admin = {};
        $scope.admin.allEndUsers = [];

        //pagination variables
        $scope.sortType = "firstName";
        $scope.sortReverse = false;
        $scope.numPerPage = 20;
        $scope.currentPage = 1;
        $scope.searchText = '';

        $scope.getSellerList = function (pageNo, pageSize) {

            var endUserListParams = {
                'pageNo': pageNo,
                'pageSize': pageSize,
                'sortBy': $scope.sortType,
                'sortOrder': $scope.sortReverse == true ?
                    "DESC" : "ASC",
                'searchText': $scope.searchText
            };
            sellerService
                .getSellerList(endUserListParams)
                .then(function (endUserSuccess) {
                    $scope.admin.allEndUsers = endUserSuccess.data.data;
                    $scope.currentPage = pageNo;
                    $scope.totalValues = endUserSuccess.data.count;
                }, function (endUserError) {
                    $scope.admin.allEndUsers = [];
                    $scope.totalValues = 0;
                });
        };

        //bind default list on page load
        $scope.getSellerList($scope.currentPage, $scope.numPerPage);

        $scope.blockUnblockEndUser = function (id, status) {

            bootbox.confirm('Change user status ?', function (checked) {

                if (checked) {
                    var blockParams = {
                        "userId": parseInt(id),
                        "flag": status == 0 ?
                            false : true
                    };

                    sellerService
                        .blockUser(blockParams)
                        .then(function (response) {
                            bootbox.alert(response.data.message);
                            var pageNo = $scope.currentPage;
                            if ($scope.admin.allEndUsers.length == 1) {
                                if ($scope.currentPage != 1) {
                                    pageNo = pageNo - 1;
                                } else {
                                    pageNo = 1
                                }
                            }
                            $scope.getSellerList(pageNo, $scope.numPerPage);
                        }, function (error) {});
                }
            });


        };

        $scope.deleteEndUser = function (id) {

            bootbox.confirm('Are you sure you want to delete this user?', function (checked) {

                if (checked) {

                    var delParams = {
                        "userId": parseInt(id)
                    };
                    sellerService
                        .deleteUser(delParams)
                        .then(function (response) {
                            bootbox.alert(response.data.message);
                            var pageNo = $scope.currentPage;
                            if ($scope.admin.allEndUsers.length == 1) {
                                if ($scope.currentPage != 1) {
                                    pageNo = pageNo - 1;
                                } else {
                                    pageNo = 1
                                }
                            }
                            $scope.getSellerList(pageNo, $scope.numPerPage);
                        }, function (error) {});
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
            $scope.searchText = '';
            $scope.currentPage = 1;
            $scope.sortReverse = false;
            $scope.sortType = "firstName";
            $scope.getSellerList($scope.currentPage, $scope.numPerPage);
        };

    }
]);

app.controller('subSellerListing', [
    '$scope',
    'authService',
    '$state',
    '$rootScope',
    'sellerService',
    function ($scope, authService, $state, $rootScope, sellerService) {

        var sellerId = $state.params.sellerId;

        $scope.sellerName = $state.params.sellerName;
        $scope.admin = {};
        $scope.admin.allEndUsers = [];

        //pagination variables
        $scope.sortType = "firstName";
        $scope.sortReverse = false;
        $scope.numPerPage = 20;
        $scope.currentPage = 1;
        $scope.searchText = '';

        $scope.getSellerList = function (pageNo, pageSize) {

            var endUserListParams = {
                'pageNo': pageNo,
                'pageSize': pageSize,
                'sortBy': $scope.sortType,
                'sortOrder': $scope.sortReverse == true ?
                    "DESC" : "ASC",
                'searchText': $scope.searchText,
                'sellerId': sellerId
            };
            sellerService
                .getSubSellerList(endUserListParams)
                .then(function (endUserSuccess) {
                    $scope.admin.allEndUsers = endUserSuccess.data.data;
                    $scope.currentPage = pageNo;
                    $scope.totalValues = endUserSuccess.data.count;
                }, function (endUserError) {
                    $scope.admin.allEndUsers = [];
                    $scope.totalValues = 0;
                });
        };

        //bind default list on page load
        $scope.getSellerList($scope.currentPage, $scope.numPerPage);


        $scope.blockUnblockEndUser = function (id, status) {

            bootbox.confirm('Change user status ?', function (checked) {

                if (checked) {
                    var blockParams = {
                        "userId": parseInt(id),
                        "flag": status == 0 ?
                            false : true
                    };

                    sellerService
                        .blockUser(blockParams)
                        .then(function (response) {
                            bootbox.alert(response.data.message);
                            var pageNo = $scope.currentPage;
                            if ($scope.admin.allEndUsers.length == 1) {
                                if ($scope.currentPage != 1) {
                                    pageNo = pageNo - 1;
                                } else {
                                    pageNo = 1
                                }
                            }
                            $scope.getSellerList(pageNo, $scope.numPerPage);
                        }, function (error) {});
                }
            });


        };

        $scope.deleteEndUser = function (id) {

            bootbox.confirm('Are you sure you want to delete this user?', function (checked) {

                if (checked) {

                    var delParams = {
                        "userId": parseInt(id)
                    };
                    sellerService
                        .deleteUser(delParams)
                        .then(function (response) {
                            bootbox.alert(response.data.message);
                            var pageNo = $scope.currentPage;
                            if ($scope.admin.allEndUsers.length == 1) {
                                if ($scope.currentPage != 1) {
                                    pageNo = pageNo - 1;
                                } else {
                                    pageNo = 1
                                }
                            }
                            $scope.getSellerList(pageNo, $scope.numPerPage);
                        }, function (error) {});
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
            $scope.searchText = '';
            $scope.currentPage = 1;
            $scope.sortReverse = false;
            $scope.sortType = "firstName";
            $scope.getSellerList($scope.currentPage, $scope.numPerPage);
        };

    }
]);


app.controller('dealerListing', [
    '$scope',
    'authService',
    '$state',
    '$rootScope',
    'dealerService', 'sellerService',
    function ($scope, authService, $state, $rootScope, dealerService, sellerService) {

        var sellerId = $state.params.sellerId;

        $scope.sellerName = $state.params.sellerName;
        $scope.admin = {};
        $scope.admin.allEndUsers = [];

        //pagination variables
        $scope.sortType = "firstName";
        $scope.sortReverse = false;
        $scope.numPerPage = 20;
        $scope.currentPage = 1;
        $scope.searchText = '';

        $scope.getSellerList = function (pageNo, pageSize) {

            var endUserListParams = {
                'pageNo': pageNo,
                'pageSize': pageSize,
                'sortBy': $scope.sortType,
                'sortOrder': $scope.sortReverse == true ?
                    "DESC" : "ASC",
                'searchText': $scope.searchText,
                'sellerId': sellerId
            };
            dealerService
                .getDealerList(endUserListParams)
                .then(function (endUserSuccess) {
                    $scope.admin.allEndUsers = endUserSuccess.data.data;
                    $scope.currentPage = pageNo;
                    $scope.totalValues = endUserSuccess.data.count;
                }, function (endUserError) {
                    $scope.admin.allEndUsers = [];
                    $scope.totalValues = 0;
                });
        };

        //bind default list on page load
        $scope.getSellerList($scope.currentPage, $scope.numPerPage);


        $scope.blockUnblockEndUser = function (id, status) {

            bootbox.confirm('Change user status ?', function (checked) {

                if (checked) {
                    var blockParams = {
                        "userId": parseInt(id),
                        "flag": status == 0 ?
                            false : true
                    };

                    sellerService
                        .blockUser(blockParams)
                        .then(function (response) {
                            bootbox.alert(response.data.message);
                            var pageNo = $scope.currentPage;
                            if ($scope.admin.allEndUsers.length == 1) {
                                if ($scope.currentPage != 1) {
                                    pageNo = pageNo - 1;
                                } else {
                                    pageNo = 1
                                }
                            }
                            $scope.getSellerList(pageNo, $scope.numPerPage);
                        }, function (error) {});
                }
            });


        };

        $scope.deleteEndUser = function (id) {

            bootbox.confirm('Are you sure you want to delete this user?', function (checked) {

                if (checked) {

                    var delParams = {
                        "userId": parseInt(id)
                    };
                    sellerService
                        .deleteUser(delParams)
                        .then(function (response) {
                            bootbox.alert(response.data.message);
                            var pageNo = $scope.currentPage;
                            if ($scope.admin.allEndUsers.length == 1) {
                                if ($scope.currentPage != 1) {
                                    pageNo = pageNo - 1;
                                } else {
                                    pageNo = 1
                                }
                            }
                            $scope.getSellerList(pageNo, $scope.numPerPage);
                        }, function (error) {});
                }
            });
            var parentElem =
                angular.element($document[0].querySelector('#modalDiv'));


        };

        //Searh on filters
        $scope.searchByInputText = function () {
            if ($scope.searchText) {
                $scope.getSellerList(1, $scope.numPerPage);
            }
        };

        // To clear filters.
        $scope.clearFilters = function () {
            $scope.searchText = '';
            $scope.currentPage = 1;
            $scope.sortReverse = false;
            $scope.sortType = "firstName";
            $scope.getSellerList($scope.currentPage, $scope.numPerPage);
        };

    }
]);

app.controller('changePassword', [
    '$scope',
    'publicUserService',
    function ($scope, publicUserService) {
        $scope.user = {};

        $scope.changePassword = function () {
            if ($scope.changePasswordFrm.$valid) {

                var requestParams = {
                    "oldPassword": $scope.user.oldPassword,
                    "newPassword": $scope.user.newPassword
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


app.controller('dashboard', [
    '$scope',
    'dashBoardService',
    function ($scope, dashBoardService) {
        $scope.info = {
            "pendingAuctions": 0,
            "pendingSellers": 0,
            "pendingDealers": 0
        };

        dashBoardService.getDashBoardInfo().then(function (response) {
            $scope.info = response.data.data;
            console.log($scope.info);
        });
    }
]);