'use strict';

var app = app || {};

var domain = 'http://13.126.216.190:5000/';

app.constant('serviceURI', {
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
    vehicleListAdmin: domain + "secure/auction/vehicle/list",
    vehicleStatusChange: domain + "secure/auction/vehicle/status"

});