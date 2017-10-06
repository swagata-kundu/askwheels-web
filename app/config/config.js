'use strict';

var app = app || {};

var domain = 'http://api.yourcitynightout.com/';

app.constant('serviceURI', {
    loginURI: domain + "login",
    signUpURI: domain + "signup",
    checkEmailExistsURI: domain + "isemailidexist",
    categoriesURI: domain + "categories",
    changePasswordPublicUserURI: domain + "changepassword",
    updateUserProfile: domain + "secure/user",
});

app.constant('siteInfo', {
    siteID: 1,
    siteName: "My Nightout"
});


