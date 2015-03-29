var domain = "http://www.pluckk.com/";


var app = angular.module('pluckk', ['ngResource', 'ngSanitize']);


app.controller('getMenu', function ($scope, $http) {
    var url = domain + "m/get-menu";

    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });

    $.getJSON('http://whateverorigin.org/get?url=' +
            encodeURIComponent(url) + '&callback=?',
            function (data) {

                $scope.$apply(function () {
                    $scope.menu = data.contents;
                });
            });

});


app.controller('homeList', function ($scope, $http) {

    url = domain + 'm/get-home-prods';

    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });

    $.getJSON('http://whateverorigin.org/get?url=' +
            encodeURIComponent(url) + '&callback=?',
            function (data) {
                $scope.$apply(function () {
                    $scope.categories = data.contents;
                });
            });

});


app.controller('productList', function ($scope, $http) {

    url = domain + 'm/get-category-products/' + getUrlParameter('slug');

    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });

    $.getJSON('http://whateverorigin.org/get?url=' +
            encodeURIComponent(url) + '&callback=?',
            function (data) {
                $scope.$apply(function () {
                    $scope.products = data.contents.prods;
                    var decoded = $('<div/>').html(data.contents.links).text();
                    $scope.pagination = decoded;

                });
            });

    $scope.getProds = function (url) {

        $.ajaxSetup({
            scriptCharset: "utf-8", //maybe "ISO-8859-1"
            contentType: "application/json; charset=utf-8"
        });

        $.getJSON('http://whateverorigin.org/get?url=' +
                encodeURIComponent(url) + '&callback=?',
                function (data) {
                    $scope.$apply(function () {
                        $scope.products = data.contents.prods;
                        var decoded = $('<div/>').html(data.contents.links).text();
                        $scope.pagination = decoded;
                    });
                });
    }

});


app.controller('productDetails', function ($scope, $http, $location) {

    url = domain + 'm/get-product-details/' + getUrlParameter('id');

    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });

    $.getJSON('http://whateverorigin.org/get?url=' +
            encodeURIComponent(url) + '&callback=?',
            function (data) {
                $scope.$apply(function () {
                    $scope.product = data.contents;

                });
            });

});


app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});


$(document).ready(function () {

    $(".pagination").on('click', 'a', function (e) {
        e.preventDefault();
        angular.element($("#pList")).scope().getProds($(this).attr('href'));
    });

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $("#wrapper").on('click', '.addToCart', function (e) {
        e.preventDefault();
        var formId = $(this).attr("form-id");

        url = $(this).attr('form-action') + "?" + $("#" + formId).serialize();

        $.ajaxSetup({
            scriptCharset: "utf-8", //maybe "ISO-8859-1"
            contentType: "application/json; charset=utf-8"
        });

        $.get((url),
                function (result) {
                    var cart_cont = result.split("||||||");

                    var cart = $('.shake-cart');
                    var imgtodrag = $("form#" + formId).find("img").eq(0);
                    if (imgtodrag) {
                        var imgclone = imgtodrag.clone()
                                .offset({
                                    top: imgtodrag.offset().top,
                                    left: imgtodrag.offset().left
                                })
                                .css({
                                    'opacity': '0.5',
                                    'position': 'absolute',
                                    'height': '150px',
                                    'width': '150px',
                                    'z-index': '100'
                                })
                                .appendTo($('body'))
                                .animate({
                                    'top': cart.offset().top + 10,
                                    'left': cart.offset().left + 10,
                                    'width': 75,
                                    'height': 75
                                });





                        imgclone.animate({
                            'width': 0,
                            'height': 0
                        }, function () {

                            $(this).detach();
                            cart.effect("shake", {
                                times: 2
                            }, 200);

                            $(".shopping_cart").html(cart_cont[0]);
                        });
                    }
                });




    });

});


function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}  