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
app.controller('productList', function ($scope, $http) {

    $scope.products = [];

    $scope.getProds = function (url) {
        console.log(url);
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
    }


});



app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});






$(document).ready(function () {

    $(".sidebar-nav").on('click', 'a', function (e) {
        e.preventDefault();
        angular.element($("#pList")).scope().getProds($(this).attr('href'));
    });

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});



