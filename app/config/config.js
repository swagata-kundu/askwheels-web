'use strict';

var app = app || {};

var domain = 'http://api.yourcitynightout.com/';

app.constant('serviceURI', {
    reCaptchaURI: "https://examples.webscript.io/recaptcha",
    loginURI: domain + "login",
    signUpURI: domain + "signup",
    checkEmailExistsURI: domain + "isemailidexist",
    categoriesURI: domain + "categories",
    businessListURI: domain + "businesses",
    businessDetailURI: domain + "businesses",
    changePasswordPublicUserURI: domain + "changepassword",
    markFavoriteURI: domain + "secure/favourite",
    makeReservationURI: domain + "secure/reservation",
    couponsForBusiness: domain + "coupons",
    couponsForDomainURI: domain + "coupons/all",
    usersCouponsURI: domain + "secure/mycoupons",
    downloadCouponURI : domain + "secure/mycoupons/download",
    updateUserProfile: domain + "secure/user",
    howDidYouHearAboutUsOptions: domain + "common/publicity",

    //For event management by business user
    getBusinessDetailsURI: domain + "businesses/admin",
    eventSubCategoriesURI: domain + "events/subcategories",
    repeatMethodURI: domain + "events/repeat",
    getAllLocationsURI: domain + "common/locations",
    getAllCountriesURI: domain + "common/countries",
    getAllStatesURI: domain + "common/states",
    getAllCityURI: domain + "city"
});

app.constant('siteInfo', {
    siteID: 1,
    siteName: "My Nightout"
});


