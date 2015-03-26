var domain = "http://www.pluckk.com/";

var app = angular.module('pluckk', ['ngResource','ngSanitize']);


app.controller('productList', function ($scope, $http) {
    var res;
    var url = domain + "m/get-category-products/shop";

    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });

    $.getJSON('http://whateverorigin.org/get?url=' +
            encodeURIComponent(url) + '&callback=?',
            function (data) {

                $scope.$apply(function () {
                    
                    
                    $scope.products = data.contents;
                });
            });

});






$(document).ready(function () {


    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});



