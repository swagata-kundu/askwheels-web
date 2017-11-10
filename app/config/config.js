"use strict";

var app = app || {};

var domain = "http://13.126.216.190:5000/";
// var domain = 'http://localhost:5100/';

app.constant("serviceURI", {
  loginURI: domain + "login",
  signUpURI: domain + "signup",
  forgetPassword: domain + "forgetpassword",
  checkEmailExistsURI: domain + "isemailidexist",
  categoriesURI: domain + "categories",
  changePasswordPublicUserURI: domain + "changepassword",
  userBase: domain + "secure/user",
  blockUser: domain + "secure/user/block",
  getSubSellerList: domain + "secure/user/subseller/listing",
  getSellerList: domain + "secure/user/seller/listing",
  vehicleListAdmin: domain + "secure/auction/vehicle/admin/list",
  vehicleStatusChange: domain + "secure/auction/vehicle/admin/status",
  getDealerList: domain + "secure/user/dealer/listing",
  getDashBoardInfo: domain + "secure/user/admin/dashboard",
  getDashBoardInfoSeller: domain + "secure/user/seller/dashboard",
  getDashBoardInfoDealer: domain + "secure/user/dealer/dashboard",  
  auctionListSeller: domain + "secure/auction/seller",
  auctionListDealer: domain + "secure/auction/dealer",
  changeDealerStatus: domain + "secure/user/dealer/status",
  subsellerListing: domain + "secure/user/subseller/listing"
});
