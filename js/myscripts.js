var domain = "http://pluck-infini.cruxservers.in/";


var app = angular.module('pluckk', ['ngResource', 'ngSanitize']);


app.controller('getMenu', function ($scope, $http) {
    var url = domain + "m/get-menu";

    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });

    $.get(url, function (data) {

        $scope.$apply(function () {
            $scope.menu = data;
        });
    });

});


app.controller('homeList', function ($scope, $http) {

    url = domain + 'm/get-home-prods';

    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });

    $.getJSON(url, function (data) {
        $scope.$apply(function () {
            $scope.categories = data;
        });

        $('#dvLoading').fadeOut(200);
        navigator.splashscreen.hide();


    });

});


app.controller('productList', function ($scope, $http) {

    url = domain + 'm/get-category-products/' + getUrlParameter('slug');

    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });

    $.getJSON(url, function (data) {
        $scope.$apply(function () {
            $scope.products = data.prods;
            var decoded = $('<div/>').html(data.links).text();
            $scope.pagination = decoded;

        });
        $('#dvLoading').fadeOut(200);
    });

    $scope.getProds = function (url) {

        $.ajaxSetup({
            scriptCharset: "utf-8", //maybe "ISO-8859-1"
            contentType: "application/json; charset=utf-8"
        });

        $.get(url,
                function (data) {
                    $scope.$apply(function () {
                        $scope.products = data.prods;
                        var decoded = $('<div/>').html(data.links).text();
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

    $.getJSON(url, function (data) {
        $scope.$apply(function () {
            $scope.product = data;

        });
        $('#dvLoading').fadeOut(200);
    });

});


app.controller('cartList', function ($scope, $http) {

    url = domain + 'm/cart';

    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });

    $.get(url,
            function (data) {
                $scope.$apply(function () {
                    $scope.cart = data;
                });
                $('#dvLoading').fadeOut(200);

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
                    $(".navcart .badge").text(cart_cont[1]);
                    alert("Product Added Successfully");
                });




    });

    $("#wrapper").on('click', '.pQty', function (e) {
        var val = parseInt($(this).siblings(".quantity").val());
        val++;
        $(this).siblings(".quantity").val(val);
    });

    $("#wrapper").on('click', '.mQty', function (e) {
        var val = parseInt($(this).siblings(".quantity").val());
        if (val > 1) {
            val--;
            $(this).siblings(".quantity").val(val);
        }
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






$(document).ready(function () {
    var ordertlt = $(".grandTotal").text();

    var url = domain + "m/get-cart-count";

    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });

    $.get(url, function (data) {
        $("a.navcart span.badge").html(data);
    });

    if (ordertlt < 250)
    {
        var total_pay_ship = parseInt(ordertlt) + 30;
        $(".orderAmt").val(total_pay_ship);
    }


    $("body").on('input', ".qty", function () {
        var qty = $(this).val();
        var rowid = $(this).attr("prod-id");
        var productId = $(this).attr("product-id");



        if (qty !== "" && qty > 0) {
            $(".savQty").text(qty);
            $.ajax({
                url: domain + "cart/edit-cart",
                type: 'get',
                data: {rowid: rowid, qty: qty, productId: productId},
                success: function (data) {
                    if (data != "Specified quantity is not available") {
                        var totals = data.split("||||||||||");
                        $("." + rowid).html(totals[0]);
                        $(".ysave[ysave-id='" + rowid + "']").text(parseInt(parseInt($(".ysave[ysave-id='" + rowid + "']").attr("data-y")) * parseInt($(".qty[prod-id='" + rowid + "']").val())));
                        $(".grandTotal").html(totals[1]);
                        $(".TotalCartAmt").text(totals[1]);
                        $(".orderAmt").val(totals[1]);
                        // alert(totals[1]);
                        var REQamt = parseInt(250);
                        if (totals[1] < REQamt) {
                            if ($(".shippingValue").text() == 0) {
                                //  alert($(".shippingValue").text());
                                $(".shippingValue").text(30);
                                var ship = '30';
                                $(".TotalCartAmt").text(parseInt(totals[1]) + parseInt(ship));
                                $(".orderAmt").val(parseInt(totals[1]) + parseInt(ship));
                            } else {
                                var ship = '30';
                                $(".TotalCartAmt").text(parseInt(totals[1]) + parseInt(ship));
                                $(".orderAmt").val(parseInt(totals[1]) + parseInt(ship));
                            }
                        } else if (totals[1] >= REQamt && $(".shippingValue").text() == 30) {
                            $(".shippingValue").text(0);
                        }
                        if ($(".userCouponCode").val() !== "") {
                            $("#couponApply").click();
                        }
                    } else {
                        alert("Specified quantity is not available");
                    }

                }
            });
        }
    });
    $("body").on("click", ".clearCoup", function () {
        var couponCode = '';
        var CartAmt = $(".TotalCartAmt").text();
        $.ajax({
            url: domain + "check_coupon",
            type: 'get',
            data: {couponCode: couponCode, orderAmount: $(".orderAmt").val()},
            cache: false,
            success: function (msg) {
                $(".cMsg").css("display", "block");
                var Cmsg = msg.split(":-")[0];
                if (msg.split(":-")[1].length > 0) {
                    //  alert(Math.round(msg.split(":-")[1]));
                    // alert(CartAmt);

                    var newCartAmt = parseInt(CartAmt) + parseInt(Math.round(msg.split(":-")[1]));

                    if (newCartAmt < '250')
                    {
                        var aa = parseInt(newCartAmt) + 30;
                    } else
                    {
                        var aa = parseInt(newCartAmt);
                    }

                    $(".TotalCartAmt").text(newCartAmt);
                    $(".orderAmt").val(aa);
                }
                $(".couponUsedAmount").text("0");

                $(".cMsg").html("Coupon Removed!");
                $("#couponApply").removeAttr("disabled");
                $(".userCouponCode").removeAttr("disabled");
            }
        });
    });
    $("#couponApply").click(function () {
        var couponCode = $(".userCouponCode").val();

        var CartAmt = $(".grandTotal").text();
        if ($(".userCouponCode").val() != "") {
            //    alert($(".grandTotal").text());
            $.ajax({
                url: domain + "check_coupon",
                type: 'get',
                data: {couponCode: couponCode, orderAmount: CartAmt},
                cache: false,
                success: function (msg) {
                    $(".cMsg").css("display", "block");
                    $(".emptyCouponError").css("display", "none");

                    var Cmsg = msg.split(":-")[0];
                    if (msg.split(":-")[0] != "Coupon Not Valid") {
                        $("#couponApply").attr("disabled", "disabled");
                        $(".userCouponCode").attr("disabled", "disabled");
                        Cmsg = "<span style='color:green;'>Coupon Applied!</span> <a href='javascript:void();' style='border-bottom: 1px dashed;' class='clearCoup'>Remove!</a>";
                        //   alert($(".shippingValue").text());
                        if ($(".shippingValue").text() == '30') {
                            var CouponVal = parseInt(Math.round(msg.split(":-")[1])) + parseInt($(".shippingValue").text());
                        } else {
                            var CouponVal = parseInt(Math.round(msg.split(":-")[1]));

                        }


                        var usedCouponAmount = Math.round(msg.split(":-")[3]);

                        //    alert(CouponVal);
                        $(".TotalCartAmt").text(CouponVal);
                        $(".orderAmt").val(CouponVal);
                        $(".couponUsedAmount").text(usedCouponAmount);
                        $(".cMsg").html(Cmsg);
                        //  $(".userCouponCode").val("");
                        //   $("#qtyProduc").addAttr("disabled");
                    } else {

                        if (msg.split(":-")[1].length > 0) {
                            var newCartAmt = parseInt(CartAmt) + parseInt(Math.round(msg.split(":-")[1]));
                            $(".TotalCartAmt").text(newCartAmt);
                            $(".orderAmt").val(newCartAmt);
                        }
                        $(".couponUsedAmount").text("0");
                        $("#couponApply").removeAttr("disabled");
                        $(".userCouponCode").removeAttr("disabled");
                        $(".cMsg").html("Coupon Code Invalid OR Not applicable on current cart value.");
                    }


                }
            });
        } else {

            $(".emptyCouponError").show();
            $(".cMsg").html("");

            $(".emptyCouponError").html("Please enter valid coupon code.");
        }


        return false;
    });
    $("body").on('click', ".deleteCart", function (e) {
        e.preventDefault();
        var url = domain + $(this).attr('href');
        var rowid = $(this).attr("prod-id");
        var productId = $(this).attr("product-id");

        $.ajax({
            url: url,
            type: 'get',
            success: function (data) {
                top.location.href = top.location.href

            }
        });


    });


    $(".loginBtn").click(function (e) {
        e.preventDefault();

        if ($("[name='username']").val() == "" || $("[name='password']").val() == "") {
            alert("Please Enter Valid Email ID & Password!");
        } else {
            $.ajax({
                url: domain + 'check_user_login',
                type: 'get',
                data: {username: $("[name='username']").val(), password: $("[name='password']").val()},
                success: function (data) {
                    if (data.match(/My Account/g)) {
                        window.localStorage.setItem("username", $("[name='username']").val());

                        alert('Logged In')
                    } else {
                        alert('Invalid Login Details');
                    }
                }
            });
        }
    });



});


function get_checkout() {
    var MinAmt = 100;

    if ($(".grandTotal").text() < MinAmt) {
        alert("Please place order of at least Rs. 100");

    } else {
        $("#chkoutForm").submit();
    }

}

function fb_login() {
    var fbLoginSuccess = function (userData) {
        alert("UserInfo: " + JSON.stringify(userData));
    }

    facebookConnectPlugin.login(["public_profile", "email"],
            fbLoginSuccess,
            function (error) {
                alert("" + error)
            }
    );
}