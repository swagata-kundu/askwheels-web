'use strict';

var app = app || {};

var domain = 'http://13.126.216.190:5000/';

app.constant('serviceURI', {
    loginURI: domain + "login",
    signUpURI: domain + "signup",
    checkEmailExistsURI: domain + "isemailidexist",
    categoriesURI: domain + "categories",
    changePasswordPublicUserURI: domain + "changepassword",
    updateUserProfile: domain + "secure/user",
    getSubSellerList: domain + "secure/user/subseller/listing",
    getSellerList: domain + "secure/user/seller/listing",
    forgetPassword: domain + "forgetpassword"
});